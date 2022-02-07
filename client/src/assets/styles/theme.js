import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    background: {
      default: "#f5f5f5"
    },
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#ba68c8',
    },
    success: {
      main: '#1b5e20',
    },
    error: {
      main: '#b71c1c',
    }
  },
  typography: {
    fontFamily: [
      'system-ui',
    ].join(','),
  },
});