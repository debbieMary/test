import React from 'react';
import { Typography, useTheme } from '@mui/material';
import { LocalHospitalSharp } from '@mui/icons-material';

export default function AppTitle() {
  const theme = useTheme(); // ✅ Correct: use useTheme hook
  
  return (
    <Typography 
      variant="h1" 
      sx={{ 
        fontWeight: 900, 
        color: theme.palette.primary.main,
        fontSize: theme.typography.h6.fontSize,
        display: 'flex',
        alignItems: 'center',
        gap: 1 
      }}
    >
      <LocalHospitalSharp /> My Application
    </Typography> 
  );
}