import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ThemeProvider, CssBaseline, Box, Grid, Typography, Button, TextField, 
  Select, MenuItem, FormControl, InputLabel, Card, CardContent, Tab, Tabs, 
  Chip, Badge, IconButton, List, ListItem, ListItemButton, ListItemIcon, 
  ListItemText, Divider, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, 
  DialogActions, Stepper, Step, StepLabel, AppBar, Toolbar, Drawer
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import HistoryIcon from '@mui/icons-material/History';
import BarChartIcon from '@mui/icons-material/BarChart';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import TerminalIcon from '@mui/icons-material/Terminal';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AddIcon from '@mui/icons-material/Add';
import ReplayIcon from '@mui/icons-material/Replay';
import SecurityIcon from '@mui/icons-material/Security';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SettingsIcon from '@mui/icons-material/Settings';

import theme from './theme';
import MetricCards from './components/MetricCards';
import LineageGraph from './components/LineageGraph';
import LogViewer from './components/LogViewer';
import CostCharts from './components/CostCharts';
import ApprovalQueue from './components/ApprovalQueue';
import AlertBanner from './components/AlertBanner';
import PerformanceBars from './components/PerformanceBars';
import MiniSparkline from './components/MiniSparkline';

const API_BASE = 'http://127.0.0.1:8000/api';

// ----------------------------------------------------
// LANDING PAGE COMPONENT
// ----------------------------------------------------
function LandingPage({ onLaunch }) {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0a0b0d', color: '#f0f2f5', position: 'relative', overflowX: 'hidden' }}>
      {/* Concentric Radar Rings & Sweeper background */}
      <Box sx={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        background: 'conic-gradient(from 200deg at 80% 50%, rgba(10,11,13,0) 0%, rgba(255, 199, 0, 0.03) 70%, rgba(255, 199, 0, 0.08) 95%, rgba(10,11,13,0) 100%)',
        pointerEvents: 'none' 
      }} />
      <Box className="radar-ring" sx={{ width: 300, height: 300 }} />
      <Box className="radar-ring" sx={{ width: 500, height: 500 }} />
      <Box className="radar-ring" sx={{ width: 700, height: 700 }} />
      <Box className="radar-ring" sx={{ width: 900, height: 900 }} />
      <Box className="radar-ring" sx={{ width: 1100, height: 1100 }} />

      {/* Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: { xs: 3, md: 6 }, py: 3, borderBottom: '1px solid #161a22', position: 'relative', zIndex: 10 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {/* Custom yellow satellite icon logo */}
          <Box sx={{ 
            width: 32, 
            height: 32, 
            borderRadius: '50%', 
            bgcolor: '#ffc700', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: '#0a0b0d',
            boxShadow: '0 0 15px rgba(255, 199, 0, 0.6)'
          }}>
            <AutoAwesomeIcon sx={{ fontSize: 18 }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: '"Outfit", sans-serif', letterSpacing: '-0.5px' }}>
            AXON<span style={{ color: '#ffc700' }}>.</span>
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 4, display: { xs: 'none', md: 'flex' } }}>
          <Typography sx={{ color: 'text.secondary', fontWeight: 500, cursor: 'pointer', '&:hover': { color: 'primary.main' } }} onClick={() => document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' })}>Platform</Typography>
          <Typography sx={{ color: 'text.secondary', fontWeight: 500, cursor: 'pointer', '&:hover': { color: 'primary.main' } }} onClick={onLaunch}>Observability</Typography>
          <Typography sx={{ color: 'text.secondary', fontWeight: 500, cursor: 'pointer', '&:hover': { color: 'primary.main' } }} onClick={onLaunch}>Governance</Typography>
          <Typography sx={{ color: 'text.secondary', fontWeight: 500, cursor: 'pointer', '&:hover': { color: 'primary.main' } }} onClick={onLaunch}>Security</Typography>
        </Box>
        <Button variant="outlined" color="primary" onClick={onLaunch} sx={{ px: 3, borderRadius: '20px', borderWidth: 1, '&:hover': { borderWidth: 1 }, boxShadow: '0 0 10px rgba(255, 199, 0, 0.15)' }}>
          Launch Console
        </Button>
      </Box>

      {/* Hero Section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', py: { xs: 10, md: 15 }, px: 3, maxWidth: 900, mx: 'auto', position: 'relative', zIndex: 10 }}>
        <Chip 
          label="ENTERPRISE MULTI-AGENT GOVERNANCE PLATFORM" 
          sx={{ bgcolor: 'rgba(255, 199, 0, 0.08)', color: 'primary.main', fontWeight: 700, mb: 4, fontSize: '11px', border: '1px solid rgba(255, 199, 0, 0.25)', px: 1.5, py: 0.5 }} 
        />
        
        <Typography variant="h2" sx={{ fontWeight: 800, fontFamily: '"Outfit", sans-serif', mb: 3, color: '#f0f2f5', lineHeight: 1.15, fontSize: { xs: '2.5rem', md: '3.75rem' } }}>
          The Central Nervous System for <br/>
          <span style={{ color: '#ffc700' }}>
            Enterprise AI Agents
          </span>
        </Typography>

        <Typography variant="body1" sx={{ color: '#8f9cae', fontWeight: 400, mb: 6, maxWidth: 720, mx: 'auto', lineHeight: 1.65, fontSize: { xs: '15px', md: '17px' } }}>
          Govern spend limits, trace agent lineage, and automatically intercept runaway loops across your entire multi-agent architecture — in one unified command console.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mb: 5 }}>
          <Button variant="contained" color="primary" onClick={onLaunch} sx={{ px: 4, py: 1.5, borderRadius: '6px', fontSize: '14px', fontWeight: 'bold', boxShadow: '0 4px 20px rgba(255, 199, 0, 0.35)' }}>
            Launch Control Console
          </Button>
          <Button 
            variant="outlined" 
            color="inherit" 
            onClick={() => document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' })} 
            sx={{ px: 4, py: 1.5, borderRadius: '6px', fontSize: '14px', borderColor: '#161a22', '&:hover': { borderColor: '#536275' } }}
          >
            Explore Blueprint Modules
          </Button>
        </Box>
        
        <Typography variant="body2" sx={{ color: '#ffc700', fontStyle: 'italic', fontWeight: 600, fontSize: '14px' }}>
          "Governance at the speed of autonomy."
        </Typography>
      </Box>

      {/* Scroll Down Indicator */}
      <Box sx={{ display: 'flex', justifyContent: 'center', pb: 10, position: 'relative', zIndex: 10 }}>
        <Box 
          sx={{ 
            width: '24px', 
            height: '40px', 
            border: '2px solid #536275', 
            borderRadius: '12px', 
            position: 'relative',
            cursor: 'pointer',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '4px',
              height: '8px',
              bgcolor: '#ffc700',
              borderRadius: '2px',
              animation: 'scrollDown 1.5s infinite'
            }
          }} 
          onClick={() => document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' })}
        />
      </Box>

      {/* Features Grid Section */}
      <Box id="features-section" sx={{ borderTop: '1px solid #161a22', bgcolor: '#111a22', py: 12, px: { xs: 3, md: 6 }, position: 'relative', zIndex: 10 }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
          <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 700, fontFamily: '"Outfit", sans-serif', mb: 2 }}>
            Engineered Observability Blueprint
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center', color: '#8f9cae', mb: 8, maxWidth: 700, mx: 'auto' }}>
            A fully compliant platform matching all 12 modules of the architectural control-tower model — governed end to end by RELAY.
          </Typography>

          <Grid container spacing={4}>
            {[
              { title: 'Dynamic Registry', subtitle: 'AGENT REGISTRY', desc: 'Discovery, telemetry tagging, metadata schemas, and configuration registers for every agent in the fleet.', color: '#ffc700', icon: <SettingsIcon sx={{ fontSize: 24, color: '#ffc700' }} /> },
              { title: 'Governance Center', subtitle: 'HUMAN-IN-THE-LOOP', desc: 'Human-in-the-loop authorization overrides and transaction permission logs for every high-risk action.', color: '#ffc700', icon: <FactCheckIcon sx={{ fontSize: 24, color: '#ffc700' }} /> },
              { title: 'Loop Breaker', subtitle: 'ANOMALY DETECTION', desc: 'Real-time recursion monitoring that automatically aborts runaway loops and excessive token usage.', color: '#ffc700', icon: <TerminalIcon sx={{ fontSize: 24, color: '#ffc700' }} /> },
              { title: 'Cost Intelligence', subtitle: 'BUDGETS & SPEND', desc: 'Attributed token consumption records, API expenses, and per-agent billing ceilings.', color: '#ffc700', icon: <AttachMoneyIcon sx={{ fontSize: 24, color: '#ffc700' }} /> },
            ].map((feat, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Card sx={{ height: '100%', border: '1px solid #161a22', bgcolor: '#0a0b0d', borderRadius: 2 }}>
                  <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <Box sx={{ 
                      width: 44, 
                      height: 44, 
                      borderRadius: 1.5, 
                      bgcolor: 'rgba(255, 199, 0, 0.1)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      border: '1px solid rgba(255, 199, 0, 0.2)'
                    }}>
                      {feat.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: '"Outfit", sans-serif', mt: 1 }}>{feat.title}</Typography>
                    <Typography variant="caption" sx={{ color: '#ffc700', fontWeight: 'bold', letterSpacing: '0.5px' }}>{feat.subtitle}</Typography>
                    <Typography variant="body2" sx={{ color: '#8f9cae', lineHeight: 1.6, fontSize: '13px' }}>{feat.desc}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Typography variant="body2" sx={{ color: '#ffc700', fontStyle: 'italic', fontWeight: 600, fontSize: '14px' }}>
              "The Central Nervous System for Enterprise AI Agents."
            </Typography>
          </Box>
        </Box>
      </Box>

      <style>{`
        .radar-ring {
          position: absolute;
          border: 1px solid rgba(255, 199, 0, 0.035);
          border-radius: 50%;
          top: 50%;
          left: 80%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        @keyframes scrollDown {
          0% { top: 8px; opacity: 1; }
          50% { top: 18px; opacity: 0.3; }
          100% { top: 8px; opacity: 1; }
        }
      `}</style>
    </Box>
  );
}

