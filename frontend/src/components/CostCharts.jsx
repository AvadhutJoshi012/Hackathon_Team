import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Box, Typography } from '@mui/material';

export default function CostCharts({ tasks, lightTheme = false }) {
  // Sort tasks by date ascending and map to cost chart data
  const data = [...tasks]
    .reverse()
    .map((t, idx) => ({
      name: `Task #${idx + 1}`,
      cost: t.cost_usd,
      description: t.description ? (t.description.length > 25 ? `${t.description.substring(0, 25)}...` : t.description) : 'No description'
    }))
    .slice(-10); // Show last 10 tasks to prevent chart overcrowding

  // Custom tooltip to show description of task
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Box 
          sx={{ 
            bgcolor: lightTheme ? '#ffffff' : '#111a22', 
            border: lightTheme ? '1px solid #e0e2e5' : '1px solid #161a22', 
            p: 1.5, 
            borderRadius: 1.5,
            boxShadow: lightTheme ? '0 4px 12px rgba(0,0,0,0.08)' : 'none'
          }}
        >
          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
            {payload[0].payload.name}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#ffc700', my: 0.5 }}>
            Cost: ${payload[0].value.toFixed(4)}
          </Typography>
          <Typography variant="caption" sx={{ color: lightTheme ? '#0a0b0d' : '#f0f2f5' }}>
            {payload[0].payload.description}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box sx={{ width: '100%', height: 260 }}>
      {data.length === 0 ? (
        <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
            No task data available for costs chart.
          </Typography>
        </Box>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffc700" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#ffc700" stopOpacity={0.01}/>
              </linearGradient>
            </defs>
            <CartesianGrid stroke={lightTheme ? '#e0e2e5' : '#161a22'} strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#8f9cae" style={{ fontSize: '10px' }} />
            <YAxis stroke="#8f9cae" style={{ fontSize: '10px' }} tickFormatter={(val) => `$${val.toFixed(3)}`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="cost" stroke="#ffc700" strokeWidth={2} fillOpacity={1} fill="url(#colorCost)" />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
}
