import { Typography, Avatar } from '@mui/material';
import { AccountBox, AccountCircle } from '@mui/icons-material';

export default function LoginHeader(){
  return (
    <>
      <Avatar sx={{
        bgcolor: 'primary.main',
        width: 60,
        height: 60,
        mb: 2
      }}>
        <AccountBox sx={{ fontSize: 40 }} />
      </Avatar>
      
      <Typography component="h1" variant="h4" gutterBottom>
        Login
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Welcome back
      </Typography>
    </>
  );
}