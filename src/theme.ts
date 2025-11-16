import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      50: '#e6f7f9',
      100: '#b3e9f0',
      200: '#90ddf0',
      300: '#6dd1e7',
      400: '#4ac5de',
      500: '#2c666e',
      600: '#07393c',
      700: '#052d30',
      800: '#042124',
      900: '#021518',
      main: '#90ddf0',
      light: '#90ddf0',
      dark: '#2c666e',
    },
    secondary: {
      main: '#2c666e',
      light: '#90ddf0',
      dark: '#07393c',
    },
    background: {
      default: '#0a090c',
      paper: 'rgba(10, 9, 12, 0.8)',
    },
    text: {
      primary: '#f0edee',
      secondary: '#90ddf0',
    },
    success: {
      main: '#2c666e',
      light: '#90ddf0',
      dark: '#07393c',
    },
    info: {
      main: '#90ddf0',
      light: '#90ddf0',
      dark: '#2c666e',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.2,
      '@media (min-width:600px)': {
        fontSize: '4.5rem',
      },
      '@media (min-width:900px)': {
        fontSize: '6rem',
      },
    },
    h2: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.3,
      '@media (min-width:600px)': {
        fontSize: '3rem',
      },
      '@media (min-width:900px)': {
        fontSize: '3.75rem',
      },
    },
    h3: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
      '@media (min-width:600px)': {
        fontSize: '1.875rem',
      },
    },
    h4: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h5: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.4,
    },
    h6: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.4,
    },
    body1: {
      fontFamily: '"Inter", sans-serif',
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: '"Inter", sans-serif',
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '9999px', // Full rounded
          padding: '12px 32px',
          fontSize: '1rem',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '0',
            height: '0',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.2)',
            transform: 'translate(-50%, -50%)',
            transition: 'width 0.6s, height 0.6s',
          },
          '&:hover': {
            transform: 'translateY(-4px) scale(1.05)',
            boxShadow: '0 25px 35px -5px rgba(144, 221, 240, 0.3), 0 15px 15px -5px rgba(144, 221, 240, 0.2)',
          },
          '&:hover::before': {
            width: '300px',
            height: '300px',
          },
          '&:active': {
            transform: 'translateY(-2px) scale(1.02)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #90ddf0 0%, #2c666e 100%)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(144, 221, 240, 0.3)',
          boxShadow: '0 0 20px rgba(144, 221, 240, 0.2)',
          '&:hover': {
            background: 'linear-gradient(135deg, #90ddf0 0%, #07393c 100%)',
            border: '1px solid rgba(144, 221, 240, 0.5)',
            boxShadow: '0 0 30px rgba(144, 221, 240, 0.4), 0 25px 35px -5px rgba(144, 221, 240, 0.3)',
          },
        },
        outlined: {
          borderWidth: '2px',
          borderColor: 'rgba(144, 221, 240, 0.5)',
          '&:hover': {
            borderWidth: '2px',
            borderColor: 'rgba(144, 221, 240, 0.8)',
            background: 'rgba(144, 221, 240, 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '24px',
          backgroundColor: 'rgba(10, 9, 12, 0.6)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(144, 221, 240, 0.1)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: '0 35px 60px -12px rgba(0, 0, 0, 0.6)',
            border: '1px solid rgba(144, 221, 240, 0.2)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(10, 9, 12, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(144, 221, 240, 0.1)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
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
    borderRadius: 12,
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
