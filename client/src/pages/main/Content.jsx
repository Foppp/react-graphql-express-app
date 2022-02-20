import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import Artists from '../../components/Artists/Artists.jsx';
import Shows from '../../components/Shows/Shows.jsx';
import ShowEvents from '../../components/ShowEvents/ShowEvents.jsx';
import Dashboard from '../../components/Dashboard/Dashboard.jsx';
import Account from '../../components/Account/Account.jsx';
import ModalDialog from '../../components/Modals/ModalDialog.jsx';
import SnackBar from '../../components/Modals/SnackBar.jsx';
import Customers from '../../components/Customers/Customers.jsx';
import Toolbar from '@mui/material/Toolbar';

import useStyles from '../../assets/styles/content/contentStyles';
import sortByNewest from '../../utils/sort.js';
import getAge from '../../utils/ageCount';

import {
  GET_ALL_ARTISTS,
  GET_ALL_SHOWS,
  GET_ALL_CUSTOMERS,
} from '../../query/query';

const menuContent = {
  dashboard: Dashboard,
  artists: Artists,
  shows: Shows,
  customers: Customers,
  events: ShowEvents,
  account: Account,
};

const Content = ({ drawerWidth }) => {
  const classes = useStyles(drawerWidth);
  const [artists, setArtists] = useState(null);
  const [shows, setShows] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [, setFetchError] = useState(null);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const navigate = useNavigate();
  const { content } = useParams();
  const ContentComponent = menuContent[content] ?? Artists;

  const {
    data: artistsData,
    error: artistsError,
    refetch: artistsRefetch,
  } = useQuery(GET_ALL_ARTISTS);
  const {
    data: showsData,
    error: showsError,
    refetch: showsRefetch,
  } = useQuery(GET_ALL_SHOWS);

  const {
    data: customersData,
    error: customersError,
    refetch: customersRefetch,
  } = useQuery(GET_ALL_CUSTOMERS);

  const handleSnackBarOpen = () => {
    setSnackBarOpen(true);
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarOpen(false);
  };

  const handleDialogOpen = (type, id = null) => {
    setModalType(type);
    setCurrentId(id);
    setDialogOpen(true);
  };

  const dialogClose = () => {
    setDialogOpen(false);
    artistsRefetch();
    showsRefetch();
    customersRefetch();
  };

  useEffect(() => {
    if (artistsData) {
      const updatedData = artistsData.getArtists.map((artist) => {
        const isActive = artist.finishDate === '';
        const age = getAge(artist.birthDate);
        return { ...artist, isActive, age };
      });
      setArtists(sortByNewest(updatedData));
    }
  }, [artistsData]);

  useEffect(() => {
    if (showsData) {
      const updatedData = showsData.getShows.map((show) => {
        const isActive = show.finishDate === '';
        return { ...show, isActive };
      });
      setShows(sortByNewest(updatedData));
    }
  }, [showsData]);

  useEffect(() => {
    if (customersData) {
      const sortedCustomerList = sortByNewest(customersData.getCustomers);
      setCustomers(sortedCustomerList);
    }
  }, [customersData]);

  useEffect(() => {
    if (artistsError) {
      setFetchError(artistsError);
      console.log(artistsError);
    }
    if (showsError) {
      setFetchError(showsError);
      console.log(showsError);
    }
    if (customersError) {
      setFetchError(customersError);
      console.log(customersError);
    }
  }, [artistsError]);

  useEffect(() => {
    if (!content) navigate('/artists');
  }, []);

  return (
    <Box component='main' className={classes.root}>
      <Toolbar />
      <ContentComponent
        dialogOpen={dialogOpen}
        snackBarOpen={snackBarOpen}
        setModalType={setModalType}
        handleDialogOpen={handleDialogOpen}
        dialogClose={dialogClose}
        handleSnackBarClose={handleSnackBarClose}
        handleSnackBarOpen={handleSnackBarOpen}
        type={modalType}
        id={currentId}
        setCurrentId={setCurrentId}
        artists={artists}
        shows={shows}
        customers={customers}
      />
      {dialogOpen && (
        <ModalDialog
          dialogOpen={dialogOpen}
          handleSnackBarOpen={handleSnackBarOpen}
          dialogClose={dialogClose}
          type={modalType}
          id={currentId}
          setCurrentId={setCurrentId}
          artists={artists}
          shows={shows}
          customers={customers}
        />
      )}
      {snackBarOpen && (
        <SnackBar
          snackBarOpen={snackBarOpen}
          handleSnackBarClose={handleSnackBarClose}
          type={modalType}
        />
      )}
    </Box>
  );
};

export default Content;
