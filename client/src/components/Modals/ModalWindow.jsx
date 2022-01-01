import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ArtistProfile from '../Artists/ArtistProfile.jsx';
import ArtistEdit from '../Artists/ArtistEdit.jsx';
import ShowAdd from '../Shows/ShowAdd.jsx';
import ShowEdit from '../Shows/ShowEdit.jsx';
import ShowProfile from '../Shows/ShowProfile.jsx';
import ArtistAdd from '../Artists/ArtistAdd.jsx';
import ArtistRemove from '../Artists/ArtistRemove.jsx'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

const modals = {
  artistAdd: ArtistAdd,
  artistEdit: ArtistEdit,
  artistRemove: ArtistRemove,
  artistProfile: ArtistProfile,
  showAdd: ShowAdd,
  showEdit: ShowEdit,
  showProfile: ShowProfile,
};


const ModalWindow = ({ modalOpen, modalClose, id, type }) => {
  const ModalContent = modals[type];

  return (
    <div>
      <Modal
        open={modalOpen}
        onClose={modalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ModalContent id={id} modalClose={modalClose}/>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalWindow;
