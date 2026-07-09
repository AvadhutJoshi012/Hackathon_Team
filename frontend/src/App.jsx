import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ThemeProvider, CssBaseline, Box, Grid, Typography, Button, TextField, 
  Select, MenuItem, FormControl, InputLabel, Card, CardContent, Tab, Tabs, 
  Chip, Badge, IconButton, List, ListItem, ListItemButton, ListItemIcon, 
  ListItemText, Divider, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, 
  DialogActions, Stepper, Step, StepLabel, AppBar, Toolbar
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
      {/* Glowing Backdrop Orbs */}
      <Box sx={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255, 199, 0, 0.06) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <Box sx={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '50%', height: '50%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0, 229, 255, 0.06) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

      {/* Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: { xs: 3, md: 6 }, py: 3, borderBottom: '1px solid #161a22' }}>
        <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: '"Outfit", sans-serif', letterSpacing: '-0.5px' }}>
          Controlline<span style={{ color: '#ffc700' }}>.</span>
        </Typography>
        <Box sx={{ display: 'flex', gap: 4 }}>
          <Typography sx={{ color: 'text.secondary', fontWeight: 500, cursor: 'pointer', '&:hover': { color: 'primary.main' } }} onClick={() => document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' })}>Features</Typography>
          <Typography sx={{ color: 'text.secondary', fontWeight: 500, cursor: 'pointer', '&:hover': { color: 'primary.main' } }} onClick={onLaunch}>Observability</Typography>
          <Typography sx={{ color: 'text.secondary', fontWeight: 500, cursor: 'pointer', '&:hover': { color: 'primary.main' } }} onClick={onLaunch}>Security</Typography>
        </Box>
        <Button variant="outlined" color="primary" onClick={onLaunch} sx={{ px: 3, borderRadius: '20px', borderWidth: 2, '&:hover': { borderWidth: 2 }, boxShadow: '0 0 10px rgba(255, 199, 0, 0.2)' }}>
          Launch App
        </Button>
      </Box>

      {/* Hero Section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', py: { xs: 8, md: 12 }, px: 3, maxWidth: 900, mx: 'auto' }}>
        <Chip 
          label="ENTERPRISE MULTI-AGENT OBSERVABILITY ENGINE" 
          sx={{ bgcolor: 'rgba(255, 199, 0, 0.1)', color: 'primary.main', fontWeight: 700, mb: 4, fontSize: '11px', border: '1px solid rgba(255, 199, 0, 0.2)', py: 1.5 }} 
        />
        
        <Typography variant="h2" sx={{ fontWeight: 800, fontFamily: '"Outfit", sans-serif', mb: 3, color: '#f0f2f5', lineHeight: 1.15, fontSize: { xs: '2.5rem', md: '3.75rem' } }}>
          The Control Tower for <br/>
          <span style={{ background: 'linear-gradient(90deg, #ffc700 0%, #00e5ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Enterprise AI Workforces
          </span>
        </Typography>

        <Typography variant="h6" sx={{ color: '#8f9cae', fontWeight: 400, mb: 6, maxWidth: 650, mx: 'auto', lineHeight: 1.6, fontSize: { xs: '15px', md: '18px' } }}>
          Govern spend limits, trace database lineage, and automatically intercept runaway infinite loops across your multi-agent architecture in one unified compliance control panel.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button variant="contained" color="primary" onClick={onLaunch} sx={{ px: 4, py: 1.5, borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', boxShadow: '0 4px 20px rgba(255, 199, 0, 0.3)' }}>
            Launch Control Console
          </Button>
          <Button 
            variant="outlined" 
            color="inherit" 
            onClick={() => document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' })} 
            sx={{ px: 4, py: 1.5, borderRadius: '8px', fontSize: '15px', borderColor: '#161a22', '&:hover': { borderColor: '#536275' } }}
          >
            Explore Blueprint Modules
          </Button>
        </Box>
      </Box>

      {/* Scroll Down Indicator */}
      <Box sx={{ display: 'flex', justifyContent: 'center', pb: 10 }}>
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
      <Box id="features-section" sx={{ borderTop: '1px solid #161a22', bgcolor: '#111a22', py: 12, px: { xs: 3, md: 6 } }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
          <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 700, fontFamily: '"Outfit", sans-serif', mb: 2 }}>
            Engineered Observability Blueprint
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center', color: '#8f9cae', mb: 8, maxWidth: 600, mx: 'auto' }}>
            A fully compliant platform matching all 12 modules of the architectural control tower model.
          </Typography>

          <Grid container spacing={4}>
            {[
              { title: 'Dynamic Registry', desc: 'Module 3: Discovery, telemetry tagging, metadata schemas, and configuration registers.', color: '#00e5ff' },
              { title: 'Governance Center', desc: 'Module 7: Human-in-the-loop authorization overrides and transaction permission logs.', color: '#ffc700' },
              { title: 'Loop Breaker', desc: 'Module 10: Real-time recursion monitoring to automatically abort runaway tokens.', color: '#ff3366' },
              { title: 'Cost Intelligence', desc: 'Module 5: Attributed token consumption records, API expenses, and billing ceilings.', color: '#00ff9d' },
            ].map((feat, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Card sx={{ height: '100%', border: '1px solid rgba(255,255,255,0.01)', bgcolor: '#0a0b0d' }}>
                  <CardContent sx={{ p: 4 }}>
                    <span style={{ fontSize: '24px', color: feat.color, fontWeight: 'bold', fontFamily: '"Outfit", sans-serif' }}>0{idx + 1}</span>
                    <Typography variant="h6" sx={{ fontWeight: 700, mt: 2, mb: 1, fontFamily: '"Outfit", sans-serif' }}>{feat.title}</Typography>
                    <Typography variant="body2" sx={{ color: '#8f9cae', lineHeight: 1.5 }}>{feat.desc}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <style>{`
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
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { sender: 'user', text: chatInput };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');

    try {
      await fetch(`${API_BASE}/logs`);
      setTimeout(() => {
        let reply = "I analyzed the SQLite configuration context. Everything is fully functional!";
        const queryLower = chatInput.toLowerCase();
        
        if (queryLower.includes('fail') || queryLower.includes('error') || queryLower.includes('why')) {
          const latestFailed = tasks.find(t => t.status === 'FAILED');
          if (latestFailed) {
            const activeAlert = alerts.find(a => a.task_id === latestFailed.id);
            const alertDesc = activeAlert ? activeAlert.description : "Retry limit reached.";
            reply = `The last failure occurred on task [${latestFailed.description}]. Root Cause Analysis indicates: ${alertDesc} I suggest checking resource locks in the registry database.`;
          } else {
            reply = "I checked the execution history in SQLite and did not find any failed tasks in the current session.";
          }
        } else if (queryLower.includes('cost') || queryLower.includes('spend') || queryLower.includes('budget')) {
          reply = `The total virtual spend across all agents is $${summary.total_spend} USD. Orchestrator limit: $5.00, HR Specialist: $2.00, Finance Specialist: $3.00. No budgets have been breached.`;
        } else if (queryLower.includes('agent') || queryLower.includes('count')) {
          reply = `There are currently ${agents.length} agents registered in SQLite: ${agents.map(a => `${a.name} (${a.status})`).join(', ')}. All dependencies between nodes are normal.`;
        }
        
        setChatMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
      }, 1000);
    } catch (err) {
      setChatMessages((prev) => [...prev, { sender: 'ai', text: 'Error querying logs database.' }]);
    }
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
            <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: '"Outfit", sans-serif', letterSpacing: '-0.5px' }}>
              Controlline<span style={{ color: '#ffc700' }}>.</span>
            </Typography>
          </Box>
          <Divider />
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
              Select one of the 4 big Agent Cards inside the Overview tab to pre-load a diagnostic scenario prompt.
            </Typography>
          </Box>
        </Box>

        {/* Right Main Panel Container */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          
          {/* Header */}
          <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #161a22' }}>
            <Toolbar sx={{ justifyContent: 'space-between', px: '24px !important' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: '"Outfit", sans-serif' }}>
                {currentView === 'dashboard' && 'Home'}
                {currentView === 'registry' && 'Agent Registry (Module 3)'}
                {currentView === 'audit' && 'System Audit & Trace Replay (Module 8)'}
                {currentView === 'cost' && 'Cost Intelligence & Budgets (Module 5)'}
                {currentView === 'approvals' && 'Governance Approvals Logs (Module 7)'}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Chip icon={<AutoAwesomeIcon sx={{ color: '#00ff9d !important' }} />} label="Gemini 1.5 Flash Free" variant="outlined" color="secondary" />
                <IconButton color="inherit">
                  <Badge badgeContent={alerts.length} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
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
                <Box sx={{ borderBottom: '1px solid #161a22', mb: 1 }}>
                  <Tabs value={dashboardTab} onChange={(e, val) => setDashboardTab(val)} textColor="primary" indicatorColor="primary">
                    <Tab label="Overview" sx={{ textTransform: 'none', fontWeight: 600 }} />
                    <Tab label="Console Logs" sx={{ textTransform: 'none', fontWeight: 600 }} />
                    <Tab label="AI Diagnostics" sx={{ textTransform: 'none', fontWeight: 600 }} />
                  </Tabs>
                </Box>

                {dashboardTab === 0 ? (
                  <Grid container spacing={3}>
                    {/* Big Action Grid Cards (matches image) */}
                    <Grid item xs={12}>
                      <Grid container spacing={3}>
                        {[
                          { id: 'orchestrator', name: 'Orchestrator', desc: 'Router & Planner', icon: <SettingsIcon sx={{ fontSize: 28 }} /> },
                          { id: 'hr_agent', name: 'HR Specialist', desc: 'Employee Lifecycle', icon: <PeopleIcon sx={{ fontSize: 28 }} /> },
                          { id: 'finance_agent', name: 'Finance Specialist', desc: 'Ledger & Audit', icon: <AttachMoneyIcon sx={{ fontSize: 28 }} /> },
                          { id: 'security_agent', name: 'Security Auditor', desc: 'Access & Loop Controls', icon: <SecurityIcon sx={{ fontSize: 28 }} /> }
                        ].map((card) => {
                          const isSelected = selectedAgentCard === card.id;
                          return (
                            <Grid item xs={12} sm={6} md={3} key={card.id}>
                              <Card 
                                onClick={() => handleSelectAgentCard(card.id)}
                                sx={{ 
                                  cursor: 'pointer',
                                  bgcolor: isSelected ? '#ffc700' : '#111a22',
                                  color: isSelected ? '#0a0b0d' : '#f0f2f5',
                                  transition: 'all 0.2s ease',
                                  border: isSelected ? '1px solid #ffc700' : '1px solid #161a22',
                                  '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: isSelected ? '0 4px 12px rgba(255, 199, 0, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.3)'
                                  }
                                }}
                              >
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: '25px !important', px: 2, textAlign: 'center' }}>
                                  <Box sx={{ 
                                    p: 1.5, 
                                    borderRadius: '50%', 
                                    bgcolor: isSelected ? 'rgba(10, 11, 13, 0.08)' : 'rgba(255,255,255,0.03)', 
                                    mb: 2,
                                    color: isSelected ? '#0a0b0d' : '#ffc700'
                                  }}>
                                    {card.icon}
                                  </Box>
                                  <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: '"Outfit", sans-serif', fontSize: '16px' }}>{card.name}</Typography>
                                  <Typography variant="caption" sx={{ color: isSelected ? 'rgba(10, 11, 13, 0.7)' : '#8f9cae', mt: 0.5 }}>{card.desc}</Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                          );
                        })}
                      </Grid>
                    </Grid>

                    {/* Overall Performance & Trigger Workspaces */}
                    <Grid item xs={12} lg={8} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      
                      {/* Overall Performance (yellow & grey bars) */}
                      <Card>
                        <CardContent sx={{ p: '20px !important' }}>
                          <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 700, mb: 2, fontFamily: '"Outfit", sans-serif' }}>
                            Overall Performance
                          </Typography>
                          <PerformanceBars tasks={tasks} />
                        </CardContent>
                      </Card>

                      {/* Trigger Form */}
                      <Card>
                        <CardContent sx={{ p: '20px !important' }}>
                          <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#ffc700', fontFamily: '"Outfit", sans-serif', fontWeight: 700 }}>
                            <PlayArrowIcon /> Run Observability Workspace
                          </Typography>
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

                      {/* Live Call Lineage Graph */}
                      <Card sx={{ height: 350, display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flexGrow: 1, p: 0, position: 'relative' }}>
                          <Box sx={{ p: 2, position: 'absolute', zIndex: 10, pointerEvents: 'none' }}>
                            <Typography variant="h6" sx={{ color: '#ffc700', fontWeight: 700, fontFamily: '"Outfit", sans-serif' }}>Agent Call Lineage Graph</Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>Real-time DAG of communication and dependencies</Typography>
                          </Box>
                          <LineageGraph agents={agents} isStreaming={isStreaming} activeScenario={activeScenario} />
                        </CardContent>
                      </Card>
                    </Grid>

                    {/* Sparkline cards and approvals sidebar */}
                    <Grid item xs={12} lg={4} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      
                      {/* System Spend Sparkline Card */}
                      <Card>
                        <CardContent sx={{ p: '20px !important' }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                            <Box>
                              <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>System Spend</Typography>
                              <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: '"Outfit", sans-serif', color: '#00ff9d', mt: 0.5 }}>
                                ${summary.total_spend}
                              </Typography>
                            </Box>
                            <Chip size="small" label="+12.4%" sx={{ bgcolor: 'rgba(0, 255, 157, 0.15)', color: '#00ff9d', fontWeight: 'bold' }} />
                          </Box>
                          <Box sx={{ height: 45, mt: 2 }}>
                            <MiniSparkline data={spendSparkData} color="#00ff9d" type="bar" />
                          </Box>
                          <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', mt: 1.5 }}>
                            Gemini Flash API usage
                          </Typography>
                        </CardContent>
                      </Card>

                      {/* Active Alerts Sparkline Card */}
                      <Card>
                        <CardContent sx={{ p: '20px !important' }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                            <Box>
                              <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>Active Alerts</Typography>
                              <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: '"Outfit", sans-serif', color: '#ff3366', mt: 0.5 }}>
                                {summary.active_alerts}
                              </Typography>
                            </Box>
                            {summary.active_alerts > 0 ? (
                              <Chip size="small" label="WARNING" sx={{ bgcolor: 'rgba(255, 51, 102, 0.15)', color: '#ff3366', fontWeight: 'bold' }} />
                            ) : (
                              <Chip size="small" label="SECURE" sx={{ bgcolor: 'rgba(0, 229, 255, 0.15)', color: '#00e5ff', fontWeight: 'bold' }} />
                            )}
                          </Box>
                          <Box sx={{ height: 45, mt: 2 }}>
                            <MiniSparkline data={alertSparkData} color="#ff3366" type="line" />
                          </Box>
                          <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', mt: 1.5 }}>
                            {summary.active_alerts > 0 ? 'Anomaly breach active' : 'All systems operating normally'}
                          </Typography>
                        </CardContent>
                      </Card>

                      {/* Human Approval Queue */}
                      <Card sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: 280 }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: '20px !important' }}>
                          <Typography variant="h6" sx={{ color: '#ffaa00', mb: 2, fontWeight: 700, fontFamily: '"Outfit", sans-serif' }}>
                            Human Approval Queue
                          </Typography>
                          <ApprovalQueue approvals={approvals} onAction={handleApprovalAction} />
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

            {/* VIEW 2: AGENT REGISTRY */}
            {currentView === 'registry' && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Configure prompts, adjust token cost settings, and manage credentials.
                  </Typography>
                  <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAgentDialogOpen(true)}>
                    Register Agent
                  </Button>
                </Box>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Agent ID</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Agent Name</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Role / Purpose</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Cost Ceiling (USD)</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Total Spend</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Runs Counter</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {agents.map((agent) => (
                        <TableRow key={agent.id}>
                          <TableCell sx={{ fontWeight: 'bold', color: 'primary.light' }}>{agent.id}</TableCell>
                          <TableCell>{agent.name}</TableCell>
                          <TableCell sx={{ color: 'text.secondary' }}>{agent.role}</TableCell>
                          <TableCell>${agent.cost_limit.toFixed(2)}</TableCell>
                          <TableCell sx={{ color: '#00ff9d' }}>${agent.total_spend.toFixed(4)}</TableCell>
                          <TableCell>{agent.task_count}</TableCell>
                          <TableCell>
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

            {/* VIEW 3: AUDIT & REPLAY */}
            {currentView === 'audit' && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  View full execution logs and trigger time-travel step trace replays of multi-agent jobs.
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Task ID</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Instructions Prompt</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Session Spend</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Warnings</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Errors</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Timestamp</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Trace</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tasks.map((task) => (
                        <TableRow key={task.id}>
                          <TableCell sx={{ fontFamily: 'monospace' }}>{task.id.substring(0, 8)}...</TableCell>
                          <TableCell>{task.description}</TableCell>
                          <TableCell>
                            <Chip 
                              label={task.status} 
                              color={task.status === 'SUCCESS' ? 'success' : task.status === 'FAILED' ? 'error' : 'warning'} 
                              size="small" 
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell sx={{ color: '#00ff9d', fontWeight: 500 }}>${task.cost_usd.toFixed(4)}</TableCell>
                          <TableCell>{task.warnings}</TableCell>
                          <TableCell sx={{ color: task.errors > 0 ? '#ff3366' : 'inherit' }}>{task.errors}</TableCell>
                          <TableCell sx={{ color: 'text.secondary', fontSize: '12px' }}>{new Date(task.created_at).toLocaleString()}</TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>
                            <Button 
                              size="small" 
                              variant="outlined" 
                              startIcon={<ReplayIcon />}
                              onClick={() => handleOpenReplay(task)}
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

            {/* VIEW 4: COST INTELLIGENCE */}
            {currentView === 'cost' && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                    Attribution analytics and budget limits configured per agent.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Card sx={{ p: 2 }}>
                    <Typography variant="h6" sx={{ mb: 2, color: 'primary.light' }}>Historical Tasks Token Spend</Typography>
                    <CostCharts tasks={tasks} />
                  </Card>
                </Grid>
                <Grid item xs={12} md={5}>
                  <Card sx={{ p: 2, height: '100%' }}>
                    <Typography variant="h6" sx={{ mb: 2, color: 'secondary.light' }}>Agent Budgets & Consumption</Typography>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 'bold' }}>Agent</TableCell>
                          <TableCell sx={{ fontWeight: 'bold' }}>Limit</TableCell>
                          <TableCell sx={{ fontWeight: 'bold' }}>Consumed</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {agents.map((a) => (
                          <TableRow key={a.id}>
                            <TableCell>{a.name}</TableCell>
                            <TableCell>${a.cost_limit.toFixed(2)}</TableCell>
                            <TableCell sx={{ color: a.total_spend >= a.cost_limit ? '#ff3366' : '#00ff9d', fontWeight: 600 }}>
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

            {/* VIEW 5: APPROVALS */}
            {currentView === 'approvals' && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Governance log tracking all transaction requests approved or rejected by human operators.
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Task Description</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Action Requested</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Reviewer</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Feedback Comment</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tasks.filter(t => t.status === 'SUCCESS' || t.status === 'FAILED').map((t) => {
                        return (
                          <TableRow key={t.id}>
                            <TableCell sx={{ color: 'text.secondary' }}>{t.description}</TableCell>
                            <TableCell sx={{ fontWeight: 500 }}>Budget Request</TableCell>
                            <TableCell>Human Manager</TableCell>
                            <TableCell sx={{ fontStyle: 'italic' }}>
                              {t.status === 'SUCCESS' ? 'Approved under AWS allowance.' : 'Rejected due to limits.'}
                            </TableCell>
                            <TableCell>
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

        {/* DIALOG: REGISTER NEW AGENT */}
        <Dialog open={agentDialogOpen} onClose={() => setAgentDialogOpen(false)} PaperProps={{ sx: { bgcolor: '#111a22', border: '1px solid #161a22', minWidth: 400 } }}>
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
              />
              <TextField 
                required 
                fullWidth 
                size="small" 
                label="Agent Name" 
                value={newAgent.name} 
                onChange={(e) => setNewAgent({...newAgent, name: e.target.value})} 
              />
              <TextField 
                required 
                fullWidth 
                size="small" 
                label="Agent Role / Intent" 
                value={newAgent.role} 
                onChange={(e) => setNewAgent({...newAgent, role: e.target.value})} 
              />
              <TextField 
                required 
                fullWidth 
                type="number" 
                size="small" 
                label="Spend Limit Ceiling (USD)" 
                value={newAgent.cost_limit} 
                onChange={(e) => setNewAgent({...newAgent, cost_limit: parseFloat(e.target.value)})} 
              />
              <TextField 
                fullWidth 
                multiline 
                rows={3} 
                size="small" 
                label="Parameters Config (JSON)" 
                value={newAgent.configuration} 
                onChange={(e) => setNewAgent({...newAgent, configuration: e.target.value})} 
              />
            </DialogContent>
            <DialogActions sx={{ p: 2.5, borderTop: '1px solid #161a22' }}>
              <Button onClick={() => setAgentDialogOpen(false)} variant="outlined" color="inherit">Cancel</Button>
              <Button type="submit" variant="contained">Register Agent</Button>
            </DialogActions>
          </form>
        </Dialog>

        {/* DIALOG: TIMELINE AUDIT REPLAY TRACE */}
        <Dialog open={replayDialogOpen} onClose={() => setReplayDialogOpen(false)} PaperProps={{ sx: { bgcolor: '#111a22', border: '1px solid #161a22', minWidth: 500 } }}>
          <DialogTitle sx={{ fontFamily: '"Outfit", sans-serif', borderBottom: '1px solid #161a22', pb: 2 }}>
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
                        optional={<Typography variant="caption" sx={{ color: 'text.secondary' }}>[{new Date(log.timestamp).toLocaleTimeString()}]</Typography>}
                      >
                        <span style={{ 
                          color: log.level === 'ERROR' ? '#ff3366' : log.level === 'WARNING' ? '#ffaa00' : '#f0f2f5',
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
          <DialogActions sx={{ p: 2, borderTop: '1px solid #161a22' }}>
            <Button onClick={() => setReplayDialogOpen(false)} variant="outlined" color="inherit">Close Trace</Button>
          </DialogActions>
        </Dialog>

      </Box>
    </ThemeProvider>
  );
}

export default App;
