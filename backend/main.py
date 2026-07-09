import os
import json
import uuid
import asyncio
from datetime import datetime
from fastapi import FastAPI, Depends, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from database import SessionLocal, init_db, Agent, Task, Log, Cost, Approval, Alert, AgentDependency
from agents.core_agents import is_live_gemini, run_live_gemini_task

# Initialize FastAPI
app = FastAPI(title="Agent Control Tower API")

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get db session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Initialize tables on startup
@app.on_event("startup")
def on_startup():
    init_db()

# Global dictionary to track active task events (for real-time streaming)
active_streams = []

def notify_clients(event_type: str, data: dict):
    """Utility to queue events for streaming clients."""
    payload = json.dumps({"event": event_type, "data": data})
    for queue in active_streams:
        queue.put_nowait(payload)

# ----------------- API Endpoints -----------------

@app.get("/api/dashboard/summary")
def get_dashboard_summary(db: Session = Depends(get_db)):
    total_tasks = db.query(Task).count()
    success_tasks = db.query(Task).filter(Task.status == "SUCCESS").count()
    failed_tasks = db.query(Task).filter(Task.status == "FAILED").count()
    pending_approvals = db.query(Approval).filter(Approval.status == "PENDING").count()
    active_alerts = db.query(Alert).filter(Alert.resolved == False).count()
    
    # Calculate total costs
    total_cost = db.query(Cost.cost_usd).all()
    total_spend = sum([c[0] for c in total_cost]) if total_cost else 0.0
    
    # Calculate health score
    # Formula: start at 100, deduct 15 per active critical alert, deduct 5 per failed task (max deduct 80)
    health_score = 100
    deduction = (active_alerts * 15) + (failed_tasks * 5)
    health_score = max(20, health_score - deduction)

    # Success rate
    success_rate = (success_tasks / total_tasks * 100) if total_tasks > 0 else 100.0

    return {
        "health_score": health_score,
        "success_rate": round(success_rate, 1),
        "total_spend": round(total_spend, 4),
        "active_alerts": active_alerts,
        "total_tasks": total_tasks,
        "pending_approvals": pending_approvals
    }

@app.get("/api/agents")
def get_agents(db: Session = Depends(get_db)):
    agents = db.query(Agent).all()
    result = []
    for agent in agents:
        # Sum up task counts and costs per agent
        tasks = db.query(Task).filter(Task.agent_id == agent.id).all()
        task_ids = [t.id for t in tasks]
        costs = db.query(Cost).filter(Cost.task_id.in_(task_ids)).all() if task_ids else []
        agent_cost = sum([c.cost_usd for c in costs])
        
        result.append({
            "id": agent.id,
            "name": agent.name,
            "role": agent.role,
            "status": agent.status,
            "cost_limit": agent.cost_limit,
            "total_spend": round(agent_cost, 4),
            "task_count": len(tasks)
        })
    return result

