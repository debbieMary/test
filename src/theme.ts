import { createTheme, Theme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    danger: Palette['primary'];
  }

  interface PaletteOptions {
    danger?: PaletteOptions['primary'];
  }
}

// Light Theme
export const lightTheme: Theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#66bb6a', // Verde médico más claro
    },
    danger: {
      main: '#ef5350', // Rojo claro
      light: '#ffcdd2', // Rojo muy claro para backgrounds
      dark: '#c62828', // Rojo más oscuro
    },
    background: {
      default: '#f5f5f5', // gray.100
      paper: '#ffffff',   // white
    },
    text: {
      primary: '#000000', // black
      secondary: '#666666', // gray.600
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    common: {
      black: '#000000',
      white: '#ffffff',
    },
  },
});

// Dark Theme
export const darkTheme: Theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#66bb6a', // Verde médico claro para dark mode
    },
    danger: {
      main: '#ef5350', // Rojo claro
      light: '#ffcdd2', // Rojo muy claro para backgrounds
      dark: '#c62828', // Rojo más oscuro
    },
    background: {
      default: '#121212', // casi black
      paper: '#1e1e1e',   // gray.900
    },
    text: {
      primary: '#ffffff', // white
      secondary: '#b0b0b0', // gray.400
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    common: {
      black: '#000000',
      white: '#ffffff',
    },
  },
});