# TODO: Agent Control Tower - Project Blueprint & Action Plan

This document serves as our concrete roadmap and blueprint. It lists the exact agents, APIs, database tables, project folder structure, and step-by-step TODO items we will build.

---

## 1. What We Are Building: "Agent Control Tower"

An enterprise observability and governance dashboard for multi-agent systems. When an organization runs AI agents (like HR, Finance, or IT agents), managers need to see:
*   Are the agents running or stuck?
*   How much money (tokens) are they spending?
*   Are there errors or infinite loops (anomalies)?
*   Can humans approve critical actions (like payments or document releases) before the agent executes them?

---

## 2. The Core AI Agents We Are Creating

To make the demo realistic without over-complicating, we will implement **three agents** using the Python **CrewAI** (or custom lightweight agent wrapper) powered by the **Gemini 1.5 Flash** model:

1.  **Orchestrator Agent**: 
    *   **Role**: Accepts a user request (e.g., *"Onboard new employee Jane Doe with a $5,000 laptop budget"*).
    *   **Task**: Breaks the query down, determines if it requires HR or Finance tools, calls those agents, and handles the final response.
2.  **HR Specialist Agent**:
    *   **Role**: Handles employee details, creates onboarding checklist records, and updates HR status.
    *   **Tools**: `create_employee_record`, `generate_onboarding_email`.
3.  **Finance Specialist Agent**:
    *   **Role**: Processes budget approvals and expense tracking.
    *   **Tools**: `check_budget_limits`, `request_human_approval` (triggers a pause waiting for human override).

---

## 3. APIs, Tokens & Costs (100% Free Setup)

*   **API Model**: `gemini-1.5-flash` via Google AI Studio.
*   **API Cost**: **$0.00** (Free Tier).
*   **Virtual Pricing Model** (for dashboard metrics):
    *   To show realistic enterprise costing graphs, our code will count the tokens used in each API request and multiply them by standard pricing:
        *   **Input Tokens**: $0.075 per 1,000,000 tokens.
        *   **Output Tokens**: $0.30 per 1,000,000 tokens.
    *   This virtual cost is written to the SQLite database so the frontend can display beautiful spend graphs in real-time.

---

## 4. Proposed Database Schema (SQLite)

We will create a single database file `control_tower.db` containing these tables:
1.  `agents`: Stores registered agents (`Orchestrator`, `HR_Agent`, `Finance_Agent`), their status (`ACTIVE`, `IDLE`, `SUSPENDED`), and configuration.
2.  `tasks`: Stores active or completed jobs (e.g., *"Onboard employee Jane"*), status (`RUNNING`, `SUCCESS`, `FAILED`, `PENDING_APPROVAL`).
3.  `logs`: Raw execution traces (e.g., *"Orchestrator called Finance agent"*, timestamp, logs).
4.  `costs`: Token usage per request (input tokens, output tokens, calculated cost in USD).
5.  `approvals`: Human-in-the-loop requests. Stores the task ID, action details (e.g., *"Approve $5,000 Laptop purchase"*), and status (`PENDING`, `APPROVED`, `REJECTED`).
6.  `alerts`: Triggered anomalies (e.g., *"Agent loop detected"* or *"Cost ceiling breached"*).

---

## 5. Folder & Code Structure

We will structure the workspace as follows:

