import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Artists from '../../components/Artists/Artists.jsx';
import Shows from '../../components/Shows/Shows.jsx';
import Dashboard from '../../components/Dashboard/Dashboard.jsx';
import Account from '../../components/Account/Account.jsx';
import ModalDialog from '../../components/Modals/ModalDialog.jsx';

const menuContent = {
  dashboard: Dashboard,
  artists: Artists,
  shows: Shows,
  account: Account,
};

const Content = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [currentId, setCurrentId] = useState(null);

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
  const ContentComponent = menuContent[content] ?? Dashboard;

  useEffect(() => {
    if (!content) navigate('/dashboard');
  }, []);

  return (
    <Box component='main' sx={{ p: 3 }}>
      <ContentComponent
        dialogOpen={dialogOpen}
        setModalType={setModalType}
        handleDialogOpen={handleDialogOpen}
        dialogClose={dialogClose}
        id={currentId}
      />
      {dialogOpen && (
        <ModalDialog
          dialogOpen={dialogOpen}
          dialogClose={dialogClose}
          type={modalType}
          id={currentId}
        />
      )}
    </Box>
  );
};

export default Content;
