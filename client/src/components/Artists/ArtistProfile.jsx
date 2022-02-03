import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import IconButton from '@mui/material/IconButton';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

import getAge from '../../utils/ageCount';
import getFormatedDate from '../../utils/dateFormat';

const ArtistProfile = ({
  id,
  shows,
  artists,
  handleDialogOpen,
  setProfileOpen,
}) => {
  const [artist, setArtist] = useState(null);
  const [artistShows, setArtistShows] = useState([]);

  useEffect(() => {
    const artistById = artists.find(({ _id }) => id === _id);
    setArtist(artistById);
  }, [id, artists]);

  useEffect(() => {
    if (artist) {
      const showsById = shows.filter((show) =>
        artist.showIds.includes(show._id)
      );
      setArtistShows(showsById);
    }
  }, [artist, artists]);

  return !artist ? (
    <Box sx={{ textAlign: 'center', alignItems: 'center' }}>
      <Typography variant='h6'>Please select artist from list..!.</Typography>
    </Box>
  ) : (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <IconButton onClick={() => setProfileOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
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
      <Typography variant='body1'>Age: {getAge(artist.birthDate)}</Typography>
      <Typography variant='body1'>Email: {artist.email}</Typography>
      <Typography variant='body1'>Phone: {artist.phoneNumber}</Typography>
      <Typography variant='body1'>Role: {artist.role}</Typography>
      <Typography variant='body1'>
        Start Date: {getFormatedDate(artist.startDate)}
      </Typography>
      <Typography variant='body1'>
        Finish Date: {getFormatedDate(artist.finishDate)}
      </Typography>
      {artistShows.map((show) => (
        <Typography variant='body1' key={show._id}>
          {show.name}
        </Typography>
      ))}
    </Box>
  );
};

export default ArtistProfile;
