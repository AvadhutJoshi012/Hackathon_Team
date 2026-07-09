import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { Box, Typography } from '@mui/material';

export default function PerformanceBars({ tasks }) {
  // Map last 8 tasks to performance comparison metrics
  const data = [...tasks]
    .reverse()
    .map((t, idx) => {
      const created = new Date(t.created_at);
      const completed = t.completed_at ? new Date(t.completed_at) : new Date();
      const durationSeconds = Math.max(1, Math.round((completed - created) / 1000));
      
      return {
        name: `Task #${idx + 1}`,
        duration: durationSeconds,
        cost: parseFloat((t.cost_usd * 1000).toFixed(2)) // Cost scaled to milli-USD for chart visualization
      };
    })
    .slice(-8);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Box sx={{ bgcolor: '#111a22', border: '1px solid #161a22', p: 1.5, borderRadius: 1.5 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
            {payload[0].payload.name}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#ffc700', my: 0.5 }}>
            Duration: {payload[0].value}s
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#8f9cae' }}>
            Cost: ${(payload[1].value / 1000).toFixed(4)}
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
            No performance data recorded. Run tasks to plot benchmarks.
          </Typography>
        </Box>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <CartesianGrid stroke="#161a22" strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#8f9cae" style={{ fontSize: '10px' }} />
            <YAxis stroke="#8f9cae" style={{ fontSize: '10px' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
            <Bar dataKey="duration" name="Run Duration (s)" fill="#536275" radius={[3, 3, 0, 0]} />
            <Bar dataKey="cost" name="Token Cost (mUSD)" fill="#ffc700" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
}
