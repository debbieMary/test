import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Divider,
  Avatar,
  useTheme,
  alpha
} from '@mui/material';
import {
  Person,
  LocalHospital,
  CheckCircle,
  Cancel,
  Pending,
  Info
} from '@mui/icons-material';
import Modal from '../../modal/Modal';
import SubTitle from '../../ui/SubTitle';
import { Appointment } from '../../../types/appointment';

interface AppointmentDetailModalProps {
  open: boolean;
  appointment: Appointment | null;
  onClose: () => void;
}

export default function AppointmentDetailModal({
  open,
  appointment,
  onClose
}: AppointmentDetailModalProps) {
  const theme = useTheme();

  if (!appointment) return null;

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'confirmed':
        return { backgroundColor: alpha(theme.palette.secondary.main, 0.15), color: theme.palette.secondary.main };
      case 'pending':
        return { backgroundColor: alpha(theme.palette.primary.main, 0.15), color: theme.palette.primary.main };
      case 'cancelled':
        return { backgroundColor: alpha(theme.palette.danger.main, 0.15), color: theme.palette.danger.main };
      case 'completed':
        return { backgroundColor: alpha(theme.palette.grey[400], 0.15), color: theme.palette.grey[600] };
      default:
        return { backgroundColor: alpha(theme.palette.grey[300], 0.15), color: theme.palette.grey[600] };
    }
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'confirmed': return <CheckCircle />;
      case 'pending': return <Pending />;
      case 'cancelled': return <Cancel />;
      case 'completed': return <Info />;
      default: return <Info />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Appointment Details"
      icon={LocalHospital}
      titleColor="primary"
      maxWidth="md"
      fullWidth
    >
        {/* Status and ID */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Appointment #{appointment.id}
          </Typography>
          <Chip
            icon={getEstadoIcon(appointment.estado)}
            label={appointment.estado.charAt(0).toUpperCase() + appointment.estado.slice(1)}
            sx={{
              ...getEstadoColor(appointment.estado),
              '& .MuiChip-icon': {
                color: 'inherit',
                opacity: 0.7
              }
            }}
          />
        </Box>

        {/* Información principal en grid de 3 columnas */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          gap: 3,
          mb: 2
        }}>
          {/* Doctor */}
          <Box>
            <SubTitle color="primary">
              Doctor
            </SubTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar sx={{ width: 40, height: 40, bgcolor: theme.palette.primary.main }}>
                <Person sx={{ fontSize: 20 }} />
              </Avatar>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {appointment.doctor}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {appointment.especialidad}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Tipo */}
          <Box>
            <SubTitle color="primary">
              Type
            </SubTitle>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {appointment.tipo}
            </Typography>
          </Box>

          {/* Fecha y Hora */}
          <Box>
            <SubTitle color="primary">
              Date & Time
            </SubTitle>
            <Typography variant="body1" sx={{ fontWeight: 500, mb: 0.5 }}>
              {formatDate(appointment.fecha)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {appointment.hora}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Descripción */}
        <Box sx={{ mb: 2 }}>
          <SubTitle color="primary">
            Description
          </SubTitle>
          <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
            {appointment.descripcion}
          </Typography>
        </Box>

        {/* Información condicional con fondo sutil */}
        {appointment.estado === 'completed' && appointment.descripcionCita && (
          <>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.secondary.main, 0.08),
              border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`
            }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: theme.palette.secondary.main }}>
                ✅ Consultation Summary
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                {appointment.descripcionCita}
              </Typography>
            </Box>
          </>
        )}

        {appointment.estado === 'cancelled' && appointment.motivoRechazo && (
          <>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.danger.main, 0.08),
              border: `1px solid ${alpha(theme.palette.danger.main, 0.2)}`
            }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: theme.palette.danger.main }}>
                ❌ Cancellation Reason
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                {appointment.motivoRechazo}
              </Typography>
            </Box>
          </>
        )}

        {/* Exámenes */}
        {appointment.examenes && appointment.examenes.length > 0 && (
          <>
            <Divider sx={{ mb: 2 }} />
            <Box>
              <SubTitle color="primary">
                Requested Tests
              </SubTitle>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {appointment.examenes.map((examen, index) => (
                  <Chip
                    key={index}
                    label={examen}
                    variant="outlined"
                    size="small"
                    sx={{
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.primary.main
                    }}
                  />
                ))}
              </Box>
            </Box>
          </>
        )}
    </Modal>
  );
}