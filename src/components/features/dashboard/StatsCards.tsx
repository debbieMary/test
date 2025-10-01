import React from 'react';
import { Box, useTheme, alpha } from '@mui/material';
import {
  CalendarMonth,
  CheckCircle,
  Pending
} from '@mui/icons-material';
import StatsCard from '../../charts/StatsCard';
import { Appointment } from '../../../types/appointment';

interface StatsCardsProps {
  appointments: Appointment[];
}

export default function StatsCards({ appointments }: StatsCardsProps) {
  const theme = useTheme();

  // Calcular estadísticas
  const totalAppointments = appointments.length;
  const confirmedAppointments = appointments.filter(a => a.estado === 'confirmed').length;
  const pendingAppointments = appointments.filter(a => a.estado === 'pending').length;
  const completedAppointments = appointments.filter(a => a.estado === 'completed').length;

  const stats = [
    {
      title: 'Total Appointments',
      value: totalAppointments,
      icon: CalendarMonth,
      color: theme.palette.primary.main,
      bgColor: alpha(theme.palette.primary.main, 0.15)
    },
    {
      title: 'Confirmed',
      value: confirmedAppointments,
      icon: CheckCircle,
      color: theme.palette.secondary.main,
      bgColor: alpha(theme.palette.secondary.main, 0.15)
    },
    {
      title: 'Pending',
      value: pendingAppointments,
      icon: Pending,
      color: theme.palette.primary.main,
      bgColor: alpha(theme.palette.primary.main, 0.15)
    },
    {
      title: 'Completed',
      value: completedAppointments,
      icon: CheckCircle,
      color: theme.palette.grey[600],
      bgColor: alpha(theme.palette.grey[400], 0.15)
    }
  ];

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
      {stats.map((stat, index) => (
        <Box
          key={index}
          sx={{
            flex: { xs: '1 1 calc(50% - 8px)', md: '1 1 calc(25% - 12px)' },
            minWidth: { xs: 'calc(50% - 8px)', md: 'calc(25% - 12px)' }
          }}
        >
          <StatsCard
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            bgColor={stat.bgColor}
          />
        </Box>
      ))}
    </Box>
  );
}
