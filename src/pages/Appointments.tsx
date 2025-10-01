import { Box } from '@mui/material';
import { CalendarMonth } from '@mui/icons-material';
import PageTitle from '../components/ui/PageTitle';
import AppointmentsTable from '../components/features/appointments/AppointmentsTable';

export default function Appointments() {
  return (
    <Box>
      <PageTitle
        title="Appointments"
        icon={CalendarMonth}
        subtitle="Medical appointments management"
      />
      <AppointmentsTable />
    </Box>
  );
} 