import React from 'react';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar } from 'recharts';

export default function MiniSparkline({ data, color = '#00ff9d', type = 'line' }) {
  // Map simple numeric array to object format required by Recharts
  const chartData = data.map((val, idx) => ({ id: idx, value: val }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      {type === 'line' ? (
        <LineChart data={chartData} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={color} 
            strokeWidth={1.5} 
            dot={false} 
          />
        </LineChart>
      ) : (
        <BarChart data={chartData} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
          <Bar 
            dataKey="value" 
            fill={color} 
            radius={[2, 2, 0, 0]} 
          />
        </BarChart>
      )}
    </ResponsiveContainer>
  );
}
