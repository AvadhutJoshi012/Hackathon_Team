import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffc700', // Cyber Yellow
      light: '#ffe066',
      dark: '#e6b300',  // Cyber Yellow Hover
    },
    secondary: {
      main: '#00e5ff', // Info Cyan
      light: '#66f0ff',
      dark: '#00b5cc',
    },
    background: {
      default: '#0a0b0d', // Primary Background
      paper: '#111a22',   // Secondary Background
    },
    text: {
      primary: '#f0f2f5',   // Text Primary
      secondary: '#8f9cae', // Text Secondary
      disabled: '#536275',  // Text Muted
    },
    warning: {
      main: '#ffaa00', // Warning Amber
    },
    error: {
      main: '#ff3366', // Failure Red
    },
    info: {
      main: '#00e5ff', // Info Cyan
    },
    success: {
      main: '#00ff9d', // Success Green
    },
    divider: '#161a22', // Tertiary Background
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#111a22', // Secondary Background
          borderRadius: 12,
          border: '1px solid #161a22', // Tertiary Background
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#111a22', // Secondary Background
        },
      },
    },
  },
});

export default theme;
