import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const messages = {
  artistAdd: 'Artist was added seccessfully!',
  artistEdit: 'Artist was edited seccessfully!',
  artistRemove: 'Artist was removed seccessfully!',
  showAdd: 'Show was added seccessfully!',
  showRemove: 'Show was removed seccessfully!',
  showEdit: 'Show was edited seccessfully!',
  customerAdd: 'Customer was added seccessfully!',
  customerRemove: 'Customer was removed seccessfully!',
  customerEdit: 'Customer was edited seccessfully!',
};

const SnackBar = ({ handleSnackBarClose, snackBarOpen, type }) => {
  const message = messages[type];
  const action = (
    <>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={handleSnackBarClose}
      >
        <CloseIcon fontSize='small' />
      </IconButton>
    </>
  );

  return (
    <Snackbar
      open={snackBarOpen}
      autoHideDuration={3000}
      onClose={handleSnackBarClose}
      action={action}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        onClose={handleSnackBarClose}
        severity='success'
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
