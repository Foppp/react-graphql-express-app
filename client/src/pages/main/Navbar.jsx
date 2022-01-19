import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { indigo } from '@mui/material/colors';
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
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import CountertopsOutlinedIcon from '@mui/icons-material/CountertopsOutlined';
import Avatar from '@mui/material/Avatar';

import useAuth from '../../hooks/index.jsx';
import Content from './Content.jsx';

import { GET_USER } from '../../query/query.js';

const drawerWidth = 200;

const pages = [
  {
    id: 1,
    name: 'Dashboard',
    path: '/dashboard',
    icon: <DashboardOutlinedIcon />,
  },
  { id: 2, name: 'Artists', path: '/artists', icon: <PeopleOutlinedIcon /> },
  { id: 3, name: 'Shows', path: '/shows', icon: <TheaterComedyOutlinedIcon /> },
  { id: 4, name: 'Customers', path: '/customers', icon: <CountertopsOutlinedIcon /> },
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
  const [userName, setUserName] = useState('');
  const auth = useAuth();

  const { data } = useQuery(GET_USER, {
    variables: { userId: auth.loggedInUser.userId },
  });

  useEffect(() => {
    if (data) {
      setUserName(data.getUser.displayName);
    }
  }, [data]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ backgroundColor: '#e3f2fd', height: '100vh'}}>
      <Toolbar>
        {userName && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Avatar sx={{ bgcolor: indigo[500] }}>
              {userName.slice(0, 1)}
            </Avatar>
            <Typography variant='body2' m={1}>
              {userName}
            </Typography>
          </Box>
        )}
      </Toolbar>
      <Divider />
      <Box mt={6} >
        <List>
          {pages.map((page) => (
            <ListItem
              button
              key={page.id}
              component={Link}
              to={page.path}
              onClick={handleDrawerToggle}
              sx={{
                borderRight: location.pathname === page.path ? 3 : 'none',
              }}
            >
              <ListItemIcon>{page.icon}</ListItemIcon>
              <ListItemText primary={page.name} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {settings.map((menu) => (
            <ListItem
              button
              key={menu.id}
              component={Link}
              to={menu.path}
              onClick={handleDrawerToggle}
              sx={{ borderRight: location.pathname === menu.path ? 3 : 'none'}}
            >
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.name} />
            </ListItem>
          ))}
          <ListItem button onClick={() => auth.logOut()}>
            <ListItemIcon>
              <LogoutOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='LogOut' />
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            ENTARTAINMENT
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label='mailbox folders'
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
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
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
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Content />
      </Box>
    </Box>
  );
};

export default Navbar;
