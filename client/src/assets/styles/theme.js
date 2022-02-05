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
      main: '#5f0937',
    },
  },
  typography: {
    fontFamily: [
      'system-ui',
    ].join(','),
  },
});