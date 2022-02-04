import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

import maleArtist from '../../assets/images/maleUser.png';
import femaleArtist from '../../assets/images/femaleUser.png';

import getAge from '../../utils/ageCount';
import getFormatedDate from '../../utils/dateFormat';
import { Grid } from '@mui/material';

const ArtistProfile = ({
  id,
  artists,
  handleDialogOpen,
  handleCloseProfile,
}) => {
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    const artistById = artists.find(({ _id }) => id === _id);
    setArtist(artistById);
  }, [id, artists]);

  return !artist ? (
    <Box sx={{ textAlign: 'center', alignItems: 'center' }}>
      <Typography variant='h6'>Please select artist from list..!.</Typography>
    </Box>
  ) : (
    <Box sx={{ width: '100%', textAlign: 'center' }}>
      <Box
        sx={{
          mb: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <IconButton onClick={handleCloseProfile}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Chip
          variant='outlined'
          label={artist.isActive ? 'Aviable' : 'Not Aviable'}
          color={artist.isActive ? 'success' : 'error'}
          size='small'
        />
        <Box>
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
        </Box>
      </Box>
      <Divider sx={{ mb: 3 }} variant='middle' />
      <Grid
        container
        sx={{ alignItems: 'center', justifyContent: 'space-around' }}
      >
          <Grid item lg={12} md={6}>
          {artist.gender === 'male' ? (
            <img src={maleArtist} alt='maleArtist' width='115' height='115' />
          ) : (
            <img src={femaleArtist} alt='femaleArtist' width='115' height='115' />
          )}
        </Grid>
          <Grid item lg={12} md={6}>
          <Stack
            direction='row'
            spacing={2}
            sx={{ alignItems: 'center', justifyContent: 'center' }}
          >
            <Typography variant='body1'>Name:</Typography>
            <Typography variant='body2'>
              {artist.firstName} {artist.lastName}
            </Typography>
          </Stack>

          <Stack
            direction='row'
            spacing={2}
            sx={{ alignItems: 'center', justifyContent: 'center' }}
          >
            <Typography variant='body1'>Country:</Typography>
            <Typography variant='body2'>{artist.country}</Typography>
          </Stack>

            <Stack
              direction='row'
              spacing={2}
              sx={{ alignItems: 'center', justifyContent: 'center' }}
            >
              <Typography variant='body1'>Birth Date:</Typography>
              <Typography variant='body2'>
                {getFormatedDate(artist.birthDate)}
              </Typography>
            </Stack>

            <Stack
              direction='row'
              spacing={2}
              sx={{ alignItems: 'center', justifyContent: 'center' }}
            >
              <Typography variant='body1'>Age:</Typography>
              <Typography variant='body2'>
                {getAge(artist.birthDate)}
              </Typography>
            </Stack>

            <Stack
              direction='row'
              spacing={2}
              sx={{ alignItems: 'center', justifyContent: 'center' }}
            >
              <Typography variant='body1'>Email:</Typography>
              <Typography variant='body2'>{artist.email}</Typography>
            </Stack>

            <Stack
              direction='row'
              spacing={2}
              sx={{ alignItems: 'center', justifyContent: 'center' }}
            >
              <Typography variant='body1'>Phone:</Typography>
              <Typography variant='body2'>{artist.phoneNumber}</Typography>
            </Stack>

            <Stack
              direction='row'
              spacing={2}
              sx={{ alignItems: 'center', justifyContent: 'center' }}
            >
              <Typography variant='body1'>Role:</Typography>
              <Typography variant='body2'>{artist.role}</Typography>
            </Stack>

            <Stack
              direction='row'
              spacing={2}
              sx={{ alignItems: 'center', justifyContent: 'center' }}
            >
              <Typography variant='body1'>Start Date:</Typography>
              <Typography variant='body2'>
                {getFormatedDate(artist.startDate)}
              </Typography>
            </Stack>

            <Stack
              direction='row'
              spacing={2}
              sx={{ alignItems: 'center', justifyContent: 'center' }}
            >
              <Typography variant='body1'>Finish Date:</Typography>
              <Typography variant='body2'>
                {artist.finishDate === '' ? 'Still aviable' : getFormatedDate(artist.finishDate)}
              </Typography>
            </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ArtistProfile;
