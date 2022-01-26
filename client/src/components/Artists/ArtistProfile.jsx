import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { useQuery } from '@apollo/client';
import IconButton from '@mui/material/IconButton';
import { Box, Divider, Stack } from '@mui/material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';

import { GET_ARTIST } from '../../query/query';
import getAge from '../../utils/ageCount';
import getFormatedDate from '../../utils/dateFormat';
import Spinner from '../Spinners/Spinner.jsx';

const ArtistProfile = ({ id, artists, handleDialogOpen }) => {
  const [artist, setArtist] = useState(null);
  //   const [error, setError] = useState(null);
  // const { data, loading } = useQuery(GET_ARTIST, {
  //   variables: { userId: id },
  // });

  useEffect(() => {
    const artistById = artists.find(({ _id }) => id === _id);
      setArtist(artistById);
  }, [id]);

  return !artist ? (
    <Spinner />
  ) : (
    <Box sx={{ alignText: 'center' }}>
      <Box>
        <Stack direction='row' justifyContent='end'>
          <IconButton
            aria-label='info'
            size='small'
            color='secondary'
            onClick={() => handleDialogOpen('artistEdit', artist._id)}
          >
            <ModeEditOutlineOutlinedIcon fontSize='small' />
          </IconButton>
          <IconButton
            aria-label='info'
            size='small'
            color='error'
            onClick={() => handleDialogOpen('artistRemove', artist._id)}
          >
            <DeleteIcon fontSize='small' />
          </IconButton>
        </Stack>
      </Box>
      <Box>
        <Divider textAlign='left'>PERSONAL INFO</Divider>
        <Box sx={{ my: 1 }}>
          <Typography variant='body1'>
            Name: {artist.firstName} {artist.lastName}{' '}
            {artist.gender === 'male' ? (
              <ManIcon sx={{ color: '#3f51b5' }} />
            ) : (
              <WomanIcon sx={{ color: '#e91e63' }} />
            )}{' '}
          </Typography>
          <Typography variant='body1'>Country: {artist.country}</Typography>
          <Typography variant='body1'>
            Birth Date: {getFormatedDate(artist.birthDate)}
          </Typography>
          <Typography variant='body1'>
            Age: {getAge(artist.birthDate)}
          </Typography>
        </Box>
        <Divider textAlign='left'>WORK</Divider>
        <Box sx={{ my: 1 }}>
          <Typography variant='body1'>Role: {artist.role}</Typography>
          <Typography variant='body1'>
            Start Date: {getFormatedDate(artist.startDate)}
          </Typography>
          <Typography variant='body1'>
            Finish Date: {getFormatedDate(artist.finishDate)}
          </Typography>
        </Box>
        <Divider textAlign='left'>CONTACT</Divider>
        <Box sx={{ my: 1 }}>
          <Typography variant='body1'>Email: {artist.email}</Typography>
          <Typography variant='body1'>Phone: {artist.phoneNumber}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ArtistProfile;
