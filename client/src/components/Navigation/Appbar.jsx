import React from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

import useStyles from '../../assets/styles/navigation/appbarStyles';

const Appbar = ({ handleDrawerToggle, user }) => {
  const classes = useStyles();

  return (
    <AppBar className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          edge='start'
          onClick={handleDrawerToggle}
          className={classes.toggleIcon}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          className={classes.logoText}
          variant='h6'
          noWrap
          component='div'
        >
          ENTARTAINMENT
        </Typography>
        <Box className={classes.userWrapper}>
          <Typography variant='button' m={1} color='primary'>
            {user.displayName}
          </Typography>
          <Avatar className={classes.avatar}>
            {user.displayName.slice(0, 1)}
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
