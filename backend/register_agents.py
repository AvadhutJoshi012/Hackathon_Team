import sqlite3
import os

def register():
    db_paths = ["backend/control_tower.db", "control_tower.db"]
    for path in db_paths:
        if not os.path.exists(path):
            continue
            
        print(f"Connecting to database at: {path}")
        conn = sqlite3.connect(path)
        cursor = conn.cursor()
        
        # New agents to register
        agents = [
            ("legal_specialist", "Legal Specialist", "Review contracts, terms of service, and corporate compliance logs.", "ACTIVE", 4.00, '{"temperature": 0.1, "model": "gemini-1.5-flash"}'),
            ("it_helpdesk", "IT Helpdesk Agent", "Provision system access keys, reset credentials, and audit security tokens.", "ACTIVE", 2.50, '{"temperature": 0.4, "model": "gemini-1.5-flash"}'),
            ("marketing_agent", "Marketing Copywriter", "Audit copy drafts, verify brand safety keywords, and compose media releases.", "ACTIVE", 1.50, '{"temperature": 0.8, "model": "gemini-1.5-flash"}'),
            ("devops_agent", "DevOps Engineer", "Monitor container health logs, deployment pipelines, and verify cloud cost margins.", "ACTIVE", 3.50, '{"temperature": 0.2, "model": "gemini-1.5-flash"}')
        ]
        
        for ag in agents:
            # Check if agent already exists
            cursor.execute("SELECT id FROM agents WHERE id = ?", (ag[0],))
            if cursor.fetchone():
                print(f"Agent '{ag[1]}' already registered.")
            else:
                cursor.execute(
                    "INSERT INTO agents (id, name, role, status, cost_limit, configuration) VALUES (?, ?, ?, ?, ?, ?)",
                    ag
                )
                print(f"Registered agent: {ag[1]}")
                
            # Add dependency to orchestrator if not exists
            cursor.execute("SELECT id FROM agent_dependencies WHERE agent_id = 'orchestrator' AND depends_on_agent_id = ?", (ag[0],))
            if cursor.fetchone():
                print(f"Dependency Orchestrator -> '{ag[1]}' already exists.")
            else:
                cursor.execute(
                    "INSERT INTO agent_dependencies (agent_id, depends_on_agent_id) VALUES ('orchestrator', ?)",
                    (ag[0],)
                )
                print(f"Created dependency: Orchestrator -> {ag[1]}")
                
        conn.commit()
        conn.close()
        print(f"Finished updates for {path}\n")

if __name__ == "__main__":
    register()
