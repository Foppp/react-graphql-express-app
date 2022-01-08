import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useQuery } from '@apollo/client';

import { GET_ARTIST } from '../../query/query';
import BackDrop from '../Spinners/BackDrop.jsx';
import getAge from '../../utils/ageCount';
import getFormatedDate from '../../utils/dateFormat';

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

  return loading ? (
    <BackDrop backDropIsOpen={loading} />
  ) : (
    <Box
      component='form'
      sx={{ m: 1, minWidth: '250px', textAlign: 'center' }}
      noValidate
      autoComplete='off'
    >
      <Typography variant='h6'>ARTIST PROFILE</Typography>
      <Divider />
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
          <Typography variant='overline'>Country: {artist.country}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='overline'>Role: {artist.role}</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant='overline'>
            Birth Date: {getFormatedDate(artist.birthDate)}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant='overline'>
            Age: {getAge(artist.birthDate)}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant='overline'>Gender: {artist.gender}</Typography>
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
          <Divider />
          <Button
            variant='contained'
            color='secondary'
            onClick={dialogClose}
            sx={{ mt: 1 }}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ArtistProfile;
