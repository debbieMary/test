import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import TopBar from '../components/layout/TopBar';
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';

export default function AppLayout() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    navigate('/login');
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const handleNavigation = (path: string) => {
    if (isMobile) {
      closeSidebar();
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <TopBar
        isMobile={isMobile}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={toggleSidebar}
        onLogout={handleLogout}
        currentPath={location.pathname}
      />

      <Sidebar
        isDesktop={!isMobile}
        isMobileOpen={sidebarOpen}
        onMobileClose={closeSidebar}
        onNavigation={handleNavigation}
        currentPath={location.pathname}
      />

      <Box
        component="main"
        sx={{
          width: '100%',
          minHeight: '100vh',
          pt: '64px',
          backgroundColor: 'grey.100',
          display: 'flex',
          flexDirection: 'column',
          ...(!isMobile && {
            width: '100%',
            marginLeft: 0,
          })
        }}
      >
        <Box sx={{
          width: 'calc(100% - 20px)',
          minHeight: 'calc(100vh - 144px)',
          margin: '10px',
          backgroundColor: 'background.paper',
          borderRadius: 2,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          flexGrow: 1
        }}>
          <Box sx={{ p: { xs: 2, sm: 3 } }}>
            <Outlet />
          </Box>
        </Box>

        <Box
          component="footer"
          sx={{
            width: 'calc(100% - 20px)',
            display: 'flex',
            flexDirection: {
              xs: 'column',
              md: 'row'
            },
            justifyContent: {
              xs: 'center',
              md: 'space-between'
            },
            alignItems: 'center',
            p: 2,
            gap: { xs: 1, md: 0 },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} My Application. All rights reserved.
          </Typography>

          <Typography variant="caption" color="text.secondary">
            Version 1.0.0
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}