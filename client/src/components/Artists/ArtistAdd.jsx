import React, { useState } from 'react';
import { Box, TextField, Button, Stack } from '@mui/material';
import { useMutation } from '@apollo/client';
import { CREATE_ARTIST } from '../../mutation/mutation';

const ArtistAdd = ({ modalClose }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [age, setAge] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null);
  const [addArtist] = useMutation(CREATE_ARTIST);

  // TODO : VALIDATION 
  
  const handleCreateArtist = async () => {
    try {
      await addArtist({ variables: { artist: { name, role, age, status } } });
      modalClose();
    } catch (e) {
      setError(e);
    }
  }

  return (
    <Box component='form' sx={{ m: 1 }} noValidate autoComplete='off'>
      <TextField
        fullWidth
        id='standard-basic'
        label='Name'
        variant='standard'
        margin='dense'
        defaultValue={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        fullWidth
        error={error}
        id='standard-basic'
        label='Age'
        variant='standard'
        helperText={error && 'incorrect'}
        margin='dense'
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
      />
      <TextField
        fullWidth
        id='standard-basic'
        label='Role'
        variant='standard'
        margin='dense'
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <TextField
        fullWidth
        id='standard-basic'
        label='Status'
        variant='standard'
        margin='dense'
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <Stack
        direction='row'
        spacing={2}
        sx={{ justifyContent: 'space-between', m: 2 }}
      >
        <Button color='secondary' onClick={modalClose}>Close</Button>
        <Button variant='outlined' color='info' onClick={() => handleCreateArtist()}>
          Save
        </Button>
      </Stack>
    </Box>
  );
};

export default ArtistAdd;
