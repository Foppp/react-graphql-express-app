import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import Box from '@mui/material/Box';

import useAuth from '../../hooks/index.jsx';
import Content from './Content.jsx';
import Spinner from '../../components/Spinners/Spinner.jsx';
import Sidebar from '../../components/Navigation/Sidebar.jsx';

import Appbar from '../../components/Navigation/Appbar.jsx';

import { GET_USER } from '../../query/query.js';

const drawerWidth = 180;

const Home = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const auth = useAuth();

  const handleLogout = () => {
    auth.logOut();
  };

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

  return !user ? (
    <Spinner />
  ) : (
    <Box sx={{ display: 'flex' }}>
      <Appbar user={user} handleDrawerToggle={handleDrawerToggle} />
      <Sidebar
        handleLogout={handleLogout}
        mobileOpen={mobileOpen}
        drawerWidth={drawerWidth}
        setMobileOpen={setMobileOpen}
      />
      <Content drawerWidth={drawerWidth} />
    </Box>
  );
};

export default Home;
