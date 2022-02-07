import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  root: (drawerWidth) => ({
    flexGrow: '1',
    padding: '30px',
    margin: '0 20px 0 20px',
    [theme.breakpoints.down('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  }),
}));
