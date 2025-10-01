import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Typography,
  Box,
  useTheme,
  alpha,
  useMediaQuery,
  Card,
  CardContent,
  Divider,
  TextField,
  InputAdornment,
  Button
} from '@mui/material';
import { Edit, Delete, Visibility, Search, Add } from '@mui/icons-material';
import AppointmentDetailModal from './AppointmentDetailModal';
import { Appointment } from '../../../types/appointment';

// Sample data
const citasData: Appointment[] = [
  {
    id: 1,
    doctor: 'Dr. García',
    fecha: '2024-01-15',
    hora: '10:00 AM',
    estado: 'confirmed',
    tipo: 'Consultation',
    especialidad: 'General Medicine',
    descripcion: 'Follow-up consultation for persistent headache.',
    cancelada: false,
    motivoRechazo: '',
    descripcionCita: '',
    examenes: []
  },
  {
    id: 2,
    doctor: 'Dr. Martínez',
    fecha: '2024-01-15',
    hora: '11:30 AM',
    estado: 'pending',
    tipo: 'Follow-up',
    especialidad: 'General Medicine',
    descripcion: 'Quarterly treatment checkup.',
    cancelada: false,
    motivoRechazo: '',
    descripcionCita: '',
    examenes: []
  },
  {
    id: 3,
    doctor: 'Dr. González',
    fecha: '2024-01-16',
    hora: '09:00 AM',
    estado: 'cancelled',
    tipo: 'Consultation',
    especialidad: 'Emergency Medicine',
    descripcion: 'Treatment for acute back pain.',
    cancelada: true,
    motivoRechazo: 'Patient cancelled due to personal inconvenience.',
    descripcionCita: '',
    examenes: []
  },
  {
    id: 4,
    doctor: 'Dr. Ortega',
    fecha: '2024-01-17',
    hora: '02:15 PM',
    estado: 'completed',
    tipo: 'Follow-up',
    especialidad: 'General Medicine',
    descripcion: 'Post-treatment review and general evaluation.',
    cancelada: false,
    motivoRechazo: '',
    descripcionCita: 'Consultation completed. Rest was indicated and blood and urine tests were requested for monitoring.',
    examenes: ['LAB_HEM', 'LAB_ORI']
  },
  {
    id: 5,
    doctor: 'Dr. Pérez',
    fecha: '2024-01-18',
    hora: '08:30 AM',
    estado: 'confirmed',
    tipo: 'Follow-up',
    especialidad: 'Dermatology',
    descripcion: 'Evaluation of skin rash.',
    cancelada: false,
    motivoRechazo: '',
    descripcionCita: '',
    examenes: []
  },
  {
    id: 6,
    doctor: 'Dr. Núñez',
    fecha: '2024-01-18',
    hora: '10:45 AM',
    estado: 'pending',
    tipo: 'Consultation',
    especialidad: 'Dentistry',
    descripcion: 'Pain in upper right molar.',
    cancelada: false,
    motivoRechazo: '',
    descripcionCita: '',
    examenes: []
  },
  {
    id: 7,
    doctor: 'Dr. Santos',
    fecha: '2024-01-19',
    hora: '01:00 PM',
    estado: 'cancelled',
    tipo: 'Consultation',
    especialidad: 'Ophthalmology',
    descripcion: 'Review for blurred vision.',
    cancelada: true,
    motivoRechazo: 'Clinic rescheduled due to equipment maintenance.',
    descripcionCita: '',
    examenes: []
  },
  {
    id: 8,
    doctor: 'Dr. Ríos',
    fecha: '2024-01-19',
    hora: '03:30 PM',
    estado: 'completed',
    tipo: 'Follow-up',
    especialidad: 'Cardiology',
    descripcion: 'Palpitations and fatigue.',
    cancelada: false,
    motivoRechazo: '',
    descripcionCita: 'Consultation completed. Electrocardiogram and stress test were requested.',
    examenes: ['CARD_ECG', 'CARD_STRESS']
  },
  {
    id: 9,
    doctor: 'Dr. López',
    fecha: '2024-01-20',
    hora: '09:15 AM',
    estado: 'confirmed',
    tipo: 'Consultation',
    especialidad: 'Nutrition',
    descripcion: 'Personalized meal plan.',
    cancelada: false,
    motivoRechazo: '',
    descripcionCita: '',
    examenes: []
  },
  {
    id: 10,
    doctor: 'Dr. Vega',
    fecha: '2024-01-20',
    hora: '11:00 AM',
    estado: 'pending',
    tipo: 'Consultation',
    especialidad: 'Physiotherapy',
    descripcion: 'Chronic lower back pain.',
    cancelada: false,
    motivoRechazo: '',
    descripcionCita: '',
    examenes: []
  },
  {
    id: 11,
    doctor: 'Dr. Ramírez',
    fecha: '2024-01-21',
    hora: '04:20 PM',
    estado: 'cancelled',
    tipo: 'Consultation',
    especialidad: 'Psychiatry',
    descripcion: 'Anxiety and sleep problems.',
    cancelada: true,
    motivoRechazo: 'Patient did not show up.',
    descripcionCita: '',
    examenes: []
  },
  {
    id: 12,
    doctor: 'Dr. Torres',
    fecha: '2024-01-21',
    hora: '05:45 PM',
    estado: 'completed',
    tipo: 'Consultation',
    especialidad: 'Gynecology',
    descripcion: 'Annual checkup.',
    cancelada: false,
    motivoRechazo: '',
    descripcionCita: 'Consultation completed. Pap smear and transvaginal ultrasound were requested.',
    examenes: ['GYN_PAP', 'GYN_TVUS']
  },
  {
    id: 13,
    doctor: 'Dr. Herrera',
    fecha: '2024-01-22',
    hora: '08:00 AM',
    estado: 'confirmed',
    tipo: 'Consultation',
    especialidad: 'Pulmonology',
    descripcion: 'Persistent cough.',
    cancelada: false,
    motivoRechazo: '',
    descripcionCita: '',
    examenes: []
  },
  {
    id: 14,
    doctor: 'Dr. Campos',
    fecha: '2024-01-22',
    hora: '10:30 AM',
    estado: 'pending',
    tipo: 'Consultation',
    especialidad: 'Rheumatology',
    descripcion: 'Joint pain.',
    cancelada: false,
    motivoRechazo: '',
    descripcionCita: '',
    examenes: []
  },
  {
    id: 15,
    doctor: 'Dr. Silva',
    fecha: '2024-01-23',
    hora: '12:00 PM',
    estado: 'completed',
    tipo: 'Follow-up',
    especialidad: 'Neurology',
    descripcion: 'Recurrent migraines.',
    cancelada: false,
    motivoRechazo: '',
    descripcionCita: 'Consultation completed. MRI and complementary analyses were requested.',
    examenes: ['NEU_MRI', 'LAB_CBC']
  }
];

