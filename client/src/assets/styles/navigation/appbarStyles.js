import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  root: {
    position: 'fixed',
    backgroundColor: '#ffff',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleIcon: {
    marginRight: '20px',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    color: 'black',
  },
  logoText: {
    [theme.breakpoints.up('xs')]: {
      display: 'none',
    },
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    color: 'black',
  },
  userWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
  },
  avatar: {
    backgroundColor: '#3f51b5',
  }
}));
