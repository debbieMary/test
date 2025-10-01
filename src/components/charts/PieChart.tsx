import React from 'react';
import { Paper, Box, Typography, useTheme } from '@mui/material';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';

interface PieChartData {
  name: string;
  value: number;
  [key: string]: any;
}

interface PieChartProps {
  title: string;
  data: PieChartData[];
  colors: string[];
  height?: number;
  showLegend?: boolean;
  showPercentage?: boolean;
  outerRadius?: number;
  legendFormatter?: (value: string) => string;
  tooltipFormatter?: (value: number, name: string) => [string, string];
}

export default function PieChart({
  title,
  data,
  colors,
  height = 300,
  showLegend = true,
  showPercentage = true,
  outerRadius = 80,
  legendFormatter,
  tooltipFormatter
}: PieChartProps) {
  const theme = useTheme();

  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={showPercentage ? ({ percent }) => `${(percent * 100).toFixed(0)}%` : undefined}
            outerRadius={outerRadius}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 8
            }}
            formatter={tooltipFormatter}
          />
          {showLegend && (
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={legendFormatter}
              wrapperStyle={{
                fontSize: '12px',
                paddingTop: '10px'
              }}
            />
          )}
        </RechartsPieChart>
      </ResponsiveContainer>
    </Paper>
  );
}
