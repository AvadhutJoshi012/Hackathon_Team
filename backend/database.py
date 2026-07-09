import os
from datetime import datetime
from sqlalchemy import create_engine, Column, String, Integer, Float, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker, relationship
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./control_tower.db")

engine = create_engine(
    DATABASE_URL, 
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Agent(Base):
    __tablename__ = "agents"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    role = Column(String, nullable=False)
    status = Column(String, default="ACTIVE")  # ACTIVE, IDLE, SUSPENDED
    cost_limit = Column(Float, default=1.0)    # Limit in USD
    configuration = Column(String, nullable=True) # JSON string of configs

    # Relationships
    tasks = relationship("Task", back_populates="agent")

class Task(Base):
    __tablename__ = "tasks"

    id = Column(String, primary_key=True, index=True)
    agent_id = Column(String, ForeignKey("agents.id"), nullable=False)
    status = Column(String, default="RUNNING")  # RUNNING, SUCCESS, FAILED, PENDING_APPROVAL
    description = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)

    # Relationships
    agent = relationship("Agent", back_populates="tasks")
    logs = relationship("Log", back_populates="task")
    costs = relationship("Cost", back_populates="task")
    approvals = relationship("Approval", back_populates="task")
    alerts = relationship("Alert", back_populates="task")

class Log(Base):
    __tablename__ = "logs"

    id = Column(Integer, primary_key=True, autoincrement=True)
    task_id = Column(String, ForeignKey("tasks.id"), nullable=False)
    level = Column(String, default="INFO")       # INFO, WARNING, ERROR
    message = Column(String, nullable=False)
    payload = Column(String, nullable=True)      # JSON metadata
    timestamp = Column(DateTime, default=datetime.utcnow)

    # Relationships
    task = relationship("Task", back_populates="logs")

class Cost(Base):
    __tablename__ = "costs"

    id = Column(Integer, primary_key=True, autoincrement=True)
    task_id = Column(String, ForeignKey("tasks.id"), nullable=False)
    prompt_tokens = Column(Integer, default=0)
    completion_tokens = Column(Integer, default=0)
    cost_usd = Column(Float, default=0.0)
    timestamp = Column(DateTime, default=datetime.utcnow)

    # Relationships
    task = relationship("Task", back_populates="costs")

class Approval(Base):
    __tablename__ = "approvals"

    id = Column(String, primary_key=True, index=True) # e.g. approval_uuid
    task_id = Column(String, ForeignKey("tasks.id"), nullable=False)
    action_name = Column(String, nullable=False)   # e.g. "laptop_purchase"
    status = Column(String, default="PENDING")    # PENDING, APPROVED, REJECTED
    reason = Column(String, nullable=True)        # Feedback from human
    reviewer = Column(String, nullable=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    task = relationship("Task", back_populates="approvals")

class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, autoincrement=True)
    task_id = Column(String, ForeignKey("tasks.id"), nullable=False)
    type = Column(String, nullable=False)         # LOOP_DETECTION, COST_LIMIT, AGENT_FAILURE
    severity = Column(String, default="WARNING") # INFO, WARNING, CRITICAL
    description = Column(String, nullable=False)
    resolved = Column(Boolean, default=False)
    timestamp = Column(DateTime, default=datetime.utcnow)

    # Relationships
    task = relationship("Task", back_populates="alerts")

class AgentDependency(Base):
    __tablename__ = "agent_dependencies"

    id = Column(Integer, primary_key=True, autoincrement=True)
    agent_id = Column(String, ForeignKey("agents.id"), nullable=False)
    depends_on_agent_id = Column(String, ForeignKey("agents.id"), nullable=False)

def init_db():
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    print("Initializing SQLite Database...")
    init_db()
    print("Database tables created successfully!")
