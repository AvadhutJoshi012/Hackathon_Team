import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';

export default function LogViewer({ logs, isStreaming }) {
  const terminalEndRef = useRef(null);

  // Auto scroll terminal to the bottom
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Determine text color based on warning/error levels
  const getLogColor = (level) => {
    switch (level?.toUpperCase()) {
      case 'ERROR':
        return '#ff3366'; // Failure Red
      case 'WARNING':
        return '#ffaa00'; // Warning Amber
      case 'SUCCESS':
        return '#00ff9d'; // Success Green
      default:
        return '#8f9cae'; // Text Secondary
    }
  };

  return (
    <Box 
      sx={{ 
        flexGrow: 1, 
        bgcolor: '#0a0b0d', // Primary Background
        p: 2, 
        fontFamily: 'monospace', 
        overflowY: 'auto', 
        fontSize: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        border: '1px solid #161a22', // Tertiary Background
        borderRadius: '0 0 12px 12px',
        height: '100%',
        minHeight: '250px'
      }}
    >
      {logs.length === 0 ? (
        <Typography variant="body2" sx={{ color: 'text.disabled', fontStyle: 'italic', m: 'auto' }}>
          No active session tasks. Select a scenario above and click "Run Engine".
        </Typography>
      ) : (
        logs.map((log, index) => (
          <Box key={log.id || index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
            <span style={{ color: '#ffc700', minWidth: '70px', userSelect: 'none' }}>
              [{new Date(log.timestamp || Date.now()).toLocaleTimeString()}]
            </span>
            <span style={{ color: getLogColor(log.level), fontWeight: log.level !== 'INFO' ? 700 : 400 }}>
              {log.message}
            </span>
          </Box>
        ))
      )}
      
      {isStreaming && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#00e5ff' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#00e5ff', animation: 'blink 1s infinite' }}></span>
          <span>Orchestrator streaming task outputs...</span>
        </Box>
      )}

      {/* Helper scroll hook node */}
      <div ref={terminalEndRef} />

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
      `}</style>
    </Box>
  );
}
