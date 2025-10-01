import React from 'react';
import { Typography } from '@mui/material';

interface SubTitleProps {
  children: React.ReactNode;
  color?: 'primary' | 'inherit';
  sx?: any;
}

export default function SubTitle({
  children,
  color = 'inherit',
  sx = {}
}: SubTitleProps) {
  return (
    <Typography
      variant="subtitle1"
      sx={{
        fontWeight: 600,
        mb: 1,
        color: color === 'primary' ? 'primary.main' : 'inherit',
        ...sx
      }}
    >
      {children}
    </Typography>
  );
}