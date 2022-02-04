import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    background: {
      default: "#f5f5f5"
    }
  },
  typography: {
    fontFamily: [
      'Chilanka',
    ].join(','),
    button: {
      fontWeight: 500,
    },
    body1: {
      fontWeight: 500,
    },
    subtitle1: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    }
  },
});