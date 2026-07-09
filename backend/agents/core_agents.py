import os
import json
import uuid
import datetime
from database import SessionLocal, Agent, Task, Log, Cost, Approval, Alert
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini API if key is present
GEMINI_KEY = os.getenv("GEMINI_API_KEY")
is_live_gemini = False

if GEMINI_KEY:
    try:
        genai.configure(api_key=GEMINI_KEY)
        is_live_gemini = True
        print("Gemini API configured successfully. Live agent runs enabled!")
    except Exception as e:
        print(f"Failed to configure Gemini API: {e}. Running in local simulation mode.")
else:
    print("No GEMINI_API_KEY found in .env. Running in local simulation mode.")

def calculate_virtual_cost(prompt_tokens: int, completion_tokens: int):
    """Calculates mock USD cost using virtual enterprise rates."""
    input_rate = 0.075 / 1_000_000   # $0.075 per 1M tokens
    output_rate = 0.30 / 1_000_000   # $0.30 per 1M tokens
    return (prompt_tokens * input_rate) + (completion_tokens * output_rate)

def log_agent_activity(task_id: str, agent_id: str, level: str, message: str):
    """Writes a trace log for an agent operation to SQLite."""
    db = SessionLocal()
    try:
        db.add(Log(
            task_id=task_id,
            level=level,
            message=f"{agent_id.upper()}: {message}",
            timestamp=datetime.datetime.utcnow()
        ))
        db.commit()
    finally:
        db.close()

# ----------------- Live LLM Agent Actions -----------------

async def run_live_gemini_task(task_id: str, prompt: str):
    """Executes live reasoning calling Google Gemini 1.5 Flash."""
    db = SessionLocal()
    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        
        # Construct agent system instructions
        system_instruction = (
            "You are the Orchestrator Agent for the Agent Control Tower. "
            "Your job is to parse the user prompt and delegate the execution to either HR or Finance.\n"
            "If the request involves onboarding, employee registration, or emails, write a response indicating "
            "you are delegating to the HR Specialist Agent.\n"
            "If the request involves budgets, purchases, expenses, or invoice approvals, write a response indicating "
            "you are delegating to the Finance Specialist Agent.\n"
            "Otherwise, respond directly to the query. Keep your answer brief and structured."
        )
        
        log_agent_activity(task_id, "orchestrator", "INFO", "Sending prompt to Gemini 1.5 Flash...")
        
        # Call API
        response = model.generate_content(
            f"{system_instruction}\n\nUser request: {prompt}"
        )
        
        # Extract response text and tokens
        text = response.text
        
        # Extract metadata (default to average counts if API doesn't return usage details)
        prompt_tokens = 500
        completion_tokens = 200
        try:
            if response.usage_metadata:
                prompt_tokens = response.usage_metadata.prompt_token_count
                completion_tokens = response.usage_metadata.candidates_token_count
        except:
            pass
            
        cost_usd = calculate_virtual_cost(prompt_tokens, completion_tokens)
        
        # Log cost
        db.add(Cost(
            task_id=task_id,
            prompt_tokens=prompt_tokens,
            completion_tokens=completion_tokens,
            cost_usd=cost_usd,
            timestamp=datetime.datetime.utcnow()
        ))
        
        # Write response to logs
        log_agent_activity(task_id, "orchestrator", "INFO", f"Gemini response: {text}")
        
        # Check if routing needs to happen
        task = db.query(Task).filter(Task.id == task_id).first()
        
        if "hr" in text.lower() or "onboard" in text.lower() or "employee" in text.lower():
            # Run HR sub-step
            log_agent_activity(task_id, "hr_agent", "INFO", "Received delegation. Running record onboarding...")
            hr_prompt = f"Onboard employee details based on query: {prompt}"
            hr_response = model.generate_content(
                f"You are the HR Specialist Agent. Formulate a brief employee onboarding payload for: {prompt}. Return clean JSON."
            )
            log_agent_activity(task_id, "hr_agent", "SUCCESS", f"Created record successfully: {hr_response.text}")
            
            task.status = "SUCCESS"
            task.completed_at = datetime.datetime.utcnow()
            
        elif "finance" in text.lower() or "budget" in text.lower() or "expense" in text.lower():
            # Run Finance sub-step
            log_agent_activity(task_id, "finance_agent", "INFO", "Received delegation. Checking budget margins...")
            
            # Simple threshold check
            needs_approval = False
            # Check if budget values are in the prompt
            for word in prompt.split():
                if word.replace('$', '').replace(',', '').isdigit():
                    val = int(word.replace('$', '').replace(',', ''))
                    if val > 1000:
                        needs_approval = True
                        break
            
            if needs_approval:
                log_agent_activity(task_id, "finance_agent", "WARNING", "Requested allocation exceeds local limit ($1,000). Pausing for human authorization.")
                task.status = "PENDING_APPROVAL"
                
                # Queue approval in database
                appr_id = str(uuid.uuid4())
                db.add(Approval(
                    id=appr_id,
                    task_id=task_id,
                    action_name=f"Allocate budget for: {prompt}",
                    status="PENDING",
                    updated_at=datetime.datetime.utcnow()
                ))
            else:
                log_agent_activity(task_id, "finance_agent", "SUCCESS", "Budget check passed under threshold limit.")
                task.status = "SUCCESS"
                task.completed_at = datetime.datetime.utcnow()
        else:
            # Direct text resolution
            task.status = "SUCCESS"
            task.completed_at = datetime.datetime.utcnow()

        db.commit()
    except Exception as e:
        log_agent_activity(task_id, "orchestrator", "ERROR", f"Agent call failed: {e}")
        task = db.query(Task).filter(Task.id == task_id).first()
        if task:
            task.status = "FAILED"
            task.completed_at = datetime.datetime.utcnow()
        db.commit()
    finally:
        db.close()
