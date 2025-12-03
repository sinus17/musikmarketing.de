import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      50: '#ffffff',
      100: '#f5f5f5',
      200: '#e0e0e0',
      300: '#bdbdbd',
      400: '#9e9e9e',
      500: '#757575',
      600: '#616161',
      700: '#424242',
      800: '#212121',
      900: '#000000',
      main: '#ffffff',
      light: '#f5f5f5',
      dark: '#9e9e9e',
    },
    secondary: {
      main: '#9e9e9e',
      light: '#e0e0e0',
      dark: '#616161',
    },
    background: {
      default: '#000000',
      paper: '#000000',
    },
    text: {
      primary: '#ffffff',
      secondary: '#9e9e9e',
    },
    success: {
      main: '#ffffff',
      light: '#f5f5f5',
      dark: '#9e9e9e',
    },
    info: {
      main: '#ffffff',
      light: '#f5f5f5',
      dark: '#9e9e9e',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h1: {
      fontFamily: 'Arial, sans-serif',
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.3,
    },
    h2: {
      fontFamily: 'Arial, sans-serif',
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h3: {
      fontFamily: 'Arial, sans-serif',
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h4: {
      fontFamily: 'Arial, sans-serif',
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h5: {
      fontFamily: 'Arial, sans-serif',
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.4,
    },
    h6: {
      fontFamily: 'Arial, sans-serif',
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.4,
    },
    body1: {
      fontFamily: 'Arial, sans-serif',
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: 'Arial, sans-serif',
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      fontFamily: 'Arial, sans-serif',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          padding: '8px 16px',
          fontSize: '0.875rem',
          fontWeight: 500,
          textTransform: 'none',
          boxShadow: 'none',
          transition: 'background-color 0.2s',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          background: '#ffffff',
          color: '#000000',
          '&:hover': {
            background: '#e0e0e0',
          },
        },
        outlined: {
          borderWidth: '1px',
          borderColor: '#9e9e9e',
          color: '#ffffff',
          '&:hover': {
            borderColor: '#ffffff',
            background: 'rgba(255, 255, 255, 0.05)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          backgroundColor: '#000000',
          border: '1px solid #2a2a2a',
          boxShadow: 'none',
          transition: 'border-color 0.2s',
          '&:hover': {
            border: '1px solid #4a4a4a',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#000000',
          borderBottom: '1px solid #2a2a2a',
          boxShadow: 'none',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          '@media (min-width: 1200px)': {
            maxWidth: '1280px',
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 4,
  },
  shadows: [
    'none',
    '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 35px 60px -12px rgba(0, 0, 0, 0.3)',
    '0 0 0 1px rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    '0 0 0 1px rgba(0, 0, 0, 0.05), 0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    '0 0 0 1px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    '0 0 0 1px rgba(0, 0, 0, 0.05), 0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    '0 0 0 1px rgba(0, 0, 0, 0.05), 0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 0 0 1px rgba(0, 0, 0, 0.05), 0 35px 60px -12px rgba(0, 0, 0, 0.3)',
    '0 0 0 1px rgba(0, 0, 0, 0.05), 0 45px 70px -12px rgba(0, 0, 0, 0.35)',
    '0 0 0 1px rgba(0, 0, 0, 0.05), 0 55px 80px -12px rgba(0, 0, 0, 0.4)',
    '0 0 0 1px rgba(0, 0, 0, 0.05), 0 65px 90px -12px rgba(0, 0, 0, 0.45)',
    '0 0 0 1px rgba(0, 0, 0, 0.05), 0 75px 100px -12px rgba(0, 0, 0, 0.5)',
    '0 0 0 1px rgba(0, 0, 0, 0.05), 0 85px 110px -12px rgba(0, 0, 0, 0.55)',
    '0 0 0 1px rgba(0, 0, 0, 0.05), 0 95px 120px -12px rgba(0, 0, 0, 0.6)',
    '0 0 0 1px rgba(0, 0, 0, 0.05), 0 105px 130px -12px rgba(0, 0, 0, 0.65)',
    '0 0 0 1px rgba(0, 0, 0, 0.05), 0 115px 140px -12px rgba(0, 0, 0, 0.7)',
    '0 0 0 1px rgba(0, 0, 0, 0.05), 0 125px 150px -12px rgba(0, 0, 0, 0.75)',
    '0 0 0 1px rgba(0, 0, 0, 0.05), 0 135px 160px -12px rgba(0, 0, 0, 0.8)',
    '0 0 0 1px rgba(0, 0, 0, 0.05), 0 145px 170px -12px rgba(0, 0, 0, 0.85)',
    '0 0 0 1px rgba(0, 0, 0, 0.05), 0 155px 180px -12px rgba(0, 0, 0, 0.9)',
  ],
});

export default theme;
