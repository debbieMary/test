import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Chip,
  IconButton,
  Box,
  useTheme,
  alpha,
  Card,
  CardContent,
  Typography,
  Divider,
  TextField,
  InputAdornment,
  Button
} from '@mui/material';
import { Edit, Delete, Visibility, Search, Add } from '@mui/icons-material';
import DataTable, { Column } from '../../table/DataTable';
import AppointmentDetailModal from './AppointmentDetailModal';
import { Appointment } from '../../../types/appointment';
import { sampleAppointments } from '../../../constants/appointmentData';

export default function AppointmentsTable() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Filtrar datos
  const filteredData = sampleAppointments.filter((cita) =>
    cita.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cita.especialidad.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cita.tipo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Función para obtener color del estado
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

  // Definir columnas de la tabla
  const columns: Column<Appointment>[] = [
    {
      id: 'doctor',
      label: 'Doctor',
      minWidth: 150
    },
    {
      id: 'fecha',
      label: 'Date',
      minWidth: 120
    },
    {
      id: 'hora',
      label: 'Time',
      minWidth: 100,
      hideOnMobile: true
    },
    {
      id: 'especialidad',
      label: 'Specialty',
      minWidth: 150,
      hideOnMobile: true
    },
    {
      id: 'tipo',
      label: 'Type',
      minWidth: 120,
      hideOnMobile: true
    },
    {
      id: 'estado',
      label: 'Status',
      minWidth: 120,
      align: 'center',
      format: (value) => (
        <Chip
          label={value.charAt(0).toUpperCase() + value.slice(1)}
          size="small"
          sx={getEstadoColor(value)}
        />
      )
    }
  ];

  // Acciones de la tabla
  const renderActions = (row: Appointment) => (
    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          setSelectedAppointment(row);
          setModalOpen(true);
        }}
        sx={{
          color: alpha(theme.palette.primary.main, 0.7),
          '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: alpha(theme.palette.primary.main, 0.08)
          }
        }}
      >
        <Visibility fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/appointments/edit/${row.id}`);
        }}
        sx={{
          color: alpha(theme.palette.secondary.main, 0.7),
          '&:hover': {
            color: theme.palette.secondary.main,
            backgroundColor: alpha(theme.palette.secondary.main, 0.08)
          }
        }}
      >
        <Edit fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          console.log('Delete:', row.id);
        }}
        sx={{
          color: alpha(theme.palette.danger.main, 0.7),
          '&:hover': {
            color: theme.palette.danger.main,
            backgroundColor: alpha(theme.palette.danger.main, 0.08)
          }
        }}
      >
        <Delete fontSize="small" />
      </IconButton>
    </Box>
  );

  // Card para vista mobile
  const renderMobileCard = (cita: Appointment) => (
    <Card
      sx={{
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 3
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {cita.doctor}
          </Typography>
          <Chip
            label={cita.estado.charAt(0).toUpperCase() + cita.estado.slice(1)}
            size="small"
            sx={getEstadoColor(cita.estado)}
          />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {cita.especialidad}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {cita.fecha} - {cita.hora}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {cita.tipo}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          {renderActions(cita)}
        </Box>
      </CardContent>
    </Card>
  );

  // Header con búsqueda y botón nuevo
  const headerContent = (
    <Box sx={{ display: 'flex', gap: 2, mb: 2, flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
      <TextField
        placeholder="Search by doctor, specialty or type..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        size="small"
        sx={{ flex: 1, width: '100%' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          )
        }}
      />
      <IconButton
        color="primary"
        onClick={() => navigate('/appointments/new')}
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          borderRadius: 2,
          width: 40,
          height: 40,
          '&:hover': {
            bgcolor: 'primary.dark'
          }
        }}
      >
        <Add />
      </IconButton>
    </Box>
  );

  return (
    <>
      <DataTable
        columns={columns}
        data={filteredData}
        getRowKey={(row) => row.id}
        onRowClick={(row) => {
          setSelectedAppointment(row);
          setModalOpen(true);
        }}
        actions={renderActions}
        renderMobileCard={renderMobileCard}
        headerContent={headerContent}
      />

      <AppointmentDetailModal
        open={modalOpen}
        appointment={selectedAppointment}
        onClose={() => {
          setModalOpen(false);
          setSelectedAppointment(null);
        }}
      />
    </>
  );
}
