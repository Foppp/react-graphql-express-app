import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import TheaterComedyOutlinedIcon from '@mui/icons-material/TheaterComedyOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import CountertopsOutlinedIcon from '@mui/icons-material/CountertopsOutlined';
import EventNoteIcon from '@mui/icons-material/EventNote';
import Drawer from '@mui/material/Drawer';
import useStyles from '../../assets/styles/navigation/sidebarStyles';

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
  { id: 5, name: 'Events', path: '/events', icon: <EventNoteIcon /> },
];

const settings = [
  {
    id: 1,
    name: 'Account',
    path: '/account',
    icon: <ManageAccountsOutlinedIcon />,
  },
];

const Sidebar = ({ setMobileOpen, handleLogout, mobileOpen, drawerWidth }) => {
  const location = useLocation();
  const classes = useStyles(drawerWidth);

  const drawer = (
    <>
      <List className={classes.mainPages}>
        {pages.map((page) => (
          <ListItem
            button
            className={classes.listItem}
            key={page.id}
            component={Link}
            to={page.path}
            onClick={() => setMobileOpen(false)}
            sx={{
              color: location.pathname === page.path ? 'primary.main' : 'inherit',
              backgroundColor:
                location.pathname === page.path ? '#ffff' : 'inherit',
              boxShadow: location.pathname === page.path ? 1 : 0,
            }}
          >
            <ListItemIcon
              className={classes.listIcon}
              sx={{
                color: location.pathname === page.path ? 'primary.main' : '#757575',
              }}
            >
              {page.icon}
            </ListItemIcon>
            <ListItemText className={classes.listText}>
              <Typography variant='subtitle1'>{page.name}</Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
      <Divider variant='middle' />
      <List>
        {settings.map((menu) => (
          <ListItem
            button
            className={classes.listItem}
            key={menu.id}
            component={Link}
            to={menu.path}
            onClick={() => setMobileOpen(false)}
            sx={{
              color: location.pathname === menu.path ? 'primary.main' : 'inherit',
              backgroundColor:
                location.pathname === menu.path ? '#ffff' : 'inherit',
              boxShadow: location.pathname === menu.path ? 1 : 0,
            }}
          >
            <ListItemIcon
              className={classes.listIcon}
              sx={{
                color: location.pathname === menu.path ? 'primary.main' : '#757575',
              }}
            >
              {menu.icon}
            </ListItemIcon>
            <ListItemText>
              <Typography variant='subtitle1'>{menu.name}</Typography>
            </ListItemText>
          </ListItem>
        ))}
        <ListItem className={classes.listItem} button onClick={handleLogout}>
          <ListItemIcon className={classes.listIcon}>
            <LogoutOutlinedIcon />
          </ListItemIcon>
          <ListItemText className={classes.listText}>
            <Typography variant='subtitle1'>Log Out</Typography>
          </ListItemText>
        </ListItem>
      </List>
    </>
  );
  return (
    <Box className={classes.root}>
      <Drawer
        variant='temporary'
        className={classes.temporaryDrawer}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        {drawer}
      </Drawer>
      <Drawer variant='permanent' className={classes.permanentDrawer}>
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
