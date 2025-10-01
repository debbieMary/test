import React from 'react';
import { Paper, Box, Typography, useTheme, alpha } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: SvgIconComponent;
  color?: string;
  bgColor?: string;
}

export default function StatsCard({ title, value, icon: Icon, color, bgColor }: StatsCardProps) {
  const theme = useTheme();

  const finalColor = color || theme.palette.primary.main;
  const finalBgColor = bgColor || alpha(finalColor, 0.15);

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 2,
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        justifyContent: { xs: 'center', sm: 'flex-start' },
        gap: 2,
        height: '100%',
        textAlign: { xs: 'center', sm: 'left' }
      }}
    >
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: finalBgColor,
          flexShrink: 0
        }}
      >
        <Icon sx={{ fontSize: 28, color: finalColor }} />
      </Box>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, color: finalColor }}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
      </Box>
    </Paper>
  );
}
