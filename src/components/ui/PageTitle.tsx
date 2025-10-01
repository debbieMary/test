import React from 'react';
import { Typography, Box, useMediaQuery, useTheme } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';

interface PageTitleProps {
  title: string;
  icon?: SvgIconComponent;
  subtitle?: string;
  titleColor?: 'primary' | 'inherit';
  showIconOnMobile?: boolean;
}

export default function PageTitle({
  title,
  icon: Icon,
  subtitle,
  titleColor = 'inherit',
  showIconOnMobile = false
}: PageTitleProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const shouldShowIcon = Icon && (!isMobile || showIconOnMobile);

  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          color: titleColor === 'primary' ? 'primary.main' : 'inherit'
        }}
      >
        {shouldShowIcon && (
          <Icon
            sx={{
              fontSize: 28,
              color: 'inherit'
            }}
          />
        )}
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}