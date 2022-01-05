import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ARTIST } from '../../query/query';
import { Typography, Box, Grid, Button } from '@mui/material';
import Spinner from '../Spinners/Spinner.jsx';
import { getAge, getFormatedDate } from '../../utils';

const ArtistProfile = ({ id, dialogClose }) => {
  const [artist, setArtist] = useState({});
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
      <Typography variant='h6'>ARTIST PROFILE</Typography>
      {loading ? (
        <Spinner />
      ) : (
        <Grid container spacing={2} sx={{ my: 2, textAlign: 'center' }}>
          <Grid item xs={12} sm={6}>
            <Typography variant='overline'>
              First Name: {artist.firstName}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='overline'>
              Last Name: {artist.lastName}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='overline'>
              Country: {artist.country}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='overline'>Role: {artist.role}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='overline'>
              Birth Date: {getFormatedDate(artist.birthDate)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='overline'>
              Age: {getAge(artist.birthDate)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='overline'>
              Start Date: {getFormatedDate(artist.startDate)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='overline'>
              Finish Date: {getFormatedDate(artist.finishDate)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='overline'>Email: {artist.email}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='overline'>
              Phone: {artist.phoneNumber}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button variant='contained' color='secondary' onClick={dialogClose}>
              Close
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ArtistProfile;
