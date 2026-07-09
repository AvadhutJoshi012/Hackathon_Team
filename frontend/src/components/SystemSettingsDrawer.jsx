import React, { useState, useEffect } from 'react';
import { 
  Drawer, Box, Typography, IconButton, TextField, Button, Slider, 
  Divider, Alert, InputAdornment 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import SaveIcon from '@mui/icons-material/Save';

export default function SystemSettingsDrawer({ open, onClose, isLight, onResetComplete, API_BASE }) {
  // Authentication states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [authError, setAuthError] = useState('');

  // Settings states
  const [simulationSpeed, setSimulationSpeed] = useState(0.4);
  const [loopLimit, setLoopLimit] = useState(3);
  const [costLimit, setCostLimit] = useState(1000.0);
  
  // Status message
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  // Load configuration from API when drawer opens or unlocks
  useEffect(() => {
    if (open && isUnlocked) {
      fetchSettings();
    }
  }, [open, isUnlocked]);

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${API_BASE}/settings`);
      if (res.ok) {
        const data = await res.json();
        setSimulationSpeed(data.simulation_speed);
        setLoopLimit(data.loop_breaker_limit);
        setCostLimit(data.cost_warning_limit);
      }
    } catch (err) {
      console.error("Error loading system settings:", err);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim().toLowerCase() === 'admin' && password === 'admin123') {
      setIsUnlocked(true);
      setAuthError('');
      setStatusMessage({ type: 'success', text: 'Clearance approved. Welcome back, Administrator.' });
    } else {
      setAuthError('Invalid credentials. Access denied.');
    }
  };

  const handleSaveSettings = async () => {
    try {
      const res = await fetch(`${API_BASE}/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          simulation_speed: simulationSpeed,
          loop_breaker_limit: loopLimit,
          cost_warning_limit: costLimit
        })
      });
      if (res.ok) {
        setStatusMessage({ type: 'success', text: 'System configuration parameters saved!' });
        setTimeout(() => setStatusMessage({ type: '', text: '' }), 4000);
      } else {
        setStatusMessage({ type: 'error', text: 'Failed to update system parameters.' });
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'Network failure communicating with API.' });
    }
  };

  const handleResetDB = async () => {
    if (!window.confirm("Are you sure you want to WIPE all historical tasks, costs, approvals, and alert logs? This action is irreversible.")) {
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/settings/reset-db`, { method: 'POST' });
      if (res.ok) {
        setStatusMessage({ type: 'success', text: 'Database telemetry reset successfully!' });
        if (onResetComplete) onResetComplete();
        setTimeout(() => setStatusMessage({ type: '', text: '' }), 4000);
      } else {
        setStatusMessage({ type: 'error', text: 'Failed to reset database.' });
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'Network error resetting database.' });
    }
  };

  const handleTriggerTestAlert = async () => {
    try {
      const res = await fetch(`${API_BASE}/alerts/trigger-test`, { method: 'POST' });
      if (res.ok) {
        setStatusMessage({ type: 'success', text: 'Test Warning Alert triggered successfully!' });
        if (onResetComplete) onResetComplete();
        setTimeout(() => setStatusMessage({ type: '', text: '' }), 4000);
      } else {
        setStatusMessage({ type: 'error', text: 'Failed to trigger test alert.' });
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'Error triggering test alert.' });
    }
  };

  const handleLock = () => {
    setIsUnlocked(false);
    setUsername('');
    setPassword('');
    setStatusMessage({ type: '', text: '' });
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 420 },
          bgcolor: isLight ? '#ffffff' : '#111a22',
          borderLeft: isLight ? '1px solid #e0e2e5' : '1px solid rgba(255,199,0,0.25)',
          display: 'flex',
          flexDirection: 'column',
          color: isLight ? '#0a0b0d' : '#f0f2f5',
        }
      }}
    >
      {/* Header */}
      <Box sx={{ p: 3, borderBottom: isLight ? '1px solid #e0e2e5' : '1px solid #161a22', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            bgcolor: isUnlocked ? 'success.main' : 'error.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0a0b0d'
          }}>
            {isUnlocked ? <LockOpenIcon sx={{ fontSize: 16 }} /> : <LockIcon sx={{ fontSize: 16 }} />}
          </Box>
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 800, fontFamily: '"Outfit", sans-serif', color: isLight ? '#0a0b0d' : '#ffc700' }}>
              AXON. Administrator Console
            </Typography>
            <Typography variant="caption" sx={{ color: isLight ? '#536275' : 'text.secondary', display: 'block', fontSize: '10px' }}>
              {isUnlocked ? 'System parameters unlocked' : 'Clearance required'}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} sx={{ color: isLight ? '#536275' : '#8f9cae' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Content */}
      <Box sx={{ flexGrow: 1, p: 3, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 3.5 }}>
        
        {/* Status Alerts */}
        {statusMessage.text && (
          <Alert severity={statusMessage.type} sx={{ borderRadius: 2 }}>
            {statusMessage.text}
          </Alert>
        )}

        {/* LOCKED VIEW - Logon gate */}
        {!isUnlocked ? (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: '20px' }}>
            <Box sx={{ textAlign: 'center', mb: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '16px', color: isLight ? '#0a0b0d' : '#f0f2f5' }}>
                Secure Access Authentication
              </Typography>
              <Typography variant="body2" sx={{ color: isLight ? '#536275' : 'text.secondary', mt: 0.5, fontSize: '12px' }}>
                Clearance: <strong>admin</strong> / <strong>admin123</strong>
              </Typography>
            </Box>

            {authError && (
              <Alert severity="error" sx={{ borderRadius: 2 }}>{authError}</Alert>
            )}

            <TextField
              label="Admin Username"
              variant="outlined"
              size="small"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputLabelProps={{ style: { color: isLight ? '#536275' : '#8f9cae' } }}
              inputProps={{ style: { color: isLight ? '#0a0b0d' : '#f0f2f5' } }}
              sx={{ borderColor: isLight ? '#e0e2e5' : '#161a22' }}
            />

            <TextField
              label="Admin Passcode"
              type="password"
              variant="outlined"
              size="small"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{ style: { color: isLight ? '#536275' : '#8f9cae' } }}
              inputProps={{ style: { color: isLight ? '#0a0b0d' : '#f0f2f5' } }}
              sx={{ borderColor: isLight ? '#e0e2e5' : '#161a22' }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ py: 1.2, fontWeight: 'bold', fontSize: '13px' }}
            >
              Request Clearance Gate Open
            </Button>
          </form>
        ) : (
          /* UNLOCKED VIEW - Configuration Sliders */
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            
            {/* Simulation speed */}
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, color: isLight ? '#0a0b0d' : '#f0f2f5' }}>
                Simulation Run Speed: <span style={{ color: isLight ? '#ca8a04' : '#ffc700' }}>{simulationSpeed.toFixed(1)}s</span>
              </Typography>
              <Typography variant="caption" sx={{ color: isLight ? '#536275' : 'text.secondary', display: 'block', mb: 2 }}>
                Configure delay intervals between agent execution steps.
              </Typography>
              <Slider
                value={simulationSpeed}
                min={0.1}
                max={3.0}
                step={0.1}
                onChange={(e, val) => setSimulationSpeed(val)}
                valueLabelDisplay="auto"
                sx={{ color: isLight ? '#ca8a04' : '#ffc700' }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'text.secondary' }}>
                <span>0.1s (Fastest)</span>
                <span>3.0s (Thorough)</span>
              </Box>
            </Box>

            <Divider sx={{ borderColor: isLight ? '#e0e2e5' : '#161a22' }} />

            {/* Loop Limit */}
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, color: isLight ? '#0a0b0d' : '#f0f2f5' }}>
                Recursive Loop Limit: <span style={{ color: isLight ? '#ca8a04' : '#ffc700' }}>{loopLimit} attempts</span>
              </Typography>
              <Typography variant="caption" sx={{ color: isLight ? '#536275' : 'text.secondary', display: 'block', mb: 2 }}>
                Number of retry loops allowed before loop breaker terminates execution.
              </Typography>
              <Slider
                value={loopLimit}
                min={2}
                max={10}
                step={1}
                onChange={(e, val) => setLoopLimit(val)}
                valueLabelDisplay="auto"
                sx={{ color: isLight ? '#ca8a04' : '#ffc700' }}
              />
            </Box>

            <Divider sx={{ borderColor: isLight ? '#e0e2e5' : '#161a22' }} />

            {/* Cost Warning cap */}
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, color: isLight ? '#0a0b0d' : '#f0f2f5' }}>
                Cost Warning Limit
              </Typography>
              <Typography variant="caption" sx={{ color: isLight ? '#536275' : 'text.secondary', display: 'block', mb: 2 }}>
                USD threshold at which warning indicators turn amber/red.
              </Typography>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                type="number"
                value={costLimit}
                onChange={(e) => setCostLimit(parseFloat(e.target.value) || 0)}
                InputProps={{
                  startAdornment: <InputAdornment position="start" sx={{ color: isLight ? '#0a0b0d' : '#f0f2f5' }}>$</InputAdornment>,
                  style: { color: isLight ? '#0a0b0d' : '#f0f2f5' }
                }}
              />
            </Box>

            <Divider sx={{ borderColor: isLight ? '#e0e2e5' : '#161a22' }} />

            {/* System Actions */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: isLight ? '#0a0b0d' : '#f0f2f5' }}>
                System Actions
              </Typography>

              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={handleSaveSettings}
                sx={{ textTransform: 'none', fontWeight: 'bold' }}
              >
                Save System Parameters
              </Button>

              <Button
                variant="outlined"
                color="warning"
                startIcon={<NotificationImportantIcon />}
                onClick={handleTriggerTestAlert}
                sx={{ textTransform: 'none', fontWeight: 'bold' }}
              >
                Trigger Test Warning Alert
              </Button>

              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteForeverIcon />}
                onClick={handleResetDB}
                sx={{ textTransform: 'none', fontWeight: 'bold' }}
              >
                Wipe Historical Telemetry
              </Button>
            </Box>

            <Divider sx={{ borderColor: isLight ? '#e0e2e5' : '#161a22', mt: 2 }} />

            <Button
              variant="text"
              color="inherit"
              onClick={handleLock}
              fullWidth
              sx={{ textTransform: 'none', color: isLight ? '#536275' : 'text.secondary' }}
            >
              Lock Administrator Clearance
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}
