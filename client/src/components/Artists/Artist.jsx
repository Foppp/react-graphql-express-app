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

import useStyles from '../../assets/styles/artists/artistStyles';

const Artist = ({ artist, currentId, handleOpenProfile }) => {
  const classes = useStyles(artist);

  return (
    <>
      <ListItem
        button
        selected={artist._id === currentId}
        alignItems='center'
        className={classes.root}
        secondaryAction={
          <Chip
            className={classes.chipStatus}
            variant='outlined'
            label={artist.isActive ? 'Aviable' : 'Not Aviable'}
            color={artist.isActive ? 'success' : 'error'}
            size='small'
          />
        }
        onClick={() => handleOpenProfile(artist._id)}
      >
        <Stack direction='row' spacing={2}>
          <ListItemIcon className={classes.avatar}>
            <Avatar
              alt='Remy Sharp'
              src={artist.gender === 'male' ? maleArtist : femaleArtist}
            />
          </ListItemIcon>
          <ListItemText>
            <Typography variant='subtitle1' color='primary'>
              {artist.firstName} {artist.lastName}
            </Typography>
            <Typography variant='body2' color='secondary'>
              {artist.role}
            </Typography>
          </ListItemText>
        </Stack>
        <ListItemText className={classes.chipStatus}>
          <Typography variant='body2' color='secondary'>
            {artist.country}
          </Typography>
        </ListItemText>
      </ListItem>
    </>
  );
};

export default Artist;
