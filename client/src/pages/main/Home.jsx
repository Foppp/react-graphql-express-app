import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import TheaterComedyOutlinedIcon from '@mui/icons-material/TheaterComedyOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import CountertopsOutlinedIcon from '@mui/icons-material/CountertopsOutlined';
import Avatar from '@mui/material/Avatar';

import useAuth from '../../hooks/index.jsx';
import Content from './Content.jsx';
import Spinner from '../../components/Spinners/Spinner.jsx';

import { GET_USER } from '../../query/query.js';

const drawerWidth = 180;

const pages = [
  // {
  //   id: 1,
  //   name: 'Dashboard',
  //   path: '/dashboard',
  //   icon: <DashboardOutlinedIcon />,
  // },
  { id: 2, name: 'Artists', path: '/artists', icon: <PeopleOutlinedIcon /> },
  { id: 3, name: 'Shows', path: '/shows', icon: <TheaterComedyOutlinedIcon /> },
  {
    id: 4,
    name: 'Customers',
    path: '/customers',
    icon: <CountertopsOutlinedIcon />,
  },
];

const settings = [
  {
    id: 1,
    name: 'Account',
    path: '/account',
    icon: <ManageAccountsOutlinedIcon />,
  },
];

const Navbar = (props) => {
  const { window } = props;
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);

  const auth = useAuth();

  const { data } = useQuery(GET_USER, {
    variables: { userId: auth.loggedInUser.userId },
  });

  useEffect(() => {
    if (data) {
      setUser(data.getUser);
    }
  }, [data]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      <List sx={{ mx: 1, mb: 6 }}>
        {pages.map((page) => (
          <ListItem
            button
            key={page.id}
            component={Link}
            to={page.path}
            onClick={handleDrawerToggle}
            sx={{
              px: 0,
              borderRadius: 3,
              backgroundColor:
                location.pathname === page.path ? '#e3f2fd' : 'inherit',
              boxShadow: location.pathname === page.path ? 1 : 0,
              '&:hover': {
                backgroundColor: '#e3f2fd',
              },
              my: 1,
            }}
          >
            <ListItemIcon sx={{ justifyContent: 'center' }}>
              {page.icon}
            </ListItemIcon>
            <ListItemText sx={{ alignItems: 'center' }}>
              <Typography variant='button'>{page.name}</Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
      <Divider variant='middle' />
      <List sx={{ mx: 1 }}>
        {settings.map((menu) => (
          <ListItem
            button
            key={menu.id}
            component={Link}
            to={menu.path}
            onClick={handleDrawerToggle}
            sx={{
              px: 0,
              borderRadius: 3,
              backgroundColor:
                location.pathname === menu.path ? '#e3f2fd' : 'inherit',
              boxShadow: location.pathname === menu.path ? 1 : 0,
              '&:hover': {
                backgroundColor: '#e3f2fd',
              },
              my: 1,
            }}
          >
            <ListItemIcon sx={{ justifyContent: 'center' }}>
              {menu.icon}
            </ListItemIcon>
            <ListItemText>
            <Typography variant='button'>{menu.name}</Typography>
            </ListItemText>
          </ListItem>
        ))}
        <ListItem
          sx={{
            px: 0,
            borderRadius: 3,
            '&:hover': {
              backgroundColor: '#e3f2fd',
            },
            mt: 1,
          }}
          button
          onClick={() => auth.logOut()}
        >
          <ListItemIcon sx={{ justifyContent: 'center' }}>
            <LogoutOutlinedIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography variant='button'>Log Out</Typography>
            </ListItemText>
        </ListItem>
      </List>
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return !user ? (
    <Spinner />
  ) : (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBar position='fixed' sx={{ bgcolor: '#ffff', boxShadow: 1 }}>
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' }, color: 'black' }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant='h6'
              noWrap
              component='div'
              sx={{ color: 'black', display: { xs: 'none', sm: 'block' } }}
            >
              ENTARTAINMENT
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Typography variant='button' m={1} sx={{ color: 'black' }}>
                {user.displayName}
              </Typography>
              <Avatar sx={{ bgcolor: '#3f51b5' }}>
                {user.displayName.slice(0, 1)}
              </Avatar>
            </Box>
          </Toolbar>
        </AppBar>
        <Box
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
          aria-label='nav head'
        >
          <Drawer
            container={container}
            variant='temporary'
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'block', md: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                pt: '70px',
                bgcolor: '#f5f5f5',
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant='permanent'
            sx={{
              display: { xs: 'none', sm: 'none', md: 'flex' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                mt: '70px',
                pt: '60px',
                borderRight: '0px',
                bgcolor: '#f5f5f5',
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            p: 3,
            width: { md: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <Content />
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
