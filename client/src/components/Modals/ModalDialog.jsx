import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

import ArtistProfile from '../Artists/ArtistProfile.jsx';
import ArtistEdit from '../Artists/ArtistEdit.jsx';
import ArtistRemove from '../Artists/ArtistRemove.jsx';
import ShowAdd from '../Shows/ShowAdd.jsx';
import ShowEdit from '../Shows/ShowEdit.jsx';
import ShowRemove from '../Shows/ShowRemove.jsx';
import ShowProfile from '../Shows/ShowProfile.jsx';
import ArtistAdd from '../Artists/ArtistAdd.jsx';

const modals = {
  artistAdd: ArtistAdd,
  artistEdit: ArtistEdit,
  artistRemove: ArtistRemove,
  artistProfile: ArtistProfile,
  showAdd: ShowAdd,
  showEdit: ShowEdit,
  showRemove: ShowRemove,
  showProfile: ShowProfile,
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalDialog = ({ dialogOpen, dialogClose, id, type }) => {
  const ModalContent = modals[type];

  return (
    <div>
      <Dialog
        fullScreen
        open={dialogOpen}
        onClose={dialogClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={dialogClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={dialogClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <ModalContent id={id} />
      </Dialog>
    </div>
  );
}

export default ModalDialog;