import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  TextField,
  Link,
  Alert,
  InputAdornment,
  IconButton,
  Typography
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock
} from '@mui/icons-material';
import LoadingButton from '../../ui/LoadingButton';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  loading: boolean;
  error?: string;
}

export default function LoginForm({ onSubmit, loading, error }: LoginFormProps){
  const [showPassword, setShowPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: 'admin@test.com',
      password: 'admin123'
    }
  });

  const onSubmitForm = (data: LoginFormData) => {
    onSubmit(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmitForm)} sx={{ width: '100%' }}>
      {error && (
        <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        margin="normal"
        required
        fullWidth
        label="Email"
        autoComplete="email"
        autoFocus
        disabled={loading}
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email'
          }
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email color={errors.email ? 'error' : 'action'} />
            </InputAdornment>
          ),
        }}
      />
      
      <TextField
        margin="normal"
        required
        fullWidth
        label="Password"
        type={showPassword ? 'text' : 'password'}
        autoComplete="current-password"
        disabled={loading}
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Minimum 6 characters'
          }
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock color={errors.password ? 'error' : 'action'} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                disabled={loading}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Box sx={{ textAlign: 'right', mt: 1 }}>
        <Link href="#" variant="body2" sx={{ cursor: 'pointer' }}>
          Forgot your password?
        </Link>
      </Box>

      <LoadingButton
        type="submit"
        fullWidth
        variant="contained"
        loading={loading}
        disabled={!isValid || loading}
        sx={{ mt: 3, mb: 2, py: 1.5 }}
      >
        Login
      </LoadingButton>

      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Don't have an account?{' '}
          <Link href="#" variant="body2" sx={{ cursor: 'pointer' }}>
            Sign up here
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}