import { Button, CircularProgress, ButtonProps } from '@mui/material';
import { ReactNode } from 'react';

interface LoadingButtonProps extends Omit<ButtonProps, 'children'> {
  loading: boolean;
  children: ReactNode;
}

export default function LoadingButton({
  loading,
  children,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      {...props}
      disabled={loading || props.disabled}
    >
      {loading ? (
        <CircularProgress size={24} color="inherit" />
      ) : (
        children
      )}
    </Button>
  );
}