```text
e:\LTTS_HACKATHON\
│
├── TODO.md                  # This file
├── control_tower.db         # SQLite database file (created automatically)
│
├── backend/                 # FastAPI Python Backend
│   ├── .env                 # Stores GEMINI_API_KEY (free)
│   ├── main.py              # FastAPI endpoints, WebSocket/SSE server
│   ├── database.py          # SQLite connection and SQLAlchemy models
│   ├── agents/              # Python Agent Engine
│   │   ├── __init__.py
│   │   ├── core_agents.py   # CrewAI definition of Orchestrator, HR, Finance
│   │   ├── tools.py         # Tools used by agents (e.g., SQLite insertions, approvals)
│   │   └── observer.py      # Intercepts agent calls to log tokens, costs, and errors
│   └── requirements.txt     # Python libraries (fastapi, uvicorn, sqlalchemy, crewai, google-generativeai)
│
└── frontend/                # React.js Frontend
    ├── package.json         # UI dependencies (React, Material UI, React Flow, Recharts)
    ├── src/
    │   ├── App.js           # Main router and layout
    │   ├── index.js
    │   ├── theme.js         # Material UI theme setup (slick dark mode/enterprise layout)
    │   ├── components/      # UI Components
    │   │   ├── MetricCards.jsx  # KPI numbers (Active agents, Health score, Total cost)
    │   │   ├── LineageGraph.jsx # React Flow visual graph showing active agent calls
    │   │   ├── LogViewer.jsx    # Real-time console logs from agents
    │   │   ├── CostCharts.jsx   # Spend over time using Recharts
    │   │   ├── ApprovalQueue.jsx# Action buttons to Approve / Reject actions
    │   │   └── AlertBanner.jsx  # High-priority warnings for anomalies
    │   └── services/
    │       └── api.js       # Functions for frontend to talk to FastAPI backend
```

---

## 6. Step-by-Step Implementation TODO List

Here are the concrete steps we will execute one-by-one:

### [ ] Step 1: Initialize Project Folders
*   Create `backend/` and `frontend/` folders.
*   Initialize Python virtual environment and `requirements.txt`.
*   Initialize React application using standard template.

### [ ] Step 2: Database Setup (SQLite & SQLAlchemy)
*   Write `backend/database.py` with SQLAlchemy models representing our schema.
*   Create helper functions to insert logs, update agent status, record token usage, and queue approvals.

### [ ] Step 3: Mock Data Generator (For beautiful graphs & instant demo data)
*   Create a script `backend/seed_data.py` to fill the SQLite database with 24 hours of simulated agent tasks, costs, and anomaly logs.
*   *Why?* This ensures that the moment we boot up the frontend dashboard, we have beautiful, filled-out charts and logs to show the judges, rather than a blank screen.

### [ ] Step 4: FastAPI Backend Endpoints
*   Set up FastAPI server in `backend/main.py`.
*   Create endpoints:
    *   `GET /api/dashboard/summary` (aggregated KPIs).
    *   `GET /api/agents` & `GET /api/tasks` (status lists).
    *   `GET /api/lineage` (returns nodes and links for the lineage graph).
    *   `GET /api/approvals` & `POST /api/approvals/{id}/{action}` (approve or reject operations).
    *   `GET /api/logs` (live/historical logs).

### [ ] Step 5: Frontend Layout & Theme (Material UI)
*   Design a premium dark-themed layout with sidebar navigation.
*   Build the top KPI metrics cards (Health score, Active counts, Total virtual spend).

### [ ] Step 6: Visual Lineage Graph (React Flow)
*   Integrate React Flow into the dashboard.
*   Draw nodes representing each agent (Orchestrator, HR, Finance).
*   Add visual connection lines (edges) colored green for active, orange for pending approval, and red for failed dependencies.

### [ ] Step 7: Live Agent Engine (CrewAI & Gemini Free API)
*   Create `backend/agents/core_agents.py` using CrewAI.
*   Set up a mock backend task runner to execute agent flows in response to frontend inputs.
*   Add token tracking callback code to intercept requests to Gemini and log token counts to SQLite.

### [ ] Step 8: Human-in-the-Loop Approval Center
*   Wire up the frontend Approval queue.
*   When a user clicks "Approve", notify the backend to release the paused agent step, allowing the script to finish and log the success.

### [ ] Step 9: Final Polish & Demo Scenario Prep
*   Set up the presentation scenario (Healthy path -> Approval required -> Anomaly trigger -> AI explanation Chatbot).
