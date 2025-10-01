import React from 'react';
import { Box } from '@mui/material';
import { Science } from '@mui/icons-material';
import PageTitle from '../components/ui/PageTitle';

export default function Results() {
  return (
    <Box>
      <PageTitle
        title="Results"
        icon={Science}
        subtitle="Laboratory results and medical studies"
      />
    </Box>
  );
}