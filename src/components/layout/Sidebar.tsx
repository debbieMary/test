import { useNavigate } from 'react-router-dom';
import AppTitle from '../ui/AppTitle';
import { MENU_ITEMS } from '../../constants/menuItems';
import {
  Box,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  IconButton,
  Badge
} from '@mui/material';
import {
  Close
} from '@mui/icons-material';

interface SidebarProps {
  isDesktop: boolean;
  isMobileOpen: boolean;
  onMobileClose: () => void;
  onNavigation: (path: string) => void;
  currentPath: string;
}

export default function Sidebar({
  isDesktop,
  isMobileOpen,
  onMobileClose,
  onNavigation,
  currentPath
}: SidebarProps) {
  const theme = useTheme();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return currentPath === path || (path === '/dashboard' && currentPath === '/');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    onNavigation(path);
  };

  const renderMenuItems = () => (
    <Box sx={{ p: 2 }}>
      <List sx={{ gap: 0.5 }}>
        {MENU_ITEMS.map((item) => {
          const active = isActive(item.path);
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: 2,
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: 48,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  // Desktop: gradient and shadow for active element
                  ...(isDesktop && active && {
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                    color: 'white',
                    boxShadow: `0 4px 12px ${theme.palette.primary.main}30`,
                    transform: 'translateY(-1px)',
                  }),
                  // Desktop: inactive element
                  ...(isDesktop && !active && {
                    backgroundColor: 'transparent',
                    color: 'text.primary',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}20 0%, ${theme.palette.primary.light}15 100%)`,
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      borderRadius: 2,
                    }
                  }),
                  // Mobile: colorful side border
                  ...(!isDesktop && {
                    backgroundColor: active ? `${theme.palette.primary.main}08` : 'transparent',
                    borderLeft: active
                      ? `4px solid ${theme.palette.primary.main}`
                      : '4px solid transparent',
                    color: active ? 'primary.main' : 'text.primary',
                  }),
                  '&:hover': {
                    transform: isDesktop ? 'translateY(-2px)' : 'none',
                    ...(isDesktop && !active && {
                      '&::before': {
                        opacity: 1,
                      },
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    }),
                    ...(!isDesktop && {
                      backgroundColor: `${theme.palette.primary.main}04`,
                    })
                  },
                  py: 1.5,
                  px: 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    color: (isDesktop && active) ? 'inherit' : (active ? 'primary.main' : 'text.secondary'),
                    minWidth: 40,
                    transition: 'transform 0.2s ease',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    }
                  }}
                >
                  {item.badge ? (
                    <Badge
                      badgeContent={typeof item.badge === 'object' ? item.badge.count : item.badge}
                      color={typeof item.badge === 'object' ? item.badge.color : 'error'}
                      sx={{
                        '& .MuiBadge-badge': {
                          fontSize: '0.75rem',
                          height: 20,
                          minWidth: 20,
                          color: 'white',
                          fontWeight: '700',
                          ...(typeof (typeof item.badge === 'object' ? item.badge.count : item.badge) === 'string' && {
                            fontSize: '0.65rem',
                            padding: '0 6px',
                            minWidth: 'auto',
                            height: 18,
                          })
                        }
                      }}
                    >
                      {item.icon}
                    </Badge>
                  ) : (
                    item.icon
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    '& .MuiTypography-root': {
                      fontWeight: active ? '600' : '500',
                      fontSize: '0.95rem',
                      letterSpacing: '0.02em',
                    }
                  }}
                />
                {/* Subtle active indicator */}
                {isDesktop && active && (
                  <Box
                    sx={{
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      backgroundColor: 'white',
                      opacity: 0.8,
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  if (isDesktop) {
    return (
      <Drawer
        variant="permanent"
        sx={{
          width: 280,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 280,
            backgroundColor: 'background.paper',
            borderRight: `1px solid ${theme.palette.grey[300]}`,
            boxShadow: 'none',
            boxSizing: 'border-box',
          },
        }}
      >
        <Box sx={{ height: '64px', display: 'flex', alignItems: 'center', px: 2 }}>
          <AppTitle />
        </Box>
        {renderMenuItems()}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="temporary"
      open={isMobileOpen}
      onClose={onMobileClose}
      ModalProps={{
        keepMounted: true,
        style: { zIndex: theme.zIndex.drawer + 2 }
      }}
      sx={{
        display: { xs: 'block', md: 'none' },
        zIndex: theme.zIndex.drawer + 2,
        '& .MuiDrawer-paper': {
          width: 280,
          height: '100vh',
          backgroundColor: 'background.paper',
          boxSizing: 'border-box',
          position: 'fixed',
          top: 0,
          left: 0,
          margin: 0,
          padding: 0,
          border: 'none',
          boxShadow: '4px 0 12px rgba(0,0,0,0.15)',
        },
      }}
    >
      <Box sx={{ height: '64px', display: 'flex', alignItems: 'center', px: 2 }}>
        <Typography variant="h6" sx={{
          fontWeight: 700,
          color: 'primary.main',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          fontSize: '1.1rem',
          letterSpacing: '0.02em',
        }}>
          Menu
        </Typography>
        <IconButton
          onClick={onMobileClose}
          sx={{
            ml: 'auto',
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
          <Close />
        </IconButton>
      </Box>
      {renderMenuItems()}
    </Drawer>
  );
}