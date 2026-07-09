import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export default function MetricCards({ summary }) {
  const cards = [
    {
      title: 'Global Health Score',
      value: `${summary.health_score}%`,
      icon: <FavoriteIcon sx={{ fontSize: 32, color: summary.health_score > 70 ? '#00ff9d' : '#ff3366' }} />,
      color: summary.health_score > 70 ? 'success.main' : 'error.main',
      subtitle: summary.health_score > 70 ? 'System normal' : 'Breach warning active'
    },
    {
      title: 'Run Success Rate',
      value: `${summary.success_rate}%`,
      icon: <CheckCircleIcon sx={{ fontSize: 32, color: '#00e5ff' }} />,
      color: 'info.main',
      subtitle: `${summary.total_tasks} total executions`
    },
    {
      title: 'Virtual Session Cost',
      value: `$${summary.total_spend}`,
      icon: <AttachMoneyIcon sx={{ fontSize: 32, color: '#00ff9d' }} />,
      color: 'success.main',
      subtitle: 'Free Gemini API keys'
    },
    {
      title: 'Unresolved Alerts',
      value: summary.active_alerts,
      icon: <WarningAmberIcon sx={{ fontSize: 32, color: summary.active_alerts > 0 ? '#ffaa00' : '#8f9cae' }} />,
      color: summary.active_alerts > 0 ? 'warning.main' : 'text.secondary',
      subtitle: summary.active_alerts > 0 ? 'Action required' : 'No active alerts'
    }
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((c, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: '20px !important' }}>
              <Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, mb: 0.5 }}>
                  {c.title}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, fontFamily: '"Outfit", sans-serif', color: c.color }}>
                  {c.value}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}>
                  {c.subtitle}
                </Typography>
              </Box>
              <Box sx={{ bgcolor: 'rgba(255,255,255,0.01)', p: 1.5, borderRadius: '12px', border: '1px solid #161a22' }}>
                {c.icon}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