@app.post("/api/agents")
def create_agent(payload: dict = Body(...), db: Session = Depends(get_db)):
    agent_id = payload.get("id", "").lower().strip()
    name = payload.get("name", "")
    role = payload.get("role", "")
    cost_limit = float(payload.get("cost_limit", 1.0))
    configuration = payload.get("configuration", "{}")
    
    if not agent_id or not name or not role:
        raise HTTPException(status_code=400, detail="Missing required agent details (id, name, role)")
        
    existing = db.query(Agent).filter(Agent.id == agent_id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Agent ID already registered")
        
    new_agent = Agent(
        id=agent_id,
        name=name,
        role=role,
        status="ACTIVE",
        cost_limit=cost_limit,
        configuration=configuration
    )
    db.add(new_agent)
    
    dep = AgentDependency(agent_id="orchestrator", depends_on_agent_id=agent_id)
    db.add(dep)
    db.commit()
    return {"message": "Agent registered successfully", "agent_id": agent_id}

@app.get("/api/tasks")
def get_tasks(db: Session = Depends(get_db)):
    tasks = db.query(Task).order_by(Task.created_at.desc()).all()
    result = []
    for t in tasks:
        # Get total cost of this task
        cost_entries = db.query(Cost).filter(Cost.task_id == t.id).all()
        task_cost = sum([c.cost_usd for c in cost_entries])
        
        # Get count of warning/error logs
        warnings = db.query(Log).filter(Log.task_id == t.id, Log.level == "WARNING").count()
        errors = db.query(Log).filter(Log.task_id == t.id, Log.level == "ERROR").count()

        result.append({
            "id": t.id,
            "agent_id": t.agent_id,
            "description": t.description,
            "status": t.status,
            "cost_usd": round(task_cost, 4),
            "warnings": warnings,
            "errors": errors,
            "created_at": t.created_at.isoformat(),
            "completed_at": t.completed_at.isoformat() if t.completed_at else None
        })
    return result

@app.get("/api/lineage")
def get_lineage(db: Session = Depends(get_db)):
    # Returns nodes and links for the agent lineage diagram
    agents = db.query(Agent).all()
    nodes = []
    for agent in agents:
        nodes.append({
            "id": agent.id,
            "label": agent.name,
            "role": agent.role,
            "status": agent.status
        })

    deps = db.query(AgentDependency).all()
    links = []
    for dep in deps:
        # Determine status of connection based on agent status
        source_agent = db.query(Agent).filter(Agent.id == dep.agent_id).first()
        target_agent = db.query(Agent).filter(Agent.id == dep.depends_on_agent_id).first()
        
        link_status = "NORMAL"
        if source_agent.status == "SUSPENDED" or target_agent.status == "SUSPENDED":
            link_status = "SUSPENDED"
        
        links.append({
            "source": dep.agent_id,
            "target": dep.depends_on_agent_id,
            "status": link_status
        })

    return {"nodes": nodes, "links": links}

@app.get("/api/approvals")
def get_approvals(db: Session = Depends(get_db)):
    approvals = db.query(Approval).filter(Approval.status == "PENDING").all()
    result = []
    for appr in approvals:
        task = db.query(Task).filter(Task.id == appr.task_id).first()
        result.append({
            "id": appr.id,
            "task_id": appr.task_id,
            "task_description": task.description if task else "Unknown task",
            "action_name": appr.action_name,
            "status": appr.status,
            "created_at": appr.updated_at.isoformat()
        })
    return result

@app.post("/api/approvals/{approval_id}/action")
def update_approval(
    approval_id: str, 
    action: str = Body(embed=True), 
    reason: str = Body(None, embed=True),
    db: Session = Depends(get_db)
):
    approval = db.query(Approval).filter(Approval.id == approval_id).first()
    if not approval:
        raise HTTPException(status_code=404, detail="Approval request not found")
        
    status = action.upper() # APPROVED or REJECTED
    if status not in ["APPROVED", "REJECTED"]:
        raise HTTPException(status_code=400, detail="Invalid action. Use APPROVED or REJECTED")

    approval.status = status
    approval.reason = reason
    approval.reviewer = "Human Manager"
    approval.updated_at = datetime.utcnow()
    
    # Log this action
    log_msg = f"Human Manager {status.lower()} the action: {approval.action_name}."
    if reason:
        log_msg += f" Feedback: {reason}"
        
    db.add(Log(
        task_id=approval.task_id, 
        level="INFO", 
        message=log_msg
    ))
    
    # If approved or rejected, update task status accordingly
    task = db.query(Task).filter(Task.id == approval.task_id).first()
    if task:
        if status == "APPROVED":
            task.status = "SUCCESS" # Mark task resolved
            task.completed_at = datetime.utcnow()
        else:
            task.status = "FAILED"
            task.completed_at = datetime.utcnow()
            
        # Record task execution cost to credit agent total spend
        db.add(Cost(
            task_id=approval.task_id,
            prompt_tokens=4200,
            completion_tokens=1500,
            cost_usd=0.00078,
            timestamp=datetime.utcnow()
        ))
            
    db.commit()
    
    # Notify active UI listeners about the update
    notify_clients("APPROVAL_UPDATED", {
        "approval_id": approval_id,
        "status": status,
        "task_id": approval.task_id
    })

    return {"message": f"Approval {status.lower()} successfully"}

@app.get("/api/alerts")
def get_alerts(db: Session = Depends(get_db)):
    alerts = db.query(Alert).filter(Alert.resolved == False).all()
    result = []
    for a in alerts:
        result.append({
            "id": a.id,
            "task_id": a.task_id,
            "type": a.type,
            "severity": a.severity,
            "description": a.description,
            "timestamp": a.timestamp.isoformat()
        })
    return result

@app.post("/api/alerts/{alert_id}/resolve")
def resolve_alert(alert_id: int, db: Session = Depends(get_db)):
    alert = db.query(Alert).filter(Alert.id == alert_id).first()
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    alert.resolved = True
    db.commit()
    return {"message": "Alert resolved"}

@app.get("/api/logs")
def get_logs(task_id: str = None, db: Session = Depends(get_db)):
    query = db.query(Log)
    if task_id:
        query = query.filter(Log.task_id == task_id)
    logs = query.order_by(Log.timestamp.desc()).limit(100).all()
    
    result = []
    for l in logs:
        result.append({
            "id": l.id,
            "task_id": l.task_id,
            "level": l.level,
            "message": l.message,
            "timestamp": l.timestamp.isoformat()
        })
    return result

# ----------------- Real-Time Streaming & Simulator -----------------

@app.get("/api/events")
async def sse_endpoint():
    """SSE endpoint for streaming real-time status and logs to the frontend."""
    async def event_generator():
        queue = asyncio.Queue()
        active_streams.append(queue)
        try:
            # Initial ping
            yield "data: {\"event\": \"CONNECTED\"}\n\n"
            while True:
                # Wait for database/task events
                data = await queue.get()
                yield f"data: {data}\n\n"
        except asyncio.CancelledError:
            pass
        finally:
            active_streams.remove(queue)

    return StreamingResponse(event_generator(), media_type="text/event-stream")


@app.post("/api/run-task")
async def run_task(payload: dict = Body(...), db: Session = Depends(get_db)):
    """Triggers an agent task. If offline or no keys, it runs a step-by-step simulation."""
    prompt = payload.get("prompt", "")
    scenario = payload.get("scenario", "standard") # standard, approval_demo, loop_demo, cost_demo
    
    task_id = str(uuid.uuid4())
    
    # 1. Create running task
    new_task = Task(
        id=task_id,
        agent_id="orchestrator",
        status="RUNNING",
        description=f"Query: {prompt}"
    )
    db.add(new_task)
    db.commit()

    # Stream start event
    notify_clients("TASK_STARTED", {"task_id": task_id, "description": prompt})

    # Start runner in background
    if is_live_gemini and scenario == "standard":
        asyncio.create_task(run_live_gemini_task(task_id, prompt))
    else:
        asyncio.create_task(simulate_agent_execution(task_id, scenario, prompt, db))
    
    return {"task_id": task_id, "message": "Task execution started"}


async def simulate_agent_execution(task_id: str, scenario: str, prompt: str, db_session_maker):
    """Simulates multi-agent execution step-by-step, dynamically routing to registered agents."""
    db = SessionLocal()
    try:
        now = datetime.utcnow()
        
        # 1. Retrieve all registered specialist agents
        agents_list = db.query(Agent).filter(Agent.id != "orchestrator").all()
        
        # Determine which agents are referenced in the prompt text
        matched_agents = []
        for ag in agents_list:
            if ag.id.lower() in prompt.lower() or ag.name.lower() in prompt.lower() or ag.role.lower() in prompt.lower():
                matched_agents.append(ag)
        
        # Fallback if no matching agents found in prompt
        if not matched_agents:
            if "onboard" in scenario or "hr" in scenario:
                hr = db.query(Agent).filter(Agent.id == "hr_agent").first()
                if hr: matched_agents.append(hr)
            elif "approval" in scenario or "budget" in scenario or "loop" in scenario or "retry" in scenario:
                fin = db.query(Agent).filter(Agent.id == "finance_agent").first()
                if fin: matched_agents.append(fin)
            else:
                # Select the first two agents to simulate collaboration
                matched_agents = agents_list[:2] if len(agents_list) >= 2 else agents_list

        # Log Step 1: Orchestrator parsing
        db.add(Log(task_id=task_id, level="INFO", message="Orchestrator Agent: Parsing user request and generating execution plan.", timestamp=now))
        db.commit()
        notify_clients("LOG_ADDED", {"task_id": task_id, "level": "INFO", "message": "Orchestrator Agent: Parsing user request and generating execution plan."})
        await asyncio.sleep(0.4)

        # 2. Check if scenario calls for an anomaly/demo flow
        is_approval = "approval" in scenario or "budget" in scenario or "verify" in prompt.lower()
        is_loop = "loop" in scenario or "retry" in scenario or "fail" in prompt.lower()

        if is_approval:
            # Human Approval workflow
            target_agent = matched_agents[0] if matched_agents else None
            target_agent_id = target_agent.id if target_agent else "finance_agent"
            target_agent_name = target_agent.name if target_agent else "Finance Specialist"
            
            task = db.query(Task).filter(Task.id == task_id).first()
            if task:
                task.agent_id = target_agent_id
                db.commit()

            db.add(Log(task_id=task_id, level="INFO", message=f"Orchestrator Agent: Delegating high-risk operation to {target_agent_name}.", timestamp=now))
            db.commit()
            notify_clients("LOG_ADDED", {"task_id": task_id, "level": "INFO", "message": f"Orchestrator Agent: Delegating high-risk operation to {target_agent_name}."})
            await asyncio.sleep(0.4)

            db.add(Log(task_id=task_id, level="WARNING", message=f"{target_agent_name}: Operation verification requires Human governance override. Pausing executor.", timestamp=now))
            if task:
                task.status = "PENDING_APPROVAL"
            db.commit()

            # Create Approval item
            appr_id = str(uuid.uuid4())
            db.add(Approval(
                id=appr_id,
                task_id=task_id,
                action_name=f"Governance authorization for {target_agent_name}",
                status="PENDING",
                updated_at=datetime.utcnow()
            ))
            db.commit()
            
            notify_clients("LOG_ADDED", {"task_id": task_id, "level": "WARNING", "message": f"{target_agent_name}: Triggered Human approval."})
            notify_clients("APPROVAL_REQUIRED", {"approval_id": appr_id, "task_id": task_id})

        elif is_loop:
            # Loop Anomaly Simulation
            target_agent = matched_agents[0] if matched_agents else None
            target_agent_id = target_agent.id if target_agent else "finance_agent"
            target_agent_name = target_agent.name if target_agent else "Finance Specialist"
            
            task = db.query(Task).filter(Task.id == task_id).first()
            if task:
                task.agent_id = target_agent_id
                db.commit()

            db.add(Log(task_id=task_id, level="INFO", message=f"Orchestrator Agent: Directing operation to {target_agent_name}.", timestamp=now))
            db.commit()
            notify_clients("LOG_ADDED", {"task_id": task_id, "level": "INFO", "message": f"Orchestrator Agent: Directing operation to {target_agent_name}."})
            await asyncio.sleep(0.3)

            for i in range(1, 5):
                db.add(Log(task_id=task_id, level="WARNING", message=f"{target_agent_name}: Resource check. Attempt {i} timed out. Retrying...", timestamp=now))
                db.commit()
                notify_clients("LOG_ADDED", {"task_id": task_id, "level": "WARNING", "message": f"{target_agent_name}: Attempt {i} timed out. Retrying..."})
                await asyncio.sleep(0.4)

            # Anomaly trigger
            db.add(Log(task_id=task_id, level="ERROR", message=f"Observability Guardian: Suspending {target_agent_name}. Infinite retry loop anomaly detected.", timestamp=now))
            if task:
                task.status = "FAILED"
                task.completed_at = datetime.utcnow()

            # Record cost
            db.add(Cost(task_id=task_id, prompt_tokens=15000, completion_tokens=2800, cost_usd=0.0019, timestamp=datetime.utcnow()))
            
            # Create Alert
            db.add(Alert(
                task_id=task_id,
                type="LOOP_DETECTION",
                severity="CRITICAL",
                description=f"{target_agent_name} exceeded session retry limits. Automatically suspended.",
                timestamp=datetime.utcnow()
            ))
            db.commit()

            notify_clients("ALERT_TRIGGERED", {"task_id": task_id, "type": "LOOP_DETECTION", "message": "Infinite loop detected"})
            notify_clients("TASK_COMPLETED", {"task_id": task_id, "status": "FAILED"})

        else:
            # Multi-Agent Collaborative standard run!
            # Loop through matched agents and run a step for each
            for ag in matched_agents:
                sub_task_id = str(uuid.uuid4())
                # Create sub-task record for this specialist
                sub_task = Task(
                    id=sub_task_id,
                    agent_id=ag.id,
                    status="RUNNING",
                    description=f"Sub-task: {prompt}"
                )
                db.add(sub_task)
                db.commit()

                # Log Orchestrator delegating
                db.add(Log(task_id=task_id, level="INFO", message=f"Orchestrator Agent: Delegating sub-task validation to {ag.name}.", timestamp=datetime.utcnow()))
                db.commit()
                notify_clients("LOG_ADDED", {"task_id": task_id, "level": "INFO", "message": f"Orchestrator Agent: Delegating sub-task validation to {ag.name}."})
                await asyncio.sleep(0.4)

                # Log specialist processing (link logs to both main task and sub-task)
                db.add(Log(task_id=task_id, level="INFO", message=f"{ag.name}: Analyzing request payload and verifying corporate compliance.", timestamp=datetime.utcnow()))
                db.add(Log(task_id=sub_task_id, level="INFO", message=f"{ag.name}: Analyzing request payload and verifying corporate compliance.", timestamp=datetime.utcnow()))
                db.commit()
                notify_clients("LOG_ADDED", {"task_id": task_id, "level": "INFO", "message": f"{ag.name}: Analyzing request payload and verifying corporate compliance."})
                await asyncio.sleep(0.4)

                # Log success
                db.add(Log(task_id=task_id, level="INFO", message=f"{ag.name}: Compliance checks passed. Task executed successfully.", timestamp=datetime.utcnow()))
                db.add(Log(task_id=sub_task_id, level="INFO", message=f"{ag.name}: Compliance checks passed. Task executed successfully.", timestamp=datetime.utcnow()))
                db.commit()
                notify_clients("LOG_ADDED", {"task_id": task_id, "level": "INFO", "message": f"{ag.name}: Compliance checks passed. Task executed successfully."})
                await asyncio.sleep(0.3)

                # Record cost associated with the sub-task
                db.add(Cost(
                    task_id=sub_task_id,
                    prompt_tokens=1800,
                    completion_tokens=750,
                    cost_usd=0.00045,
                    timestamp=datetime.utcnow()
                ))
                sub_task.status = "SUCCESS"
                sub_task.completed_at = datetime.utcnow()
                db.commit()
            
            # Finally complete the main task
            task = db.query(Task).filter(Task.id == task_id).first()
            if task:
                task.agent_id = matched_agents[0].id if matched_agents else "orchestrator"
                task.status = "SUCCESS"
                task.completed_at = datetime.utcnow()
                
            # Add cost entry for main task
            db.add(Cost(
                task_id=task_id,
                prompt_tokens=1200,
                completion_tokens=400,
                cost_usd=0.00022,
                timestamp=datetime.utcnow()
            ))
            db.commit()
            
            notify_clients("TASK_COMPLETED", {"task_id": task_id, "status": "SUCCESS"})

    except Exception as e:
        print(f"Error in background simulator: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
