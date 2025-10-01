import React from 'react';
import { Paper, Box, Typography, useTheme } from '@mui/material';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

interface BarChartData {
  [key: string]: string | number;
}

interface BarChartProps {
  title: string;
  data: BarChartData[];
  dataKey: string;
  xAxisKey: string;
  colorMapping?: (item: BarChartData) => string;
  height?: number;
  xAxisFormatter?: (value: any) => string;
  tooltipFormatter?: (value: any) => [string, string];
  tooltipLabelFormatter?: (label: any) => string;
}

export default function BarChart({
  title,
  data,
  dataKey,
  xAxisKey,
  colorMapping,
  height = 300,
  xAxisFormatter,
  tooltipFormatter,
  tooltipLabelFormatter
}: BarChartProps) {
  const theme = useTheme();

  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
          <XAxis
            dataKey={xAxisKey}
            tick={{ fill: theme.palette.text.secondary }}
            tickFormatter={xAxisFormatter}
          />
          <YAxis tick={{ fill: theme.palette.text.secondary }} />
          <Tooltip
            contentStyle={{
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 8
            }}
            formatter={tooltipFormatter}
            labelFormatter={tooltipLabelFormatter}
          />
          <Bar dataKey={dataKey} radius={[8, 8, 0, 0]} fill={theme.palette.primary.main}>
            {colorMapping && data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colorMapping(entry)} />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </Paper>
  );
}
