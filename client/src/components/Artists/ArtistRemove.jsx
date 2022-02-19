import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { useMutation } from '@apollo/client';
import { REMOVE_ARTIST } from '../../mutation/mutation';

import useStyles from '../../assets/styles/artists/artistRemoveStyles';

const ArtistRemove = ({ id, dialogClose, handleSnackBarOpen, setCurrentId }) => {
  const [remove] = useMutation(REMOVE_ARTIST);
  const [error, setError] = useState(null);
  const classes = useStyles();

  const handleRemoveArtist = async (id) => {
    try {
      await remove({ variables: { userId: id } });
      dialogClose();
      handleSnackBarOpen();
      setCurrentId(null);
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
          onClick={() => handleRemoveArtist(id)}
        >
          Remove
        </Button>
      </Stack>
    </Box>
  );
};

export default ArtistRemove;