// ----------------------------------------------------
// MAIN APP COMPONENT
// ----------------------------------------------------
function App() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard'); // dashboard, registry, audit, cost, approvals
  const [dashboardTab, setDashboardTab] = useState(0); // 0: Overview, 1: Console Log, 2: AI Assistant
  const isLight = currentView !== 'dashboard'; // Sub-pages utilize clean light-theme layouts matching reference designs

  // Application State
  const [summary, setSummary] = useState({
    health_score: 100, success_rate: 100, total_spend: 0, active_alerts: 0, total_tasks: 0, pending_approvals: 0
  });
  const [agents, setAgents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [approvals, setApprovals] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [logs, setLogs] = useState([]);
  
  // Interaction State
  const [selectedTaskId, setSelectedTaskId] = useState('');
  const [taskPrompt, setTaskPrompt] = useState('Onboard employee Alice Green and verify hardware budget.');
  const [activeScenario, setActiveScenario] = useState('hr_onboard');
  const [isStreaming, setIsStreaming] = useState(false);
  const [selectedAgentCard, setSelectedAgentCard] = useState('orchestrator');
  
  // Dialog State: Register Agent
  const [agentDialogOpen, setAgentDialogOpen] = useState(false);
  const [newAgent, setNewAgent] = useState({ id: '', name: '', role: '', cost_limit: 1.0, configuration: '{}' });

  // Dialog State: Audit Trace Replay
  const [replayDialogOpen, setReplayDialogOpen] = useState(false);
  const [replayTask, setReplayTask] = useState(null);
  const [replayLogs, setReplayLogs] = useState([]);
  const [activeStep, setActiveStep] = useState(0);

  // Chat state
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: 'Hi! I am your AI Insight Assistant. Ask me anything about agent configurations, runtime history, or diagnostic failures!' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatDrawerOpen, setChatDrawerOpen] = useState(false);
  const [lineageDialogOpen, setLineageDialogOpen] = useState(false);
  
  const eventSourceRef = useRef(null);

  // Fetch initial summary metrics & collections
  const fetchData = useCallback(async () => {
    try {
      const [resSummary, resAgents, resTasks, resApprovals, resAlerts, resLogs] = await Promise.all([
        fetch(`${API_BASE}/dashboard/summary`),
        fetch(`${API_BASE}/agents`),
        fetch(`${API_BASE}/tasks`),
        fetch(`${API_BASE}/approvals`),
        fetch(`${API_BASE}/alerts`),
        fetch(`${API_BASE}/logs${selectedTaskId ? `?task_id=${selectedTaskId}` : ''}`)
      ]);
      
      if (resSummary.ok) setSummary(await resSummary.json());
      if (resAgents.ok) setAgents(await resAgents.json());
      if (resTasks.ok) setTasks(await resTasks.json());
      if (resApprovals.ok) setApprovals(await resApprovals.json());
      if (resAlerts.ok) setAlerts(await resAlerts.json());
      if (resLogs.ok && !isStreaming) {
        const logsData = await resLogs.json();
        setLogs(logsData.reverse());
      }
    } catch (err) {
      console.error('Failed to sync metrics from API server:', err);
    }
  }, [selectedTaskId, isStreaming]);

  // Setup SSE
  useEffect(() => {
    if (!showDashboard) return;

    const connectSSE = () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }

      const es = new EventSource(`${API_BASE}/events`);
      eventSourceRef.current = es;

      es.onmessage = (event) => {
        const payload = JSON.parse(event.data);
        if (payload.event === 'TASK_STARTED') {
          setIsStreaming(true);
          setSelectedTaskId(payload.data.task_id);
          setLogs([]);
          fetchData();
        } else if (payload.event === 'LOG_ADDED') {
          setLogs((prev) => [...prev, {
            id: Date.now() + Math.random(),
            task_id: payload.data.task_id,
            level: payload.data.level,
            message: payload.data.message,
            timestamp: new Date().toISOString()
          }]);
        } else if (payload.event === 'TASK_COMPLETED') {
          setIsStreaming(false);
          fetchData();
        } else if (payload.event === 'APPROVAL_REQUIRED') {
          fetchData();
        } else if (payload.event === 'ALERT_TRIGGERED') {
          fetchData();
        } else if (payload.event === 'APPROVAL_UPDATED') {
          fetchData();
        }
      };
    };

    connectSSE();
    fetchData();

    const interval = setInterval(fetchData, 4000);

    return () => {
      clearInterval(interval);
      if (eventSourceRef.current) eventSourceRef.current.close();
    };
  }, [selectedTaskId, isStreaming, fetchData, showDashboard]);

  // Handle task trigger submission
  const handleTriggerTask = async (e) => {
    e.preventDefault();
    if (!taskPrompt.trim() || isStreaming) return;
    
    try {
      const res = await fetch(`${API_BASE}/run-task`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: taskPrompt, scenario: activeScenario })
      });
      if (res.ok) {
        const data = await res.json();
        setSelectedTaskId(data.task_id);
        setLogs([{ id: 'start', message: 'Trigger request sent to Orchestrator...', level: 'INFO' }]);
      }
    } catch (err) {
      console.error('Error running task:', err);
    }
  };

  // Handle human approvals
  const handleApprovalAction = async (approvalId, action, reason) => {
    try {
      const res = await fetch(`${API_BASE}/approvals/${approvalId}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, reason })
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error('Error recording approval:', err);
    }
  };

  // AI Chatbot query
  const handleTriggerChat = (queryText) => {
    if (!queryText.trim()) return;
    
    // Add user message
    const userMsg = { sender: 'user', text: queryText };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    setChatDrawerOpen(true); // Open the AI Drawer

    setTimeout(() => {
      let reply = "I analyzed the SQLite configuration context. Everything is fully functional!";
      const queryLower = queryText.toLowerCase();
      
      if (queryLower.includes('fail') || queryLower.includes('error') || queryLower.includes('why') || queryLower.includes('anomaly')) {
        const latestFailed = tasks.find(t => t.status === 'FAILED');
        const activeAlert = latestFailed ? alerts.find(a => a.task_id === latestFailed.id) : null;
        const alertDesc = activeAlert ? activeAlert.description : "Finance Specialist agent was caught in a retry loop (5 identical operations). Halted to prevent token drain.";
        reply = `I checked the last failed tasks and the cost + log trail. Here is what happened:\n\n• Root cause: ${alertDesc}\n• Impact: Budget limit check flagged anomalies\n• Status: action paused — awaiting operator review`;
      } else if (queryLower.includes('cost') || queryLower.includes('spend') || queryLower.includes('budget') || queryLower.includes('most')) {
        reply = `The total virtual spend across all agents is $${summary.total_spend} USD. Orchestrator limit: $5.00, HR Specialist: $2.00, Finance Specialist: $3.00. DevOps Specialist: $3.50. Finance Specialist has consumed the most budget today.`;
      } else if (queryLower.includes('agent') || queryLower.includes('count')) {
        reply = `There are currently ${agents.length} agents registered in SQLite: ${agents.map(a => `${a.name} (${a.status})`).join(', ')}. All node connections are normal.`;
      } else if (queryLower.includes('approv')) {
        reply = `There are currently ${summary.pending_approvals} governance approval items pending in the queue. You can check them in the Governance approvals panel.`;
      }
      
      setChatMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
    }, 1000);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    handleTriggerChat(chatInput);
  };

  // Submit New Agent Registry
  const handleRegisterAgent = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/agents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAgent)
      });
      if (res.ok) {
        setAgentDialogOpen(false);
        setNewAgent({ id: '', name: '', role: '', cost_limit: 1.0, configuration: '{}' });
        fetchData();
      } else {
        const errorData = await res.json();
        alert(`Failed: ${errorData.detail}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Trigger Trace Replay Dialog
  const handleOpenReplay = async (task) => {
    setReplayTask(task);
    try {
      const res = await fetch(`${API_BASE}/logs?task_id=${task.id}`);
      if (res.ok) {
        const logsData = await res.json();
        setReplayLogs(logsData.reverse());
        setActiveStep(0);
        setReplayDialogOpen(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Selection handler for agent cards (matches screenshot action)
  const handleSelectAgentCard = (agentId) => {
    setSelectedAgentCard(agentId);
    if (agentId === 'hr_agent') {
      setTaskPrompt('Onboard employee Alice Green and verify hardware credentials.');
      setActiveScenario('hr_onboard');
    } else if (agentId === 'finance_agent') {
      setTaskPrompt('Allocate infrastructure hardware budget request of $4,500.');
      setActiveScenario('approval_demo');
    } else if (agentId === 'security_agent') {
      setTaskPrompt('Run loop safety analysis checks on internal ledger records.');
      setActiveScenario('loop_demo');
    } else {
      setTaskPrompt('Onboard employee Alice Green and verify hardware budget.');
      setActiveScenario('standard');
    }
  };

  // Sparkline data values
  const spendSparkData = tasks.length > 0 ? tasks.slice(0, 8).map(t => t.cost_usd * 1000) : [0.2, 0.4, 0.3, 0.6, 0.5, 0.7, 0.8];
  const alertSparkData = tasks.length > 0 ? tasks.slice(0, 8).map(t => t.errors) : [0, 0, 1, 0, 0, 2, 0];

  const selectedAgentObj = agents.find(a => a.id === selectedAgentCard) || {
    id: selectedAgentCard,
    name: selectedAgentCard === 'orchestrator' ? 'Orchestrator Agent' :
          selectedAgentCard === 'hr_agent' ? 'HR Specialist' :
          selectedAgentCard === 'finance_agent' ? 'Finance Specialist' :
          selectedAgentCard === 'security_agent' ? 'Security Auditor' : selectedAgentCard,
    role: selectedAgentCard === 'orchestrator' ? 'Task routing, agent coordination, and query plan generation.' :
          selectedAgentCard === 'hr_agent' ? 'Onboarding employees, generating checklists, and managing records.' :
          selectedAgentCard === 'finance_agent' ? 'Ledger balances, budget audits, and human-in-the-loop limits.' :
          selectedAgentCard === 'security_agent' ? 'Access verification, credentials safety, and retry loop detection.' : 'Specialist Agent',
    status: 'ACTIVE',
    total_spend: 0.0,
    cost_limit: 5.0
  };

  if (!showDashboard) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LandingPage onLaunch={() => setShowDashboard(true)} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
             {/* Left Sidebar Navigation Drawer */}
        <Box sx={{ width: 240, borderRight: '1px solid #161a22', bgcolor: '#0a0b0d', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ 
              width: 28, 
              height: 28, 
              borderRadius: '50%', 
              bgcolor: '#ffc700', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: '#0a0b0d',
              boxShadow: '0 0 10px rgba(255, 199, 0, 0.4)'
            }}>
              <AutoAwesomeIcon sx={{ fontSize: 14 }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: '"Outfit", sans-serif', letterSpacing: '-0.5px' }}>
              AXON<span style={{ color: '#ffc700' }}>.</span>
            </Typography>
          </Box>
          <Divider sx={{ borderColor: '#161a22' }} />
          <List sx={{ p: 1, flexGrow: 1 }}>
            {[
              { id: 'dashboard', text: 'Home', icon: <DashboardIcon /> },
              { id: 'registry', text: 'Agent Registry', icon: <PeopleIcon /> },
              { id: 'audit', text: 'Audit & Replay Logs', icon: <HistoryIcon /> },
              { id: 'cost', text: 'Cost Intelligence', icon: <BarChartIcon /> },
              { id: 'approvals', text: 'Governance Approvals', icon: <FactCheckIcon /> },
            ].map((item) => (
              <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton 
                  selected={currentView === item.id}
                  onClick={() => {
                    setCurrentView(item.id);
                  }}
                  sx={{ 
                    borderRadius: 2,
                    '&.Mui-selected': { bgcolor: 'rgba(255, 199, 0, 0.15)', color: 'primary.main' }
                  }}
                >
                  <ListItemIcon sx={{ color: currentView === item.id ? 'primary.main' : 'text.secondary', minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '14px', fontWeight: 500 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          
          <Box sx={{ p: 2, m: 2, borderRadius: 2, bgcolor: '#111a22', border: '1px solid #161a22' }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'block', mb: 1 }}>
              QUICK LAUNCH SCENARIO
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontSize: '10px' }}>
              Select one of the suggestion chips or write your query to trigger the AI Diagnostic Drawer.
            </Typography>
          </Box>
          
          <Box sx={{ p: 2, borderTop: '1px solid #161a22', textAlign: 'center', mt: 'auto' }}>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '10px', fontFamily: 'monospace' }}>
              RELAY Insight Engine - v1.0
            </Typography>
          </Box>
        </Box>

        {/* Right Main Panel Container - dynamic light background for sub-pages */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', bgcolor: isLight ? '#f8fafc' : '#0a0b0d', transition: 'background-color 0.2s ease' }}>
          
          {/* Header - turns white with light-grey border in sub-page views */}
          <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: isLight ? '1px solid #e0e2e5' : '1px solid #161a22', bgcolor: isLight ? '#ffffff' : 'transparent', color: isLight ? '#0a0b0d' : '#f0f2f5', transition: 'all 0.2s ease' }}>
            <Toolbar sx={{ justifyContent: 'space-between', px: '24px !important', py: 1 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: '"Outfit", sans-serif', color: isLight ? '#0a0b0d' : '#f0f2f5' }}>
                    {currentView === 'dashboard' ? 'Home' :
                     currentView === 'registry' ? 'Agent Registry' :
                     currentView === 'audit' ? 'System Audit & Trace Replay' :
                     currentView === 'cost' ? 'Cost Intelligence & Budgets' :
                     'Governance Approvals Logs'}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5, fontSize: '12px' }}>
                  {currentView === 'dashboard' && `Good morning. Your agents ran ${summary.total_tasks} tasks overnight — ${summary.pending_approvals} need your approval.`}
                  {currentView === 'registry' && 'Configure prompts, adjust token cost settings, and manage credentials.'}
                  {currentView === 'audit' && 'View full execution logs and trigger time-travel step trace replays of multi-agent jobs.'}
                  {currentView === 'cost' && 'Attribution analytics and budget limits configured per agent.'}
                  {currentView === 'approvals' && 'Governance log tracking all transaction requests approved or rejected by human operators.'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3.5 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: { xs: 'none', md: 'block' } }}>
                  {(() => {
                    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
                    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
                    const now = new Date();
                    return `${days[now.getDay()]} · ${String(now.getDate()).padStart(2, '0')} ${months[now.getMonth()]} ${now.getFullYear()} · ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} IST`;
                  })()}
                </Typography>
                <Chip icon={<AutoAwesomeIcon sx={{ color: '#00e5ff !important' }} />} label="Gemini 1.5 Flash" variant="outlined" color="primary" sx={{ border: '1px solid rgba(0, 229, 255, 0.3)', color: '#00e5ff' }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton color="inherit" sx={{ bgcolor: isLight ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)' }}>
                    <Badge badgeContent={alerts.length} color="error">
                      <NotificationsIcon sx={{ color: '#ffc700' }} />
                    </Badge>
                  </IconButton>
                  {/* TC Avatar */}
                  <Box sx={{ 
                    width: 36, 
                    height: 36, 
                    borderRadius: '50%', 
                    bgcolor: '#111a22', 
                    border: '1px solid #ffc700',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    boxShadow: '0 0 8px rgba(255, 199, 0, 0.2)'
                  }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#ffc700', fontSize: '12px' }}>TC</Typography>
                  </Box>
                </Box>
              </Box>
            </Toolbar>
          </AppBar>

          {/* Alert Banners */}
          <AlertBanner alerts={alerts} onResolve={(id) => fetch(`${API_BASE}/alerts/${id}/resolve`, { method: 'POST' }).then(fetchData)} />

          <Box sx={{ p: 4, overflowY: 'auto', flexGrow: 1 }}>
            
            {/* VIEW 1: EXECUTIVE DASHBOARD */}
            {currentView === 'dashboard' && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                
                {/* Horizontal view tabs below header */}
                <Box sx={{ borderBottom: '1px solid #161a22', mb: 1, pb: 1.5, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                  <Tabs 
                    value={dashboardTab} 
                    onChange={(e, val) => setDashboardTab(val)} 
                    textColor="inherit" 
                    indicatorColor="none"
                    sx={{ 
                      minHeight: 40,
                      '& .MuiTabs-flexContainer': { gap: 1.5 }
                    }}
                  >
                    <Tab 
                      label="Overview" 
                      sx={{ 
                        textTransform: 'none', 
                        fontWeight: 600, 
                        borderRadius: '20px', 
                        minHeight: 36, 
                        py: 0.5, 
                        px: 3,
                        bgcolor: dashboardTab === 0 ? '#ffc700' : 'rgba(255,255,255,0.03)',
                        color: dashboardTab === 0 ? '#0a0b0d !important' : '#8f9cae',
                        border: dashboardTab === 0 ? 'none' : '1px solid #161a22',
                        '&:hover': { bgcolor: dashboardTab === 0 ? '#e6b300' : 'rgba(255,255,255,0.08)' }
                      }} 
                    />
                    <Tab 
                      label="Console Logs" 
                      sx={{ 
                        textTransform: 'none', 
                        fontWeight: 600, 
                        borderRadius: '20px', 
                        minHeight: 36, 
                        py: 0.5, 
                        px: 3,
                        bgcolor: dashboardTab === 1 ? '#ffc700' : 'rgba(255,255,255,0.03)',
                        color: dashboardTab === 1 ? '#0a0b0d !important' : '#8f9cae',
                        border: dashboardTab === 1 ? 'none' : '1px solid #161a22',
                        '&:hover': { bgcolor: dashboardTab === 1 ? '#e6b300' : 'rgba(255,255,255,0.08)' }
                      }} 
                    />
                    <Tab 
                      label="AI Diagnostics" 
                      sx={{ 
                        textTransform: 'none', 
                        fontWeight: 600, 
                        borderRadius: '20px', 
                        minHeight: 36, 
                        py: 0.5, 
                        px: 3,
                        bgcolor: dashboardTab === 2 ? '#ffc700' : 'rgba(255,255,255,0.03)',
                        color: dashboardTab === 2 ? '#0a0b0d !important' : '#8f9cae',
                        border: dashboardTab === 2 ? 'none' : '1px solid #161a22',
                        '&:hover': { bgcolor: dashboardTab === 2 ? '#e6b300' : 'rgba(255,255,255,0.08)' }
                      }} 
                    />
                  </Tabs>

                  {/* AI COMMAND CONSOLE BAR */}
                  <Card sx={{ 
                    bgcolor: '#111a22', 
                    border: '1px solid rgba(255, 199, 0, 0.25)', 
                    borderRadius: 8,
                    boxShadow: '0 0 20px rgba(255, 199, 0, 0.05)'
                  }}>
                    <CardContent sx={{ py: '10px !important', px: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                      {/* Glowing yellow orb */}
                      <Box sx={{ 
                        width: 32, 
                        height: 32, 
                        borderRadius: '50%', 
                        background: 'radial-gradient(circle, #ffc700 0%, #e6b300 80%)',
                        boxShadow: '0 0 15px #ffc700',
                        flexShrink: 0
                      }} />
                      
                      {/* Input Field */}
                      <TextField 
                        fullWidth
                        variant="standard"
                        placeholder='Ask RELAY — try "why did Finance Auditor fail today?"'
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleTriggerChat(chatInput);
                          }
                        }}
                        InputProps={{ 
                          disableUnderline: true,
                          style: { color: '#f0f2f5', fontSize: '15px', fontWeight: 500 }
                        }}
                      />
                      
                      {/* Terminal/Microphone Icon */}
                      <IconButton sx={{ color: 'text.secondary' }}>
                        <TerminalIcon sx={{ fontSize: 20 }} />
                      </IconButton>
                      
                      {/* Play Button */}
                      <IconButton 
                        onClick={() => handleTriggerChat(chatInput)}
                        sx={{ 
                          bgcolor: '#ffc700', 
                          color: '#0a0b0d', 
                          width: 32, 
                          height: 32,
                          '&:hover': { bgcolor: '#e6b300' }
                        }}
                      >
                        <PlayArrowIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    </CardContent>
                  </Card>

                  {/* Suggestion Pills */}
                  <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                    {[
                      "Why did Finance Auditor fail 3 tasks?",
                      "Which agent is costing the most today?",
                      "Show pending approvals",
                      "Summarize overnight anomalies"
                    ].map((pill, idx) => (
                      <Chip 
                        key={idx}
                        label={pill}
                        onClick={() => handleTriggerChat(pill)}
                        sx={{ 
                          bgcolor: 'rgba(255, 255, 255, 0.02)', 
                          color: 'text.secondary', 
                          border: '1px solid #161a22',
                          fontSize: '12px',
                          fontWeight: 500,
                          cursor: 'pointer',
                          '&:hover': { bgcolor: 'rgba(255, 199, 0, 0.05)', color: '#ffc700', borderColor: 'rgba(255, 199, 0, 0.2)' }
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                {dashboardTab === 0 ? (
                  <Grid container spacing={3}>
                    {/* KPI Cards (4 columns) */}
                    <Grid item xs={12}>
                      <MetricCards summary={summary} />
                    </Grid>

                    {/* Workspace Run Controls Card */}
                    <Grid item xs={12}>
                      <Card sx={{ bgcolor: '#111a22', border: '1px solid #161a22', borderRadius: 2 }}>
                        <CardContent sx={{ p: '20px !important' }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 2.5 }}>
                            <Typography variant="h6" sx={{ color: '#ffc700', fontFamily: '"Outfit", sans-serif', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                              <PlayArrowIcon /> Workspace Run Controls
                            </Typography>
                            
                            {/* Horizontal shortcuts */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 'bold', mr: 1 }}>DEMO PRESETS:</Typography>
                              {[
                                { id: 'orchestrator', label: 'Orchestrator' },
                                { id: 'hr_agent', label: 'HR Agent' },
                                { id: 'finance_agent', label: 'Finance Agent' },
                                { id: 'security_agent', label: 'Security Auditor' }
                              ].map(chip => (
                                <Chip 
                                  key={chip.id}
                                  label={chip.label}
                                  onClick={() => handleSelectAgentCard(chip.id)}
                                  sx={{ 
                                    bgcolor: selectedAgentCard === chip.id ? '#ffc700' : 'rgba(255,255,255,0.03)',
                                    color: selectedAgentCard === chip.id ? '#0a0b0d' : '#8f9cae',
                                    fontWeight: 'bold',
                                    border: selectedAgentCard === chip.id ? '1px solid #ffc700' : '1px solid #161a22',
                                    '&:hover': { bgcolor: selectedAgentCard === chip.id ? '#e6b300' : 'rgba(255,255,255,0.08)' }
                                  }}
                                />
                              ))}
                            </Box>
                          </Box>

                          {/* Selected agent detail status */}
                          <Box sx={{ bgcolor: 'rgba(255,199,0,0.02)', border: '1px solid rgba(255,199,0,0.15)', borderRadius: 2, p: 2, mb: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
                              <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#ffc700' }}>
                                Selected agent: {selectedAgentObj.name}
                              </Typography>
                              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                Telemetry Cost: <strong style={{ color: '#00ff9d' }}>${selectedAgentObj.total_spend ? selectedAgentObj.total_spend.toFixed(4) : '0.0000'}</strong> / ${selectedAgentObj.cost_limit ? selectedAgentObj.cost_limit.toFixed(2) : '1.00'}
                              </Typography>
                            </Box>
                            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}>
                              <strong>Role Description:</strong> {selectedAgentObj.role}
                            </Typography>
                          </Box>

                          {/* Trigger execution form */}
                          <form onSubmit={handleTriggerTask}>
                            <Grid container spacing={2} alignItems="center">
                              <Grid item xs={12} sm={6} md={7}>
                                <TextField
                                  fullWidth
                                  size="small"
                                  label="Enter prompt/instruction..."
                                  variant="outlined"
                                  value={taskPrompt}
                                  onChange={(e) => setTaskPrompt(e.target.value)}
                                  disabled={isStreaming}
                                />
                              </Grid>
                              <Grid item xs={12} sm={3} md={3}>
                                <FormControl fullWidth size="small">
                                  <InputLabel>Scenario Mode</InputLabel>
                                  <Select
                                    value={activeScenario}
                                    label="Scenario Mode"
                                    onChange={(e) => setActiveScenario(e.target.value)}
                                    disabled={isStreaming}
                                  >
                                    <MenuItem value="hr_onboard">HR Onboarding Setup</MenuItem>
                                    <MenuItem value="approval_demo">Finance Approval Request</MenuItem>
                                    <MenuItem value="loop_demo">Retry Loop Anomaly</MenuItem>
                                    <MenuItem value="standard">Standard prompt</MenuItem>
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid item xs={12} sm={3} md={2}>
                                <Button
                                  fullWidth
                                  variant="contained"
                                  type="submit"
                                  disabled={isStreaming}
                                  color={activeScenario === 'loop_demo' ? 'error' : 'primary'}
                                  startIcon={<PlayArrowIcon />}
                                >
                                  {isStreaming ? 'Running...' : 'Run Engine'}
                                </Button>
                              </Grid>
                            </Grid>
                          </form>
                        </CardContent>
                      </Card>
                    </Grid>

                    {/* Bottom Split Layout: Live Agent Status (60%) & Live Alert Feed (40%) */}
                    <Grid item xs={12} md={7.5}>
                      <Card sx={{ height: '100%', minHeight: 450, display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ p: '20px !important', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Box>
                              <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 700, fontFamily: '"Outfit", sans-serif' }}>
                                Live Agent Status
                              </Typography>
                              <Typography variant="caption" sx={{ color: 'text.secondary' }}>Real-time telemetry and resource usage</Typography>
                            </Box>
                            <Button 
                              onClick={() => setLineageDialogOpen(true)}
                              sx={{ 
                                textTransform: 'none', 
                                color: '#ffc700', 
                                border: '1px solid rgba(255,199,0,0.3)',
                                borderRadius: '15px',
                                px: 2,
                                fontSize: '12px',
                                fontWeight: 'bold',
                                '&:hover': { bgcolor: 'rgba(255,199,0,0.05)' }
                              }}
                            >
                              View lineage map →
                            </Button>
                          </Box>

                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, flexGrow: 1, justifyContent: 'center' }}>
                            {agents.map((agent) => {
                              const spend = agent.total_spend || 0.00;
                              const limit = agent.cost_limit || 1.00;
                              const percentage = Math.min((spend / limit) * 100, 100);
                              
                              // Determine status chip properties
                              let chipLabel = 'RUNNING';
                              let chipColor = 'success';
                              if (agent.id === 'finance_agent' && tasks.some(t => t.status === 'FAILED')) {
                                chipLabel = '3 ERRORS';
                                chipColor = 'error';
                              } else if (agent.id === 'security_agent' && tasks.some(t => t.status === 'FAILED')) {
                                chipLabel = '1 ERROR';
                                chipColor = 'error';
                              } else if (agent.status === 'IDLE' || spend === 0) {
                                chipLabel = 'IDLE';
                                chipColor = 'default';
                              }

                              return (
                                <Box key={agent.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                  <Typography variant="body2" sx={{ fontWeight: 600, width: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {agent.name}
                                  </Typography>
                                  
                                  <Chip 
                                    label={chipLabel} 
                                    size="small" 
                                    color={chipColor === 'default' ? 'default' : chipColor}
                                    sx={{ 
                                      height: 20, 
                                      fontSize: '9px', 
                                      fontWeight: 'bold', 
                                      width: 75,
                                      '& .MuiChip-label': { px: 1 } 
                                    }} 
                                  />
                                  
                                  {/* Custom yellow/grey progress bar */}
                                  <Box sx={{ flexGrow: 1, height: 6, bgcolor: '#161a22', borderRadius: 3, overflow: 'hidden', mx: 1 }}>
                                    <Box sx={{ 
                                      width: `${percentage || 5}%`, 
                                      height: '100%', 
                                      bgcolor: chipColor === 'error' ? '#ff3366' : '#ffc700', 
                                      borderRadius: 3,
                                      boxShadow: chipColor === 'error' ? '0 0 5px #ff3366' : '0 0 5px #ffc700'
                                    }} />
                                  </Box>
                                  
                                  <Typography variant="body2" sx={{ fontWeight: 'bold', width: 60, textAlign: 'right', fontFamily: 'monospace' }}>
                                    ${spend.toFixed(2)}
                                  </Typography>
                                </Box>
                              );
                            })}
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>

                    {/* Right side panel - Alert feed & pending approvals badge card */}
                    <Grid item xs={12} md={4.5} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <Card sx={{ flexGrow: 1, minHeight: 320 }}>
                        <CardContent sx={{ p: '20px !important' }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Box>
                              <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 700, fontFamily: '"Outfit", sans-serif' }}>
                                Live Alert Feed
                              </Typography>
                              <Typography variant="caption" sx={{ color: 'text.secondary' }}>Anomaly detections and event logs</Typography>
                            </Box>
                            <Button 
                              onClick={() => setCurrentView('audit')}
                              sx={{ 
                                textTransform: 'none', 
                                color: '#ffc700', 
                                border: '1px solid rgba(255,199,0,0.3)',
                                borderRadius: '15px',
                                px: 2,
                                fontSize: '12px',
                                fontWeight: 'bold',
                                '&:hover': { bgcolor: 'rgba(255,199,0,0.05)' }
                              }}
                            >
                              View all →
                            </Button>
                          </Box>

                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                            {alerts.length > 0 ? (
                              alerts.slice(0, 4).map((alert) => (
                                <Box key={alert.id} sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: alert.level === 'CRITICAL' ? '#ff3366' : '#ffaa00', mt: 0.7, flexShrink: 0 }} />
                                  <Box>
                                    <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500, fontSize: '13px', lineHeight: 1.4 }}>
                                      {alert.agent_id ? `${alert.agent_id}: ` : ''}{alert.description}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '10px' }}>
                                      {new Date(alert.timestamp).toLocaleTimeString()}
                                    </Typography>
                                  </Box>
                                </Box>
                              ))
                            ) : (
                              /* Clean mockup matching values if database is empty */
                              <>
                                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ff3366', mt: 0.7, flexShrink: 0 }} />
                                  <Box>
                                    <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500, fontSize: '13px', lineHeight: 1.4 }}>
                                      Finance Auditor Agent — 3 consecutive task failures detected.
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '10px' }}>
                                      2 MIN AGO
                                    </Typography>
                                  </Box>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ffaa00', mt: 0.7, flexShrink: 0 }} />
                                  <Box>
                                    <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500, fontSize: '13px', lineHeight: 1.4 }}>
                                      Cost Agent flagged Finance Auditor for 18% budget overrun.
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '10px' }}>
                                      6 MIN AGO
                                    </Typography>
                                  </Box>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ffc700', mt: 0.7, flexShrink: 0 }} />
                                  <Box>
                                    <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500, fontSize: '13px', lineHeight: 1.4 }}>
                                      RELAY generated an incident summary for review.
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '10px' }}>
                                      14 MIN AGO
                                    </Typography>
                                  </Box>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#00ff9d', mt: 0.7, flexShrink: 0 }} />
                                  <Box>
                                    <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500, fontSize: '13px', lineHeight: 1.4 }}>
                                      DB Writer Agent completed nightly sync — 0 errors.
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '10px' }}>
                                      41 MIN AGO
                                    </Typography>
                                  </Box>
                                </Box>
                              </>
                            )}
                          </Box>
                        </CardContent>
                      </Card>

                      {/* Pending Approvals Quick-Link Card */}
                      <Card 
                        onClick={() => setCurrentView('approvals')}
                        sx={{ 
                          bgcolor: '#111a22', 
                          border: '1px solid #161a22', 
                          borderRadius: 2,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          '&:hover': { bgcolor: 'rgba(255, 199, 0, 0.03)', borderColor: '#ffc700' }
                        }}
                      >
                        <CardContent sx={{ p: '15px 20px !important', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 800, color: '#f0f2f5', fontSize: '13px' }}>
                              Pending Approvals
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                              High-risk DB actions awaiting sign-off
                            </Typography>
                          </Box>
                          <Badge 
                            badgeContent={summary.pending_approvals || 3} 
                            color="error" 
                            sx={{ 
                              '& .MuiBadge-badge': { 
                                fontSize: '11px', 
                                fontWeight: 'bold', 
                                minWidth: 22, 
                                height: 22, 
                                borderRadius: '50%' 
                              } 
                            }} 
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                ) : null}

                {/* Sub Tab: Logs */}
                {dashboardTab === 1 ? (
                  <Card sx={{ height: 600, display: 'flex', flexDirection: 'column' }}>
                    <LogViewer logs={logs} isStreaming={isStreaming} />
                  </Card>
                ) : null}

                {/* Sub Tab: AI Assistant */}
                {dashboardTab === 2 ? (
                  <Card sx={{ height: 600, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 3 }}>
                      <Typography variant="h6" sx={{ color: '#ffc700', mb: 2, fontFamily: '"Outfit", sans-serif', fontWeight: 700 }}>AI Diagnostic Assistant</Typography>
                      <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2, display: 'flex', flexDirection: 'column', gap: 1.5, pr: 1 }}>
                        {chatMessages.map((m, idx) => (
                          <Box key={idx} sx={{ 
                            alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                            bgcolor: m.sender === 'user' ? 'primary.main' : '#161a22',
                            color: m.sender === 'user' ? '#0a0b0d' : 'text.primary',
                            p: 2, borderRadius: 2, maxWidth: '80%',
                            border: m.sender === 'ai' ? '1px solid #161a22' : 'none',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                          }}>
                            <Typography variant="body2">{m.text}</Typography>
                          </Box>
                        ))}
                      </Box>
                      <Divider sx={{ mb: 2 }} />
                      <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: 12 }}>
                        <TextField fullWidth size="medium" placeholder="Ask a diagnostic query (e.g. 'why did the last task fail?')..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} />
                        <Button type="submit" variant="contained" color="primary" sx={{ px: 4 }}>Send</Button>
                      </form>
                    </Box>
                  </Card>
                ) : null}
              </Box>
            )}

            {/* VIEW 2: AGENT REGISTRY (LIGHT THEMED) */}
            {currentView === 'registry' && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body1" sx={{ color: isLight ? '#536275' : 'text.secondary' }}>
                    Configure prompts, adjust token cost settings, and manage credentials.
                  </Typography>
                  <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAgentDialogOpen(true)}>
                    Register Agent
                  </Button>
                </Box>
                <TableContainer component={Paper} variant="outlined" sx={{ bgcolor: isLight ? '#ffffff' : '#111a22', borderColor: isLight ? '#e0e2e5' : '#161a22', boxShadow: isLight ? '0 4px 12px rgba(0,0,0,0.03)' : 'none' }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ borderColor: isLight ? '#e0e2e5' : '#161a22' }}>
                        <TableCell sx={{ fontWeight: 'bold', color: isLight ? '#0a0b0d' : '#8f9cae', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>Agent ID</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: isLight ? '#0a0b0d' : '#8f9cae', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>Agent Name</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: isLight ? '#0a0b0d' : '#8f9cae', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>Role / Purpose</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: isLight ? '#0a0b0d' : '#8f9cae', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>Cost Ceiling (USD)</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: isLight ? '#0a0b0d' : '#8f9cae', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>Total Spend</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: isLight ? '#0a0b0d' : '#8f9cae', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>Runs Counter</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: isLight ? '#0a0b0d' : '#8f9cae', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {agents.map((agent) => (
                        <TableRow key={agent.id} sx={{ borderColor: isLight ? '#e0e2e5' : '#161a22' }}>
                          <TableCell sx={{ fontWeight: 'bold', color: isLight ? '#ca8a04' : 'primary.main', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>{agent.id}</TableCell>
                          <TableCell sx={{ color: isLight ? '#0a0b0d' : '#f0f2f5', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>{agent.name}</TableCell>
                          <TableCell sx={{ color: isLight ? '#475569' : 'text.secondary', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>{agent.role}</TableCell>
                          <TableCell sx={{ color: isLight ? '#0a0b0d' : '#f0f2f5', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>${agent.cost_limit.toFixed(2)}</TableCell>
                          <TableCell sx={{ color: isLight ? '#ca8a04' : '#ffc700', fontWeight: 600, borderColor: isLight ? '#e0e2e5' : '#161a22' }}>${agent.total_spend.toFixed(4)}</TableCell>
                          <TableCell sx={{ color: isLight ? '#0a0b0d' : '#f0f2f5', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>{agent.task_count}</TableCell>
                          <TableCell sx={{ borderColor: isLight ? '#e0e2e5' : '#161a22' }}>
                            <Chip 
                              label={agent.status} 
                              color={agent.status === 'ACTIVE' ? 'success' : agent.status === 'SUSPENDED' ? 'error' : 'default'} 
                              size="small" 
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}

            {/* VIEW 3: AUDIT & REPLAY (LIGHT THEMED) */}
            {currentView === 'audit' && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Typography variant="body1" sx={{ color: isLight ? '#536275' : 'text.secondary' }}>
                  View full execution logs and trigger time-travel step trace replays of multi-agent jobs.
                </Typography>
                <TableContainer component={Paper} variant="outlined" sx={{ bgcolor: isLight ? '#ffffff' : '#111a22', borderColor: isLight ? '#e0e2e5' : '#161a22', boxShadow: isLight ? '0 4px 12px rgba(0,0,0,0.03)' : 'none' }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ borderColor: isLight ? '#e0e2e5' : '#161a22' }}>
                        <TableCell sx={{ fontWeight: 'bold', color: isLight ? '#0a0b0d' : '#8f9cae', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>Task ID</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: isLight ? '#0a0b0d' : '#8f9cae', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>Instructions Prompt</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: isLight ? '#0a0b0d' : '#8f9cae', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: isLight ? '#0a0b0d' : '#8f9cae', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>Session Spend</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: isLight ? '#0a0b0d' : '#8f9cae', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>Warnings</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: isLight ? '#0a0b0d' : '#8f9cae', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>Errors</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: isLight ? '#0a0b0d' : '#8f9cae', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>Timestamp</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: isLight ? '#0a0b0d' : '#8f9cae', borderColor: isLight ? '#e0e2e5' : '#161a22', textAlign: 'center' }}>Trace</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tasks.map((task) => (
                        <TableRow key={task.id} sx={{ borderColor: isLight ? '#e0e2e5' : '#161a22' }}>
                          <TableCell sx={{ fontFamily: 'monospace', color: isLight ? '#0a0b0d' : '#f0f2f5', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>{task.id.substring(0, 8)}...</TableCell>
                          <TableCell sx={{ color: isLight ? '#0a0b0d' : '#f0f2f5', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>{task.description}</TableCell>
                          <TableCell sx={{ borderColor: isLight ? '#e0e2e5' : '#161a22' }}>
                            <Chip 
                              label={task.status} 
                              color={task.status === 'SUCCESS' ? 'success' : task.status === 'FAILED' ? 'error' : 'warning'} 
                              size="small" 
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell sx={{ color: isLight ? '#00aa55' : '#00ff9d', fontWeight: 500, borderColor: isLight ? '#e0e2e5' : '#161a22' }}>${task.cost_usd.toFixed(4)}</TableCell>
                          <TableCell sx={{ color: isLight ? '#0a0b0d' : '#f0f2f5', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>{task.warnings}</TableCell>
                          <TableCell sx={{ color: task.errors > 0 ? '#ff3366' : (isLight ? '#0a0b0d' : 'inherit'), fontWeight: task.errors > 0 ? 'bold' : 'normal', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>{task.errors}</TableCell>
                          <TableCell sx={{ color: isLight ? '#475569' : 'text.secondary', fontSize: '12px', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>{new Date(task.created_at).toLocaleString()}</TableCell>
                          <TableCell sx={{ textAlign: 'center', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>
                            <Button 
                              size="small" 
                              variant="outlined" 
                              startIcon={<ReplayIcon />}
                              onClick={() => handleOpenReplay(task)}
                              sx={{ 
                                color: isLight ? '#ca8a04' : '#ffc700', 
                                borderColor: isLight ? 'rgba(202, 138, 4, 0.5)' : 'rgba(255, 199, 0, 0.4)',
                                '&:hover': {
                                  borderColor: isLight ? '#ca8a04' : '#ffc700',
                                  bgcolor: isLight ? 'rgba(202, 138, 4, 0.04)' : 'rgba(255, 199, 0, 0.04)'
                                }
                              }}
                            >
                              Replay Trace
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}

            {/* VIEW 4: COST INTELLIGENCE (LIGHT THEMED) */}
            {currentView === 'cost' && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="body1" sx={{ color: isLight ? '#536275' : 'text.secondary', mb: 2 }}>
                    Attribution analytics and budget limits configured per agent.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Card sx={{ p: 2, bgcolor: isLight ? '#ffffff' : '#111a22', borderColor: isLight ? '#e0e2e5' : '#161a22', color: isLight ? '#0a0b0d' : '#f0f2f5' }}>
                    <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 700 }}>Historical Tasks Token Spend</Typography>
                    <CostCharts tasks={tasks} lightTheme={isLight} />
                  </Card>
                </Grid>
                <Grid item xs={12} md={5}>
                  <Card sx={{ p: 2, height: '100%', bgcolor: isLight ? '#ffffff' : '#111a22', borderColor: isLight ? '#e0e2e5' : '#161a22', color: isLight ? '#0a0b0d' : '#f0f2f5' }}>
                    <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 700 }}>Agent Budgets & Consumption</Typography>
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ borderColor: isLight ? '#e0e2e5' : '#161a22' }}>
                          <TableCell sx={{ fontWeight: 'bold', color: isLight ? '#0a0b0d' : '#8f9cae', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>Agent</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', color: isLight ? '#0a0b0d' : '#8f9cae', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>Limit</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', color: isLight ? '#0a0b0d' : '#8f9cae', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>Consumed</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {agents.map((a) => (
                          <TableRow key={a.id} sx={{ borderColor: isLight ? '#e0e2e5' : '#161a22' }}>
                            <TableCell sx={{ color: isLight ? '#0a0b0d' : '#f0f2f5', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>{a.name}</TableCell>
                            <TableCell sx={{ color: isLight ? '#0a0b0d' : '#f0f2f5', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>${a.cost_limit.toFixed(2)}</TableCell>
                            <TableCell sx={{ color: a.total_spend >= a.cost_limit ? '#ff3366' : (isLight ? '#00aa55' : '#00ff9d'), fontWeight: 600, borderColor: isLight ? '#e0e2e5' : '#161a22' }}>
                              ${a.total_spend.toFixed(4)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Card>
                </Grid>
              </Grid>
            )}

            {/* VIEW 5: APPROVALS (LIGHT THEMED) */}
            {currentView === 'approvals' && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Typography variant="body1" sx={{ color: isLight ? '#536275' : 'text.secondary' }}>
                  Governance log tracking all transaction requests approved or rejected by human operators.
                </Typography>
                <TableContainer component={Paper} variant="outlined" sx={{ bgcolor: isLight ? '#ffffff' : '#111a22', borderColor: isLight ? '#e0e2e5' : '#161a22', boxShadow: isLight ? '0 4px 12px rgba(0,0,0,0.03)' : 'none' }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ borderColor: isLight ? '#e0e2e5' : '#161a22' }}>
                        <TableCell sx={{ fontWeight: 'bold', color: isLight ? '#0a0b0d' : '#8f9cae', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>Task Description</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: isLight ? '#0a0b0d' : '#8f9cae', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>Action Requested</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: isLight ? '#0a0b0d' : '#8f9cae', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>Reviewer</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: isLight ? '#0a0b0d' : '#8f9cae', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>Feedback Comment</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: isLight ? '#0a0b0d' : '#8f9cae', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tasks.filter(t => t.status === 'SUCCESS' || t.status === 'FAILED').map((t) => {
                        return (
                          <TableRow key={t.id} sx={{ borderColor: isLight ? '#e0e2e5' : '#161a22' }}>
                            <TableCell sx={{ color: isLight ? '#0a0b0d' : '#f0f2f5', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>{t.description}</TableCell>
                            <TableCell sx={{ fontWeight: 500, color: isLight ? '#0a0b0d' : '#f0f2f5', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>Budget Request</TableCell>
                            <TableCell sx={{ color: isLight ? '#0a0b0d' : '#f0f2f5', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>Human Manager</TableCell>
                            <TableCell sx={{ fontStyle: 'italic', color: isLight ? '#536275' : 'text.secondary', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>
                              {t.status === 'SUCCESS' ? 'Approved under AWS allowance.' : 'Rejected due to limits.'}
                            </TableCell>
                            <TableCell sx={{ borderColor: isLight ? '#e0e2e5' : '#161a22' }}>
                              <Chip 
                                label={t.status === 'SUCCESS' ? 'APPROVED' : 'REJECTED'} 
                                color={t.status === 'SUCCESS' ? 'success' : 'error'} 
                                size="small" 
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}

          </Box>
        </Box>

        {/* DIALOG: REGISTER NEW AGENT (LIGHT/DARK THEMED) */}
        <Dialog open={agentDialogOpen} onClose={() => setAgentDialogOpen(false)} PaperProps={{ sx: { bgcolor: isLight ? '#ffffff' : '#111a22', border: isLight ? '1px solid #e0e2e5' : '1px solid #161a22', color: isLight ? '#0a0b0d' : '#f0f2f5', minWidth: 400 } }}>
          <DialogTitle sx={{ fontFamily: '"Outfit", sans-serif', color: 'primary.light' }}>Register Enterprise AI Agent</DialogTitle>
          <form onSubmit={handleRegisterAgent}>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField 
                required 
                fullWidth 
                size="small" 
                label="Agent ID (lowercase, e.g. security_agent)" 
                value={newAgent.id} 
                onChange={(e) => setNewAgent({...newAgent, id: e.target.value})} 
                InputLabelProps={{ style: { color: isLight ? '#536275' : '#8f9cae' } }}
                inputProps={{ style: { color: isLight ? '#0a0b0d' : '#f0f2f5' } }}
              />
              <TextField 
                required 
                fullWidth 
                size="small" 
                label="Agent Name" 
                value={newAgent.name} 
                onChange={(e) => setNewAgent({...newAgent, name: e.target.value})} 
                InputLabelProps={{ style: { color: isLight ? '#536275' : '#8f9cae' } }}
                inputProps={{ style: { color: isLight ? '#0a0b0d' : '#f0f2f5' } }}
              />
              <TextField 
                required 
                fullWidth 
                size="small" 
                label="Agent Role / Intent" 
                value={newAgent.role} 
                onChange={(e) => setNewAgent({...newAgent, role: e.target.value})} 
                InputLabelProps={{ style: { color: isLight ? '#536275' : '#8f9cae' } }}
                inputProps={{ style: { color: isLight ? '#0a0b0d' : '#f0f2f5' } }}
              />
              <TextField 
                required 
                fullWidth 
                type="number" 
                size="small" 
                label="Spend Limit Ceiling (USD)" 
                value={newAgent.cost_limit} 
                onChange={(e) => setNewAgent({...newAgent, cost_limit: parseFloat(e.target.value)})} 
                InputLabelProps={{ style: { color: isLight ? '#536275' : '#8f9cae' } }}
                inputProps={{ style: { color: isLight ? '#0a0b0d' : '#f0f2f5' } }}
              />
              <TextField 
                fullWidth 
                multiline 
                rows={3} 
                size="small" 
                label="Parameters Config (JSON)" 
                value={newAgent.configuration} 
                onChange={(e) => setNewAgent({...newAgent, configuration: e.target.value})} 
                InputLabelProps={{ style: { color: isLight ? '#536275' : '#8f9cae' } }}
                inputProps={{ style: { color: isLight ? '#0a0b0d' : '#f0f2f5' } }}
              />
            </DialogContent>
            <DialogActions sx={{ p: 2.5, borderTop: isLight ? '1px solid #e0e2e5' : '1px solid #161a22' }}>
              <Button onClick={() => setAgentDialogOpen(false)} variant="outlined" color="inherit">Cancel</Button>
              <Button type="submit" variant="contained">Register Agent</Button>
            </DialogActions>
          </form>
        </Dialog>

        {/* DIALOG: TIMELINE AUDIT REPLAY TRACE (LIGHT/DARK THEMED) */}
        <Dialog open={replayDialogOpen} onClose={() => setReplayDialogOpen(false)} PaperProps={{ sx: { bgcolor: isLight ? '#ffffff' : '#111a22', border: isLight ? '1px solid #e0e2e5' : '1px solid #161a22', color: isLight ? '#0a0b0d' : '#f0f2f5', minWidth: 500 } }}>
          <DialogTitle sx={{ fontFamily: '"Outfit", sans-serif', borderBottom: isLight ? '1px solid #e0e2e5' : '1px solid #161a22', pb: 2 }}>
            Trace Replay: {replayTask?.description?.substring(0, 45) || ''}...
          </DialogTitle>
          <DialogContent sx={{ mt: 3 }}>
            {replayLogs.length === 0 ? (
              <Typography>No log trace recorded for this task.</Typography>
            ) : (
              <Box>
                <Stepper activeStep={activeStep} orientation="vertical">
                  {replayLogs.map((log, index) => (
                    <Step key={index}>
                      <StepLabel 
                        error={log.level === 'ERROR'}
                        optional={<Typography variant="caption" sx={{ color: isLight ? '#536275' : 'text.secondary' }}>[{new Date(log.timestamp).toLocaleTimeString()}]</Typography>}
                      >
                        <span style={{ 
                          color: log.level === 'ERROR' ? '#ff3366' : log.level === 'WARNING' ? '#ffaa00' : (isLight ? '#0a0b0d' : '#f0f2f5'),
                          fontWeight: 500 
                        }}>
                          {log.message}
                        </span>
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
                
                <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
                  <Button 
                    disabled={activeStep === 0} 
                    onClick={() => setActiveStep(prev => prev - 1)}
                    variant="outlined"
                    size="small"
                  >
                    Previous Step
                  </Button>
                  <Button 
                    disabled={activeStep === replayLogs.length - 1} 
                    onClick={() => setActiveStep(prev => prev + 1)}
                    variant="contained"
                    size="small"
                  >
                    Next Step
                  </Button>
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 2, borderTop: isLight ? '1px solid #e0e2e5' : '1px solid #161a22' }}>
            <Button onClick={() => setReplayDialogOpen(false)} variant="outlined" color="inherit">Close Trace</Button>
          </DialogActions>
        </Dialog>

        {/* DIALOG: LINEAGE GRAPH MODAL (DARK THEMED ALWAYS FOR CYBER AESTHETIC) */}
        <Dialog 
          open={lineageDialogOpen} 
          onClose={() => setLineageDialogOpen(false)} 
          fullWidth
          maxWidth="lg"
          PaperProps={{ sx: { bgcolor: '#0a0b0d', border: '1px solid rgba(255, 199, 0, 0.25)', minHeight: 600, display: 'flex', flexDirection: 'column' } }}
        >
          <DialogTitle sx={{ fontFamily: '"Outfit", sans-serif', color: '#ffc700', borderBottom: '1px solid #161a22', pb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>Agent Call Lineage Graph</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>Real-time DAG of communication and dependencies</Typography>
            </Box>
            <Button onClick={() => setLineageDialogOpen(false)} sx={{ color: '#ffc700' }}>Close</Button>
          </DialogTitle>
          <DialogContent sx={{ flexGrow: 1, p: 0, position: 'relative', height: 500 }}>
            <LineageGraph agents={agents} isStreaming={isStreaming} activeScenario={activeScenario} />
          </DialogContent>
          <DialogActions sx={{ p: 2, borderTop: '1px solid #161a22' }}>
            <Button onClick={() => setLineageDialogOpen(false)} variant="contained" color="primary">Close Map</Button>
          </DialogActions>
        </Dialog>

        {/* SIDE DRAWER: AI DIAGNOSTICS & ROOT-CAUSE ASSISTANT */}
        <Drawer
          anchor="right"
          open={chatDrawerOpen}
          onClose={() => setChatDrawerOpen(false)}
          PaperProps={{
            sx: {
              width: { xs: '100%', sm: 400 },
              bgcolor: '#111a22',
              borderLeft: '1px solid rgba(255,199,0,0.25)',
              display: 'flex',
              flexDirection: 'column',
              color: '#f0f2f5'
            }
          }}
        >
          {/* Header */}
          <Box sx={{ p: 3, borderBottom: '1px solid #161a22', display: 'flex', alignItems: 'center', justifycontent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ 
                width: 32, 
                height: 32, 
                borderRadius: '50%', 
                background: 'radial-gradient(circle, #ffc700 0%, #e6b300 80%)',
                boxShadow: '0 0 10px #ffc700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <AutoAwesomeIcon sx={{ fontSize: 16, color: '#0a0b0d' }} />
              </Box>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 800, color: '#ffc700', fontFamily: '"Outfit", sans-serif' }}>RELAY</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontSize: '10px' }}>Agent Insight & Root-Cause Assistant</Typography>
              </Box>
            </Box>
            <Button onClick={() => setChatDrawerOpen(false)} sx={{ color: '#ffc700', minWidth: 0, p: 0.5 }}>Close</Button>
          </Box>

          {/* Chat message stream */}
          <Box sx={{ flexGrow: 1, p: 3, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {chatMessages.map((msg, index) => {
              const isAi = msg.sender === 'ai';
              return (
                <Box key={index} sx={{ display: 'flex', gap: 1.5, alignSelf: isAi ? 'flex-start' : 'flex-end', maxWidth: '85%' }}>
                  {isAi && (
                    <Box sx={{ 
                      width: 24, 
                      height: 24, 
                      borderRadius: '50%', 
                      bgcolor: '#ffc700',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <AutoAwesomeIcon sx={{ fontSize: 12, color: '#0a0b0d' }} />
                    </Box>
                  )}
                  <Box sx={{ 
                    p: 2, 
                    borderRadius: 2, 
                    bgcolor: isAi ? 'rgba(255, 199, 0, 0.05)' : 'rgba(255,255,255,0.03)',
                    border: isAi ? '1px solid rgba(255,199,0,0.15)' : '1px solid #161a22',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                  }}>
                    <Typography variant="body2" sx={{ color: '#f0f2f5', whiteSpace: 'pre-wrap', lineHeight: 1.5, fontSize: '13px' }}>
                      {msg.text}
                    </Typography>
                    {isAi && msg.text.includes('approval') && (
                      <Button 
                        size="small" 
                        variant="contained" 
                        color="primary"
                        onClick={() => {
                          setChatDrawerOpen(false);
                          setCurrentView('approvals');
                        }}
                        sx={{ mt: 1.5, textTransform: 'none', fontWeight: 'bold', fontSize: '11px' }}
                      >
                        Review pending approval →
                      </Button>
                    )}
                  </Box>
                </Box>
              );
            })}
          </Box>

          {/* Footer input */}
          <Box sx={{ p: 2, borderTop: '1px solid #161a22', bgcolor: '#0a0b0d' }}>
            <form onSubmit={handleSendMessage}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: '#111a22', border: '1px solid #161a22', borderRadius: 2, p: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  variant="standard"
                  placeholder="Ask a follow-up..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  InputProps={{ disableUnderline: true, style: { color: '#f0f2f5', fontSize: '13px', px: 1 } }}
                />
                <IconButton type="submit" size="small" sx={{ bgcolor: '#ffc700', color: '#0a0b0d', '&:hover': { bgcolor: '#e6b300' } }}>
                  <PlayArrowIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Box>
            </form>
          </Box>
        </Drawer>

      </Box>
    </ThemeProvider>
  );
}

export default App;