export default function AppointmentsTable() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  // Estados para el modal
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // Estado para el buscador
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Funciones para manejar el modal
  const handleViewDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedAppointment(null);
  };

  // Función para filtrar citas
  const filteredCitas = citasData.filter(cita =>
    cita.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cita.especialidad.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cita.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cita.estado.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  // Vista mobile con cards
  const MobileView = () => (
    <Box sx={{ width: '100%' }}>
      {filteredCitas.length === 0 ? (
        <Box sx={{
          textAlign: 'center',
          py: 6,
          color: 'text.secondary'
        }}>
          <Search sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
          <Typography variant="h6" sx={{ mb: 1 }}>
            No appointments found
          </Typography>
          <Typography variant="body2">
            Try adjusting your search terms
          </Typography>
        </Box>
      ) : (
        filteredCitas.map((cita) => (
        <Box key={cita.id} sx={{ mb: 2 }}>
          <Card sx={{
            borderRadius: 2,
            boxShadow: 2,
            width: '100%',
            maxWidth: '100%',
            overflow: 'hidden'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {cita.doctor}
                </Typography>
                <Chip
                  label={cita.estado}
                  size="small"
                  sx={getEstadoColor(cita.estado)}
                />
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                <strong>Date:</strong> {cita.fecha} - {cita.hora}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                <strong>Specialty:</strong> {cita.especialidad}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                <strong>Type:</strong> {cita.tipo}
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <IconButton
                  sx={{
                    color: theme.palette.primary.main,
                    '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.1) }
                  }}
                  size="small"
                  onClick={() => handleViewDetails(cita)}
                >
                  <Visibility />
                </IconButton>
                <IconButton
                  sx={{
                    color: theme.palette.secondary.main,
                    '&:hover': { backgroundColor: alpha(theme.palette.secondary.main, 0.1) }
                  }}
                  size="small"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  sx={{
                    color: theme.palette.grey[600],
                    '&:hover': { backgroundColor: alpha(theme.palette.grey[600], 0.1) }
                  }}
                  size="small"
                >
                  <Delete />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Box>
        ))
      )}
    </Box>
  );

  return (
    <Box sx={{
      padding: { xs: 0, sm: 0, md: 0 },
      width: '100%',
      maxWidth: '100%'
    }}>
      {/* Header con buscador y botón */}
      <Box sx={{
        mb: 3,
        display: 'flex',
        flexDirection: { xs: 'row', sm: 'row' },
        gap: 2,
        alignItems: 'center'
      }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={isMobile ? "Search appointments..." : "Search appointments by doctor, specialty, type, or status..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            }
          }}
        />
        <Button
          variant="contained"
          sx={{
            minWidth: 56,
            width: 56,
            height: 56,
            borderRadius: 2,
            padding: 0
          }}
          onClick={() => navigate('/appointments/create')}
        >
          <Add sx={{ fontSize: 24 }} />
        </Button>
      </Box>

      {isMobile ? (
        <MobileView />
      ) : filteredCitas.length === 0 ? (
        <Box sx={{
          textAlign: 'center',
          py: 8,
          color: 'text.secondary'
        }}>
          <Search sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} />
          <Typography variant="h5" sx={{ mb: 1 }}>
            No appointments found
          </Typography>
          <Typography variant="body1">
            Try adjusting your search terms
          </Typography>
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
          <Table sx={{ minWidth: 650 }} aria-label="appointments table">
            <TableHead>
              <TableRow sx={{ backgroundColor: theme.palette.grey[100] }}>
                <TableCell><strong>Doctor</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell><strong>Time</strong></TableCell>
                <TableCell><strong>Specialty</strong></TableCell>
                <TableCell><strong>Type</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCitas.map((cita) => (
                <TableRow
                  key={cita.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.08) }
                  }}
                >
                  <TableCell>{cita.doctor}</TableCell>
                  <TableCell>{cita.fecha}</TableCell>
                  <TableCell>{cita.hora}</TableCell>
                  <TableCell>{cita.especialidad}</TableCell>
                  <TableCell>{cita.tipo}</TableCell>
                  <TableCell>
                    <Chip
                      label={cita.estado}
                      size="small"
                      sx={getEstadoColor(cita.estado)}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      sx={{
                        mr: 0.5,
                        color: theme.palette.primary.main,
                        '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.1) }
                      }}
                      size="small"
                      onClick={() => handleViewDetails(cita)}
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      sx={{
                        mr: 0.5,
                        color: theme.palette.secondary.main,
                        '&:hover': { backgroundColor: alpha(theme.palette.secondary.main, 0.1) }
                      }}
                      size="small"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      sx={{
                        color: theme.palette.grey[600],
                        '&:hover': { backgroundColor: alpha(theme.palette.grey[600], 0.1) }
                      }}
                      size="small"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <AppointmentDetailModal
        open={modalOpen}
        appointment={selectedAppointment}
        onClose={handleCloseModal}
      />
    </Box>
  );
};
