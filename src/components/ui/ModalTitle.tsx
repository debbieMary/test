import React from 'react';
import { DialogTitle, Box, Typography, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { SvgIconComponent } from '@mui/icons-material';

interface ModalTitleProps {
  title: string;
  icon?: SvgIconComponent;
  onClose: () => void;
  titleColor?: 'primary' | 'inherit';
}

export default function ModalTitle({
  title,
  icon: Icon,
  onClose,
  titleColor = 'inherit'
}: ModalTitleProps) {
  return (
    <DialogTitle>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: titleColor === 'primary' ? 'primary.main' : 'inherit'
          }}
        >
          {Icon && (
            <Icon
              sx={{
                fontSize: 24,
                color: 'inherit'
              }}
            />
          )}
          {title}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </Box>
    </DialogTitle>
  );
}
