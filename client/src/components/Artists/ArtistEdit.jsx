import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ARTIST } from '../../query/query';
import { EDIT_ARTIST } from '../../mutation/mutation';
import { Typography, Box, TextField, Button, Stack } from '@mui/material';
import Spinner from '../Spinners/Spinner.jsx';

const ArtistEdit = ({ modalClose, id }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [age, setAge] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null);

  const { data, loading } = useQuery(GET_ARTIST, {
    variables: { userId: id },
  });
  const [editArtist] = useMutation(EDIT_ARTIST);

  const handleEditArtist = async () => {
    try {
      await editArtist({
        variables: { userId: id, artist: { name, role, age, status } },
      });
      modalClose();
    } catch (e) {
      setError(e);
      console.log(error);
    }
  };

  useEffect(() => {
    if (data) {
      const artist = data.getArtist;
      setName(artist.name);
      setRole(artist.role);
      setAge(artist.age);
      setStatus(artist.status);
    }
  }, [data]);

  return (
    <Box
      component='form'
      sx={{ m: 1, minWidth: '250px', textAlign: 'center' }}
      noValidate
      autoComplete='off'
    >
      <Typography variant='h5'>Artist Edit</Typography>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <TextField
            fullWidth
            id='standard-basic'
            value={name}
            label='Name'
            variant='standard'
            margin='dense'
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            id='standard-basic'
            label='Age'
            variant='standard'
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
            <Button color='secondary' onClick={modalClose}>
              Close
            </Button>
            <Button
              variant='outlined'
              color='info'
              onClick={() => handleEditArtist()}
            >
              Save
            </Button>
          </Stack>
        </>
      )}
    </Box>
  );
};

export default ArtistEdit;
