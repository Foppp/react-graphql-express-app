import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ARTIST } from '../../query/query';
import { Typography, Box } from '@mui/material';
import Spinner from '../Spinners/Spinner.jsx';

const ArtistProfile = ({ id , dialogClose}) => {
    const [artist, setArtist] = useState({});
    console.log(dialogClose)
//   const [error, setError] = useState(null);

  const { data, loading } = useQuery(GET_ARTIST, {
    variables: { userId: id },
  });

  useEffect(() => {
    if (data) {
      setArtist(data.getArtist);
    }
  }, [data]);

  return (
    <Box
      component='form'
      sx={{ m: 1, minWidth: '250px', textAlign: 'center' }}
      noValidate
      autoComplete='off'
    >
      <Typography variant='h5'>Artist Profile</Typography>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Typography>Name: {artist.name}</Typography>
          <Typography>Age: {artist.age}</Typography>
          <Typography>Role: {artist.role}</Typography>
          <Typography>Status: {artist.status}</Typography>
        </>
      )}
    </Box>
  );
};

export default ArtistProfile;
