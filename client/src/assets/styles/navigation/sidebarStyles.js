import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  root: (drawerWidth) => ({
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: '0',
    },
  }),
  temporaryDrawer: (drawerWidth) => ({
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
    '& .MuiDrawer-paper': {
      boxSizing: 'border-box',
      width: drawerWidth,
      paddingTop: '70px',
      backgroundColor: '#f5f5f5',
    },
  }),
  permanentDrawer: (drawerWidth) => ({
    [theme.breakpoints.down('lg')]: {
      display: 'block',
    },
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
    '& .MuiDrawer-paper': {
      boxSizing: 'border-box',
      width: drawerWidth,
      marginTop: '70px',
      margin: '0 20px 0 20px',
      paddingTop: '60px',
      borderRight: '0px',
      backgroundColor: '#f5f5f5',
    },
  }),
  mainPages: {
    marginBottom: '60px',
  },
  listItem: {
    borderRadius: '10px',
    '&:hover': {
      backgroundColor: '#ffff',
      color: theme.palette.primary.main,
    },
    margin: '10px 0 10px 0',
  },
  listIcon: {
    justifyContent: 'center',
  },
  listText: {
    alignItems: 'center',
  },
}));
