import React from 'react';
import { Box, useTheme, alpha } from '@mui/material';
import { Dashboard as DashboardIcon } from '@mui/icons-material';
import PageTitle from '../components/ui/PageTitle';
import StatsCards from '../components/features/dashboard/StatsCards';
import BarChart from '../components/charts/BarChart';
import PieChart from '../components/charts/PieChart';
import { sampleAppointments } from '../constants/appointmentData';

export default function Dashboard() {
  const theme = useTheme();

  // Procesar datos por estado
  const statusData = sampleAppointments.reduce((acc, appointment) => {
    const status = appointment.estado;
    const existing = acc.find(item => item.status === status);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ status, count: 1 });
    }
    return acc;
  }, [] as { status: string; count: number }[]);

  // Procesar datos por especialidad
  const specialtyData = sampleAppointments.reduce((acc, appointment) => {
    const specialty = appointment.especialidad;
    const existing = acc.find(item => item.name === specialty);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: specialty, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  // Colores para gráficas
  const chartColors = [
    alpha(theme.palette.primary.main, 0.7),
    alpha(theme.palette.secondary.main, 0.7),
    alpha(theme.palette.grey[600], 0.7),
    alpha(theme.palette.grey[700], 0.7),
    alpha(theme.palette.grey[500], 0.7),
    alpha(theme.palette.grey[800], 0.7)
  ];

  // Función para obtener color por estado
  const getStatusColor = (item: { [key: string]: string | number }) => {
    switch (item.status as string) {
      case 'confirmed':
        return alpha(theme.palette.secondary.main, 0.6);
      case 'pending':
        return alpha(theme.palette.primary.main, 0.6);
      case 'cancelled':
        return alpha(theme.palette.danger.main, 0.6);
      case 'completed':
        return alpha(theme.palette.grey[600], 0.6);
      default:
        return alpha(theme.palette.grey[500], 0.6);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <PageTitle
        title="Dashboard"
        icon={DashboardIcon}
        subtitle="General system overview and main metrics"
      />

      <StatsCards appointments={sampleAppointments} />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        <BarChart
          title="Status Distribution"
          data={statusData}
          dataKey="count"
          xAxisKey="status"
          colorMapping={getStatusColor}
          xAxisFormatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}
          tooltipFormatter={(value: number) => [`${value} items`, 'Count']}
          tooltipLabelFormatter={(label) => label.charAt(0).toUpperCase() + label.slice(1)}
        />

        <PieChart
          title="Appointments by Specialty"
          data={specialtyData}
          colors={chartColors}
          showLegend={true}
          showPercentage={true}
        />
      </Box>
    </Box>
  );
}