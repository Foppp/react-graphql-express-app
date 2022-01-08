import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

import ArtistProfile from '../Artists/ArtistProfile.jsx';
import ArtistEdit from '../Artists/ArtistEdit.jsx';
import ShowAdd from '../Shows/ShowAdd.jsx';
import ShowEdit from '../Shows/ShowEdit.jsx';
import ShowProfile from '../Shows/ShowProfile.jsx';
import ShowRemove from '../Shows/ShowRemove.jsx';
import ArtistAdd from '../Artists/ArtistAdd.jsx';
import ArtistRemove from '../Artists/ArtistRemove.jsx';

const modals = {
  artistAdd: ArtistAdd,
  artistEdit: ArtistEdit,
  artistRemove: ArtistRemove,
  artistProfile: ArtistProfile,
  showAdd: ShowAdd,
  showRemove: ShowRemove,
  showEdit: ShowEdit,
  showProfile: ShowProfile,
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalDialog = ({ dialogOpen, dialogClose, handleSnackBarOpen, id, type }) => {
  const ModalContent = modals[type];
  return (
      <Dialog
        open={dialogOpen}
        onClose={dialogClose}
        TransitionComponent={Transition}
      >
      <ModalContent id={id} dialogClose={dialogClose} handleSnackBarOpen={handleSnackBarOpen} />
      </Dialog>
  );
}

export default ModalDialog;