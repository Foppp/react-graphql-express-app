import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

import maleArtist from '../../assets/images/maleUser.png';
import femaleArtist from '../../assets/images/femaleUser.png';
import Stack from '@mui/material/Stack';

const Artist = ({ artist, currentId, handleOpenProfile, profileOpen }) => {
  return (
    <>
      <ListItem
        button
        alignItems='center'
        selected={artist._id === currentId && profileOpen}
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          borderRadius: 3,
          borderLeft: 5,
          borderTop: 1,
          borderBottom: 1,
          borderRight: 1,
          borderLeftColor: artist.gender === 'male' ? '#3f51b5' : '#e91e63',
          borderTopColor: '#e0e0e0',
          borderBottomColor: '#e0e0e0',
          borderRightColor: '#e0e0e0',
          '&:hover': {
            backgroundColor: '#e3f2fd',
          },
          my: 1,
        }}
        secondaryAction={
          <Chip
            variant='outlined'
            label={artist.isActive ? 'Aviable' : 'Not Aviable'}
            color={artist.isActive ? 'success' : 'error'}
            size='small'
            sx={{ display: { xs: 'none', sm: 'block' } }}
          />
        }
        onClick={() => handleOpenProfile(artist._id)}
      >
        <Stack direction='row' spacing={2}>
          <ListItemIcon>
            <Avatar
              alt='Remy Sharp'
              src={artist.gender === 'male' ? maleArtist : femaleArtist}
            />
          </ListItemIcon>
          <ListItemText sx={{ color: '#3f51b5' }}>
            <Typography variant='subtitle1'>
              {artist.firstName} {artist.lastName}
            </Typography>
            <Typography variant='body2' color='text.primary'>
              {artist.role}
            </Typography>
          </ListItemText>
        </Stack>
        <ListItemText sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Typography variant='body2'>{artist.country}</Typography>
        </ListItemText>
      </ListItem>
    </>
  );
};

export default Artist;
