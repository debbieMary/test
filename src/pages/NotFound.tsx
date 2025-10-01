import { Box, Typography, Button, Container, useTheme } from '@mui/material';
import { Home } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function NotFound(){
  const navigate = useNavigate();
  const theme = useTheme(); // ✅ Added useTheme

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          backgroundColor: 'background.default', // ✅ Uses theme background
        }}
      >
        <Typography variant="h1" color="primary.main" gutterBottom>
          404
        </Typography>
        <Typography variant="h4" color="text.primary" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          The page you are looking for does not exist.
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<Home />}
          onClick={() => navigate('/')}
          sx={{
            backgroundColor: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.dark',
            }
          }}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};
