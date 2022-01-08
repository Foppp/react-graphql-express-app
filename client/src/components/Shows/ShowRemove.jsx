import React, { useState } from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
import { useMutation } from '@apollo/client';
import { REMOVE_SHOW } from '../../mutation/mutation';

const ShowRemove = ({ id, dialogClose, handleSnackBarOpen }) => {
  const [remove] = useMutation(REMOVE_SHOW);
  const [error, setError] = useState(null);

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
    <Box sx={{ m: 2, minWidth: '250px', textAlign: 'center' }}>
      <Typography variant='h5'>Are you sure ?</Typography>
      <Stack
        direction='row'
        spacing={2}
        sx={{ justifyContent: 'center', m: 2 }}
      >
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
