import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

import ArtistProfile from '../Artists/ArtistProfile.jsx';
import ArtistEdit from '../Artists/ArtistEdit.jsx';
import ShowAdd from '../Shows/ShowAdd.jsx';
import ShowEdit from '../Shows/ShowEdit.jsx';
import ShowProfile from '../Shows/ShowProfile.jsx';
import ArtistAdd from '../Artists/ArtistAdd.jsx';

const modals = {
  artistAdd: ArtistAdd,
  artistEdit: ArtistEdit,
  artistProfile: ArtistProfile,
  showAdd: ShowAdd,
  showEdit: ShowEdit,
  showProfile: ShowProfile,
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalDialog = ({ dialogOpen, dialogClose, id, type }) => {
  const ModalContent = modals[type];
  console.log(dialogClose)
  return (
    <div>
      <Dialog
        open={dialogOpen}
        onClose={dialogClose}
        TransitionComponent={Transition}
      >
        <ModalContent id={id} dialogClose={dialogClose} />
      </Dialog>
    </div>
  );
}

export default ModalDialog;