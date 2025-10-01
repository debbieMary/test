import React, { ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';
import ModalTitle from '../ui/ModalTitle';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  icon?: SvgIconComponent;
  titleColor?: 'primary' | 'inherit';
  children: ReactNode;
  actions?: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  showCloseButton?: boolean;
  closeButtonLabel?: string;
}

export default function Modal({
  open,
  onClose,
  title,
  icon,
  titleColor = 'inherit',
  children,
  actions,
  maxWidth = 'md',
  fullWidth = true,
  showCloseButton = true,
  closeButtonLabel = 'Close'
}: ModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      PaperProps={{
        sx: {
          borderRadius: 3,
          maxHeight: '90vh'
        }
      }}
    >
      <ModalTitle
        title={title}
        icon={icon}
        onClose={onClose}
        titleColor={titleColor}
      />

      <DialogContent sx={{ px: 2, py: 1.5 }}>
        {children}
      </DialogContent>

      {(actions || showCloseButton) && (
        <DialogActions sx={{ px: 2, py: 1.5 }}>
          {actions || (
            <Button variant="contained" onClick={onClose}>
              {closeButtonLabel}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
}
