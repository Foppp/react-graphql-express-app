import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Artists from '../../components/Artists/Artists.jsx';
import Shows from '../../components/Shows/Shows.jsx';
import Dashboard from '../../components/Dashboard/Dashboard.jsx';
import Account from '../../components/Account/Account.jsx';
import ModalDialog from '../../components/Modals/ModalDialog.jsx';
import SnackBar from '../../components/Modals/SnackBar.jsx';
import Customers from '../../components/Customers/Customers.jsx';

const menuContent = {
  dashboard: Dashboard,
  artists: Artists,
  shows: Shows,
  customers: Customers,
  account: Account,
};

const Content = () => {
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [currentId, setCurrentId] = useState(null);

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
  };


  const navigate = useNavigate();
  const { content } = useParams();
  const ContentComponent = menuContent[content] ?? Artists;

  useEffect(() => {
    if (!content) navigate('/artists');
  }, []);

  return (
    <Box component='main'>
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
      />
      {dialogOpen && (
        <ModalDialog
          dialogOpen={dialogOpen}
          handleSnackBarOpen={handleSnackBarOpen}
          dialogClose={dialogClose}
          type={modalType}
          id={currentId}
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
