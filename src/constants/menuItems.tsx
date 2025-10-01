import {
  Dashboard as DashboardIcon,
  CalendarToday,
  Science,
  LocalPharmacy
} from '@mui/icons-material';
import type { MenuItems } from '../types/menu';

export const MENU_ITEMS: MenuItems = [
  {
    text: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/dashboard',
    badge: null
  },
  {
    text: 'Appointments',
    icon: <CalendarToday />,
    path: '/appointments',
    badge: { count: 2, color: 'secondary' }
  },
  {
    text: 'Results',
    icon: <Science />,
    path: '/results',
    badge: { count: 3, color: 'secondary' }
  },
  {
    text: 'Prescriptions',
    icon: <LocalPharmacy />,
    path: '/prescriptions',
    badge: { count: 1, color: 'secondary' }
  },
];