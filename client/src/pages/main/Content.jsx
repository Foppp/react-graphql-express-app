import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Artists from '../../components/Artists/Artists.jsx';
import Shows from '../../components/Shows/Shows.jsx';
import Dashboard from '../../components/Dashboard/Dashboard.jsx';
import Account from '../../components/Account/Account.jsx';
// import ModalDialog from '../../components/Modals/ModalDialog.jsx';
import ModalWindow from '../../components/Modals/ModalWindow.jsx';

const menuContent = {
  dashboard: Dashboard,
  artists: Artists,
  shows: Shows,
  account: Account,
};

const Content = () => {
  // const [dialogOpen, setDialogOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [currentId, setCurrentId] = useState(null);

  // const handleDialogOpen = (type, id = null) => {
  //   setModalDialogType(type);
  //   setCurrentId(id);
  //   setDialogOpen(true);
  // };

  // const dialogClose = () => {
  //   setDialogOpen(false);
  // };

  const handleModalOpen = (type, id = null) => {
    setModalType(type);
    setCurrentId(id);
    setModalOpen(true);
  };

  const modalClose = () => {
    setModalOpen(false);
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
        // dialogOpen={dialogOpen}
        setModalType={setModalType}
        handleModalOpen={handleModalOpen}
        modalClose={modalClose}
        // dialogClose={dialogClose}
        id={currentId}
      />
      {/* {modalDialogType && (
        <ModalDialog
          dialogOpen={dialogOpen}
          handleDialogOpen={handleDialogOpen}
          dialogClose={dialogClose}
          type={modalDialogType}
          id={currentId}
        />
      )} */}
      {modalType && (
        <ModalWindow
          modalOpen={modalOpen}
          modalClose={modalClose}
          type={modalType}
          id={currentId}
        />
      )}
    </Box>
  );
};

export default Content;
