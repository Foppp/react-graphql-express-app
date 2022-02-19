import React, { useState } from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
import { useMutation } from '@apollo/client';
import { REMOVE_SHOW } from '../../mutation/mutation';

import useStyles from '../../assets/styles/shows/showRemoveStyles';

const ShowRemove = ({ id, dialogClose, handleSnackBarOpen }) => {
  const [remove] = useMutation(REMOVE_SHOW);
  const [error, setError] = useState(null);
  const classes = useStyles();

  const handleRemoveShow = async (id) => {
    try {
      await remove({ variables: { showId: id } });
      dialogClose();
      handleSnackBarOpen();
    } catch (e) {
      setError(e);
      console.log(error);
    }
  };

  return (
    <Box className={classes.root}>
      <Typography variant='h5'>Are you sure ?</Typography>
      <Stack direction='row' spacing={2} className={classes.buttons}>
        <Button color='secondary' onClick={dialogClose}>
          Close
        </Button>
        <Button
          variant='outlined'
          color='error'
          onClick={() => handleRemoveShow(id)}
        >
          Remove
        </Button>
      </Stack>
    </Box>
  );
};

export default ShowRemove;
