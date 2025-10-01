import { useNavigate } from 'react-router-dom';
import AppTitle from '../ui/AppTitle';
import {
  Box,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  Typography,
  Breadcrumbs,
  Link
} from '@mui/material';
import {
  Menu,
  Close,
  Logout,
  Home,
  ChevronRight
} from '@mui/icons-material';

interface TopBarProps {
  isMobile: boolean;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onLogout?: () => void;
  currentPath?: string;
}

export default function TopBar({
  isMobile,
  sidebarOpen,
  onToggleSidebar,
  onLogout,
  currentPath = '/'
}: TopBarProps) {
  const theme = useTheme();
  const navigate = useNavigate();

  const getBreadcrumbs = () => {
    const pathSegments = currentPath.split('/').filter(Boolean);

    if (currentPath === '/' || currentPath === '/dashboard') {
      return { segments: [{ label: 'Dashboard', path: '/' }] };
    }

    const segments = [{ label: 'Home', path: '/' }];

    if (pathSegments[0] === 'appointments') {
      segments.push({ label: 'Appointments', path: '/appointments' });

      if (pathSegments[1] === 'create') {
        segments.push({ label: 'Create', path: '/appointments/create' });
      } else if (pathSegments[1] === 'edit') {
        segments.push({ label: 'Edit', path: currentPath });
      }
    } else {
      const pathMap: Record<string, string> = {
        'results': 'Results',
        'recetas': 'Prescriptions',
      };

      const pageName = pathMap[pathSegments[0]] || pathSegments[0];
      segments.push({ label: pageName, path: currentPath });
    }

    return { segments };
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      navigate('/login');
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.primary',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
        zIndex: theme.zIndex.drawer + 1,
        ...(!isMobile && {
          width: `calc(100% - 280px)`,
          marginLeft: '280px',
        })
      }}
    >
      <Toolbar sx={{ minHeight: '64px !important', py: 1 }}>
        {isMobile && (
          <IconButton
            onClick={onToggleSidebar}
            sx={{
              mr: 2,
              color: 'text.primary',
              borderRadius: 2,
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'white',
                transform: 'scale(1.05)',
              }
            }}
          >
            {sidebarOpen ? <Close /> : <Menu />}
          </IconButton>
        )}

        {isMobile && <AppTitle />}

        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Breadcrumbs
              separator={<ChevronRight sx={{ fontSize: 16, color: 'text.secondary' }} />}
              sx={{
                '& .MuiBreadcrumbs-ol': {
                  alignItems: 'center',
                }
              }}
            >
              {getBreadcrumbs().segments.map((segment, index) => {
                const isLast = index === getBreadcrumbs().segments.length - 1;
                const isFirst = index === 0;

                return isLast ? (
                  <Typography
                    key={segment.path}
                    sx={{
                      color: 'text.primary',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {segment.label}
                  </Typography>
                ) : (
                  <Link
                    key={segment.path}
                    underline="hover"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: 'text.secondary',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'color 0.2s ease',
                      '&:hover': {
                        color: 'primary.main',
                      }
                    }}
                    onClick={() => navigate(segment.path)}
                  >
                    {isFirst && <Home sx={{ mr: 0.5, fontSize: 16 }} />}
                    {segment.label}
                  </Link>
                );
              })}
            </Breadcrumbs>
          </Box>
        )}

        <Box sx={{ flexGrow: 1 }} />

        <Button
          onClick={handleLogout}
          startIcon={<Logout />}
          sx={{ color: 'primary.main' }}
        >
          {isMobile ? '' : 'Logout'}
        </Button>
      </Toolbar>
    </AppBar>
  );
}