import React from 'react';
import { Alert, AlertTitle, Box, Button, Collapse, Stack } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import CheckIcon from '@mui/icons-material/Check';

export default function AlertBanner({ alerts, onResolve, isLight }) {
  if (alerts.length === 0) return null;

  return (
    <Box sx={{ px: 3, pt: 2 }}>
      <Stack spacing={1.5}>
        {alerts.map((a) => (
          <Collapse key={a.id} in={true}>
            <Alert
              severity={a.severity === 'CRITICAL' ? 'error' : 'warning'}
              icon={<WarningIcon fontSize="inherit" />}
              action={
                <Button 
                  color="inherit" 
                  size="small" 
                  startIcon={<CheckIcon />} 
                  onClick={() => onResolve(a.id)}
                  sx={{ 
                    fontWeight: 'bold',
                    color: isLight ? '#0a0b0d' : '#f0f2f5'
                  }}
                >
                  Resolve Alert
                </Button>
              }
              sx={{
                bgcolor: a.severity === 'CRITICAL' 
                  ? (isLight ? '#fef2f2' : 'rgba(255, 51, 102, 0.1)') 
                  : (isLight ? '#fffbeb' : 'rgba(255, 170, 0, 0.1)'),
                border: a.severity === 'CRITICAL' ? '1px solid #ff3366' : '1px solid #ffaa00',
                color: isLight ? '#0a0b0d' : '#f0f2f5',
                '& .MuiAlert-icon': {
                  color: a.severity === 'CRITICAL' ? '#ff3366' : '#ffaa00'
                }
              }}
            >
              <AlertTitle sx={{ fontWeight: 'bold', fontFamily: '"Outfit", sans-serif', color: isLight ? '#0a0b0d' : '#f0f2f5' }}>
                {a.severity === 'CRITICAL' ? 'CRITICAL SYSTEM ANOMALY' : 'GOVERNANCE WARNING'}
              </AlertTitle>
              {a.description} (Task ID: {a.task_id.substring(0, 8)}...)
            </Alert>
          </Collapse>
        ))}
      </Stack>
    </Box>
  );
}
