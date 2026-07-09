import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CircleIcon from '@mui/icons-material/Circle';

export default function MetricCards({ summary }) {
  const cards = [
    {
      title: 'Active Agents',
      value: summary.total_agents !== undefined ? summary.total_agents : 0,
      badge: '▲ 4.2%',
      badgeColor: '#00ff9d',
      icon: <CircleIcon sx={{ fontSize: 14, color: '#ffc700' }} />
    },
    {
      title: 'Fleet Health Score',
      value: `${summary.health_score !== undefined ? summary.health_score : 100}%`,
      badge: '▲ 1.1%',
      badgeColor: '#00ff9d',
      icon: <CheckIcon sx={{ fontSize: 16, color: '#ffc700' }} />
    },
    {
      title: 'Tasks Executed Today',
      value: summary.total_tasks !== undefined ? summary.total_tasks : 0,
      badge: '- 0.0%',
      badgeColor: '#8f9cae',
      icon: <MoreVertIcon sx={{ fontSize: 16, color: '#ffc700' }} />
    },
    {
      title: 'Token Spend Today',
      value: `$${summary.total_spend !== undefined ? Number(summary.total_spend).toFixed(4) : '0.0000'}`,
      badge: '▲ 12.8%',
      badgeColor: '#ff3366',
      icon: <AttachMoneyIcon sx={{ fontSize: 16, color: '#ffc700' }} />
    }
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((c, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card sx={{ 
            bgcolor: '#111a22', 
            border: '1px solid #161a22', 
            borderRadius: 2,
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.25)',
            position: 'relative'
          }}>
            <CardContent sx={{ p: '20px !important' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                {/* Icon wrapper */}
                <Box sx={{ 
                  width: 28, 
                  height: 28, 
                  borderRadius: 1, 
                  bgcolor: 'rgba(255, 199, 0, 0.1)', 
                  border: '1px solid rgba(255, 199, 0, 0.2)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  {c.icon}
                </Box>
                {/* Badge */}
                <Typography variant="caption" sx={{ color: c.badgeColor, fontWeight: 700, fontSize: '11px' }}>
                  {c.badge}
                </Typography>
              </Box>

              <Typography variant="h3" sx={{ 
                fontWeight: 800, 
                fontFamily: '"Outfit", sans-serif', 
                color: '#f0f2f5',
                fontSize: '2rem',
                lineHeight: 1.1
              }}>
                {c.value}
              </Typography>

              <Typography variant="caption" sx={{ color: '#8f9cae', display: 'block', mt: 1, fontWeight: 500, fontSize: '12px' }}>
                {c.title}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
