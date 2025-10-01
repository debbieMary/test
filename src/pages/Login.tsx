import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Snackbar, Alert , Box} from '@mui/material';
import LoginHeader from '../components/features/auth/LoginHeader';
import LoginForm from '../components/features/auth/LoginForm';

export default function Login(){
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (formData: { email: string; password: string }) => {
    setLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (formData.email === 'admin@test.com' && formData.password === 'admin123') {
        setSnackbarOpen(true);
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        throw new Error('Invalid credentials. Use: admin@test.com / admin123');
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'grey.100', // Aplica el color a toda el área visible
      }}
    >
      <Container 
        component="main" 
        maxWidth="sm"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'grey.100', 
        }}
      >
        <Paper
          elevation={8}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2,
            width: '100%',
            maxWidth: 400
          }}
        >
          <LoginHeader />
          <LoginForm 
            onSubmit={handleLogin}
            loading={loading}
            error={error}
          />
        </Paper>
      </Container>

      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Login successful! Redirecting to dashboard...
        </Alert>
      </Snackbar>
      </Box>
    </>
  );
}