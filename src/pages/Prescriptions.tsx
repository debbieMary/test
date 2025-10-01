import React from 'react';
import { Box } from '@mui/material';
import { LocalPharmacy } from '@mui/icons-material';
import PageTitle from '../components/ui/PageTitle';

export default function Prescriptions() {
  return (
    <Box>
      <PageTitle
        title="Prescriptions"
        icon={LocalPharmacy}
        subtitle="Prescription and medication management"
      />
    </Box>
  );
}