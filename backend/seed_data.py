import uuid
from datetime import datetime, timedelta
from database import SessionLocal, init_db, Agent, Task, Log, Cost, Approval, Alert, AgentDependency, Base, engine

def seed_database():
    # Recreate tables to start clean
    Base.metadata.drop_all(bind=engine)
    init_db()
    
    db = SessionLocal()
    try:
        print("Seeding database...")
        
        # 1. Add Agents
        orchestrator = Agent(
            id="orchestrator",
            name="Orchestrator Agent",
            role="Task routing, agent coordination, and user query response.",
            status="ACTIVE",
            cost_limit=5.00,
            configuration='{"temperature": 0.2, "model": "gemini-1.5-flash"}'
        )
        
        hr_agent = Agent(
            id="hr_agent",
            name="HR Specialist",
            role="Onboarding employees, generating checklists, and managing records.",
            status="ACTIVE",
            cost_limit=2.00,
            configuration='{"temperature": 0.5, "model": "gemini-1.5-flash"}'
        )
        
        finance_agent = Agent(
            id="finance_agent",
            name="Finance Specialist",
            role="Handling budgets, invoice verification, and cost tracking.",
            status="ACTIVE",
            cost_limit=3.00,
            configuration='{"temperature": 0.0, "model": "gemini-1.5-flash"}'
        )
        
        db.add_all([orchestrator, hr_agent, finance_agent])
        db.commit()
        
        # 2. Add Dependencies
        dep1 = AgentDependency(agent_id="orchestrator", depends_on_agent_id="hr_agent")
        dep2 = AgentDependency(agent_id="orchestrator", depends_on_agent_id="finance_agent")
        db.add_all([dep1, dep2])
        db.commit()

        now = datetime.utcnow()
        
        # 3. Task 1: Onboard John Doe (Successful Run - 10 hours ago)
        t1_id = str(uuid.uuid4())
        task1 = Task(
            id=t1_id,
            agent_id="orchestrator",
            status="SUCCESS",
            description="Onboard employee John Doe (Engineering Dept) with standard access setup.",
            created_at=now - timedelta(hours=10),
            completed_at=now - timedelta(hours=10, minutes=15)
        )
        db.add(task1)
        db.commit()
        
        # Logs for Task 1
        logs_t1 = [
            Log(task_id=t1_id, level="INFO", message="Received query: Onboard employee John Doe.", timestamp=now - timedelta(hours=10)),
            Log(task_id=t1_id, level="INFO", message="Routing task to HR Specialist agent.", timestamp=now - timedelta(hours=10, minutes=2)),
            Log(task_id=t1_id, level="INFO", message="HR Specialist: Checking database for employee records.", timestamp=now - timedelta(hours=10, minutes=5)),
            Log(task_id=t1_id, level="INFO", message="HR Specialist: Created onboarding email template.", timestamp=now - timedelta(hours=10, minutes=8)),
            Log(task_id=t1_id, level="INFO", message="HR Specialist completed task. Handing control back to Orchestrator.", timestamp=now - timedelta(hours=10, minutes=11)),
            Log(task_id=t1_id, level="INFO", message="Orchestrator: Finished task compilation. Result sent to user.", timestamp=now - timedelta(hours=10, minutes=15))
        ]
        db.add_all(logs_t1)
        
        # Cost for Task 1
        cost_t1 = Cost(
            task_id=t1_id,
            prompt_tokens=4200,
            completion_tokens=1800,
            cost_usd=(4200 * 0.075 / 1000000) + (1800 * 0.30 / 1000000), # Virtual calculation
            timestamp=now - timedelta(hours=10)
        )
        db.add(cost_t1)
        db.commit()

        # 4. Task 2: Budget Audit request (Human Approval Center Demo - 5 hours ago)
        t2_id = str(uuid.uuid4())
        task2 = Task(
            id=t2_id,
            agent_id="orchestrator",
            status="SUCCESS",
            description="Process Q2 Server Infrastructure hardware purchase of $4,500.",
            created_at=now - timedelta(hours=5),
            completed_at=now - timedelta(hours=4, minutes=45)
        )
        db.add(task2)
        db.commit()
        
        logs_t2 = [
            Log(task_id=t2_id, level="INFO", message="Received query: Buy server infrastructure worth $4,500.", timestamp=now - timedelta(hours=5)),
            Log(task_id=t2_id, level="INFO", message="Delegating request to Finance Specialist.", timestamp=now - timedelta(hours=5, minutes=1)),
            Log(task_id=t2_id, level="WARNING", message="Finance Specialist: Requested budget exceeds local agent approval threshold ($1,000). Pausing for human authorization.", timestamp=now - timedelta(hours=5, minutes=3)),
            Log(task_id=t2_id, level="INFO", message="Human Approver 'Admin' approved transaction. Reason: Approved for AWS replacement server.", timestamp=now - timedelta(hours=4, minutes=50)),
            Log(task_id=t2_id, level="INFO", message="Finance Specialist: Resuming execution. Writing approval metadata to logs.", timestamp=now - timedelta(hours=4, minutes=48)),
            Log(task_id=t2_id, level="INFO", message="Task completed successfully.", timestamp=now - timedelta(hours=4, minutes=45))
        ]
        db.add_all(logs_t2)
        
        # Cost for Task 2
        cost_t2 = Cost(
            task_id=t2_id,
            prompt_tokens=8500,
            completion_tokens=2200,
            cost_usd=(8500 * 0.075 / 1000000) + (2200 * 0.30 / 1000000),
            timestamp=now - timedelta(hours=5)
        )
        db.add(cost_t2)
        
        # Approval record for Task 2
        approval_t2 = Approval(
            id=str(uuid.uuid4()),
            task_id=t2_id,
            action_name="Q2 Server Infrastructure Hardware Purchase",
            status="APPROVED",
            reason="Approved for AWS replacement server.",
            reviewer="Admin",
            updated_at=now - timedelta(hours=4, minutes=50)
        )
        db.add(approval_t2)
        db.commit()

        # 5. Task 3: Failed Loop Anomaly Task (2 hours ago)
        t3_id = str(uuid.uuid4())
        task3 = Task(
            id=t3_id,
            agent_id="orchestrator",
            status="FAILED",
            description="Sync ledger balances from internal registry database.",
            created_at=now - timedelta(hours=2),
            completed_at=now - timedelta(hours=1, minutes=40)
        )
        db.add(task3)
        db.commit()
        
        logs_t3 = [
            Log(task_id=t3_id, level="INFO", message="Received query: Sync ledger balances.", timestamp=now - timedelta(hours=2)),
            Log(task_id=t3_id, level="INFO", message="Orchestrator: Routing task to Finance Specialist.", timestamp=now - timedelta(hours=2, minutes=2)),
            Log(task_id=t3_id, level="INFO", message="Finance Specialist: Fetching balance sheets from registry.", timestamp=now - timedelta(hours=2, minutes=4)),
            Log(task_id=t3_id, level="WARNING", message="Finance Specialist: Registry database returned timeout. Retrying check.", timestamp=now - timedelta(hours=2, minutes=6)),
            Log(task_id=t3_id, level="WARNING", message="Finance Specialist: Registry database returned timeout. Retrying check.", timestamp=now - timedelta(hours=2, minutes=8)),
            Log(task_id=t3_id, level="WARNING", message="Finance Specialist: Registry database returned timeout. Retrying check.", timestamp=now - timedelta(hours=2, minutes=10)),
            Log(task_id=t3_id, level="WARNING", message="Finance Specialist: Registry database returned timeout. Retrying check.", timestamp=now - timedelta(hours=2, minutes=12)),
            Log(task_id=t3_id, level="ERROR", message="Observability Observer: Agent loop detected (5 consecutive identical retries). Suspending task.", timestamp=now - timedelta(hours=1, minutes=45)),
            Log(task_id=t3_id, level="ERROR", message="Task execution halted automatically.", timestamp=now - timedelta(hours=1, minutes=40))
        ]
        db.add_all(logs_t3)
        
        cost_t3 = Cost(
            task_id=t3_id,
            prompt_tokens=22000,
            completion_tokens=6500,
            cost_usd=(22000 * 0.075 / 1000000) + (6500 * 0.30 / 1000000),
            timestamp=now - timedelta(hours=2)
        )
        db.add(cost_t3)
        
        alert_t3 = Alert(
            task_id=t3_id,
            type="LOOP_DETECTION",
            severity="CRITICAL",
            description="Finance Specialist agent was caught in a retry loop (5 identical operations). Halted to prevent token drain.",
            resolved=False,
            timestamp=now - timedelta(hours=1, minutes=45)
        )
        db.add(alert_t3)
        db.commit()

        # 6. Task 4: High Cost Breach simulation (30 mins ago - still running / suspended)
        t4_id = str(uuid.uuid4())
        task4 = Task(
            id=t4_id,
            agent_id="orchestrator",
            status="FAILED",
            description="Process batch parsing of 500 pages corporate expense logs.",
            created_at=now - timedelta(minutes=30),
            completed_at=now - timedelta(minutes=10)
        )
        db.add(task4)
        db.commit()
        
        logs_t4 = [
            Log(task_id=t4_id, level="INFO", message="Received batch PDF parsing request.", timestamp=now - timedelta(minutes=30)),
            Log(task_id=t4_id, level="INFO", message="Delegating chunk processing to HR Specialist agent.", timestamp=now - timedelta(minutes=28)),
            Log(task_id=t4_id, level="WARNING", message="Observability Observer: Token usage spike detected (current cumulative cost: $2.14). Limit is $2.00.", timestamp=now - timedelta(minutes=15)),
            Log(task_id=t4_id, level="ERROR", message="Observability Observer: Cost ceiling breached. Suspending HR Specialist agent and terminating task.", timestamp=now - timedelta(minutes=10))
        ]
        db.add_all(logs_t4)
        
        cost_t4 = Cost(
            task_id=t4_id,
            prompt_tokens=150000,
            completion_tokens=25000,
            cost_usd=2.14,
            timestamp=now - timedelta(minutes=30)
        )
        db.add(cost_t4)
        
        alert_t4 = Alert(
            task_id=t4_id,
            type="COST_LIMIT",
            severity="CRITICAL",
            description="HR Specialist agent exceeded its session spending budget of $2.00 (spent $2.14). Task terminated.",
            resolved=False,
            timestamp=now - timedelta(minutes=15)
        )
        db.add(alert_t4)
        db.commit()

        print("Database seeded successfully with dummy records!")
    except Exception as e:
        print(f"Error during seeding: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
