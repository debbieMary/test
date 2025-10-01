import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Alert,
  InputAdornment
} from '@mui/material';
import {
  LocalHospital,
  Save,
  Cancel,
  Person,
  CalendarToday,
  AccessTime,
  MedicalServices,
  Description,
  Category
} from '@mui/icons-material';
import PageTitle from '../components/ui/PageTitle';
import LoadingButton from '../components/ui/LoadingButton';

const specialties = [
  'General Medicine',
  'Cardiology',
  'Dermatology',
  'Emergency Medicine',
  'Dentistry',
  'Ophthalmology',
  'Gynecology',
  'Neurology',
  'Nutrition',
  'Physiotherapy',
  'Psychiatry',
  'Pulmonology',
  'Rheumatology'
];

const appointmentTypes = [
  'Consultation',
  'Follow-up',
  'Emergency',
  'Check-up'
];

const doctors = [
  'Dr. García',
  'Dr. Martínez',
  'Dr. González',
  'Dr. Ortega',
  'Dr. Pérez',
  'Dr. Núñez',
  'Dr. Santos',
  'Dr. Ríos',
  'Dr. López',
  'Dr. Vega',
  'Dr. Ramírez',
  'Dr. Torres',
  'Dr. Herrera',
  'Dr. Campos',
  'Dr. Silva'
];

interface AppointmentFormData {
  doctor: string;
  fecha: string;
  hora: string;
  especialidad: string;
  tipo: string;
  descripcion: string;
}

export default function AppointmentForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields }
  } = useForm<AppointmentFormData>({
    mode: 'onTouched',
    defaultValues: {
      doctor: '',
      fecha: '',
      hora: '',
      especialidad: '',
      tipo: '',
      descripcion: ''
    }
  });

  const onSubmit = async (data: AppointmentFormData) => {
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // TODO: Implement actual save logic
      console.log('Saving appointment:', data);

      // Navigate back to appointments list
      navigate('/appointments');
    } catch (err) {
      setError('Failed to save appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/appointments');
  };

  return (
    <Box>
      <PageTitle
        title={isEditing ? 'Edit Appointment' : 'New Appointment'}
        icon={LocalHospital}
        subtitle={isEditing ? 'Modify appointment details' : 'Create a new medical appointment'}
      />

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
          {/* Doctor */}
          <TextField
            margin="normal"
            required
            fullWidth
            select
            label="Doctor"
            {...register('doctor', { required: 'Doctor is required' })}
            error={touchedFields.doctor && !!errors.doctor}
            helperText={touchedFields.doctor && errors.doctor?.message}
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person color={touchedFields.doctor && errors.doctor ? 'error' : 'action'} />
                </InputAdornment>
              ),
            }}
          >
            {doctors.map((doctor) => (
              <MenuItem key={doctor} value={doctor}>
                {doctor}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            margin="normal"
            required
            fullWidth
            select
            label="Specialty"
            {...register('especialidad', { required: 'Specialty is required' })}
            error={touchedFields.especialidad && !!errors.especialidad}
            helperText={touchedFields.especialidad && errors.especialidad?.message}
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MedicalServices color={touchedFields.especialidad && errors.especialidad ? 'error' : 'action'} />
                </InputAdornment>
              ),
            }}
          >
            {specialties.map((specialty) => (
              <MenuItem key={specialty} value={specialty}>
                {specialty}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            margin="normal"
            required
            fullWidth
            type="date"
            label="Date"
            {...register('fecha', { required: 'Date is required' })}
            error={touchedFields.fecha && !!errors.fecha}
            helperText={touchedFields.fecha && errors.fecha?.message}
            disabled={loading}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarToday color={touchedFields.fecha && errors.fecha ? 'error' : 'action'} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            type="time"
            label="Time"
            {...register('hora', { required: 'Time is required' })}
            error={touchedFields.hora && !!errors.hora}
            helperText={touchedFields.hora && errors.hora?.message}
            disabled={loading}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccessTime color={touchedFields.hora && errors.hora ? 'error' : 'action'} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            select
            label="Type"
            {...register('tipo', { required: 'Type is required' })}
            error={touchedFields.tipo && !!errors.tipo}
            helperText={touchedFields.tipo && errors.tipo?.message}
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Category color={touchedFields.tipo && errors.tipo ? 'error' : 'action'} />
                </InputAdornment>
              ),
            }}
          >
            {appointmentTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            margin="normal"
            required
            fullWidth
            multiline
            rows={4}
            label="Description"
            {...register('descripcion', { required: 'Description is required' })}
            error={touchedFields.descripcion && !!errors.descripcion}
            helperText={touchedFields.descripcion && errors.descripcion?.message}
            placeholder="Enter appointment description or reason..."
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 2 }}>
                  <Description color={touchedFields.descripcion && errors.descripcion ? 'error' : 'action'} />
                </InputAdornment>
              ),
            }}
          />

        {/* Action Buttons */}
        <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            onClick={handleCancel}
            disabled={loading}
            startIcon={<Cancel />}
            sx={{ py: 1.5 }}
          >
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={loading}
            disabled={!isValid || loading}
            startIcon={<Save />}
            sx={{ py: 1.5 }}
          >
            {isEditing ? 'Update' : 'Create'}
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
}