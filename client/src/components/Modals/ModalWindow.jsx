import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

// import ArtistProfile from "../Artists/ArtistProfile.jsx";
// import ArtistEdit from '../Artists/ArtistEdit.jsx';
// import ArtistRemove from '../Artists/ArtistRemove.jsx';
// import ShowAdd from '../Shows/ShowAdd.jsx';
// import ShowEdit from '../Shows/ShowEdit.jsx';
// import ShowRemove from '../Shows/ShowRemove.jsx';
// import ShowProfile from '../Shows/ShowProfile.jsx';
// import ModalDialogAdd from './ModalDialog.jsx';

// const modals = {
//   artistAdd: ModalDialogAdd,
//   artistEdit: ArtistEdit,
//   artistRemove: ArtistRemove,
//   artistProfile: ArtistProfile,
//   showAdd: ShowAdd,
//   showEdit: ShowEdit,
//   showRemove: ShowRemove,
//   showProfile: ShowProfile,
// };

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



const ModalWindow = ({ modalOpen, modalClose, id }) => {
  
  return (
    <div>
      <Modal
        open={modalOpen}
        onClose={modalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1>Are you sure? {id} </h1>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalWindow;
