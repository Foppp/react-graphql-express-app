import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { REMOVE_ARTIST } from '../../mutation/mutation';
import { Box, Typography } from '@mui/material';


const ArtistRemove = ({ id, modalClose }) => {
  const [remove] = useMutation(REMOVE_ARTIST);
  const [error, setError] = useState(null);

  const handleRemoveArtist = async (id) => {
    try {
      await remove({ variables: { userId: id } });
      modalClose();
    } catch (e) {
        setError(e)
        console.log(error)
    }
  };
    
    return (
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant='h5'>Are you sure ?</Typography>
        <Stack direction='row' spacing={2} sx={{ justifyContent: 'center', m: 2 }}>
          <Button color='secondary' onClick={modalClose}>
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
}

export default ArtistRemove
