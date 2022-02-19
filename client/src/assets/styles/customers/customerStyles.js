import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    borderRadius: '20px',
    borderLeft: 'solid 5px',
    borderTop: 'solid 1px',
    borderBottom: "solid 1px",
    borderRight: 'solid 1px',
    borderLeftColor: (artist) =>
      artist.gender === 'male' ? '#3f51b5' : '#e91e63',
    borderTopColor: '#e0e0e0',
    borderBottomColor: '#e0e0e0',
    borderRightColor: '#e0e0e0',
    '&:hover': {
      backgroundColor: '#e3f2fd',
    },
    margin: '10px 0 10px 0',
  },
  infoColumn: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  avatar: {
    alignItems: 'center',
  }
}));
