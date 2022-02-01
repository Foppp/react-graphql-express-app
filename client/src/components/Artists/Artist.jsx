import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';

const Artist = ({ artist, setCurrentId, currentId }) => {
  return (
    <>
      <ListItem
        alignItems='center'
        component={Button}
        fullWidth
        sx={{
          borderLeft: 5,
          backgroundColor: artist._id === currentId ? '#e0e0e0' : 'inherit',
          borderLeftColor: artist.gender === 'male' ? '#3f51b5' : '#e91e63',
          '&:hover': {
            backgroundColor: '#e0e0e0',
          },
        }}
        secondaryAction={
          <AlarmOnIcon color={artist.isActive ? 'success' : 'error'} />
        }
        onClick={() => setCurrentId(artist._id)}
      >
        <ListItemIcon>
          <Avatar
            sx={{
              bgcolor: artist.gender === 'male' ? '#3f51b5' : '#e91e63',
              mr: 3,
            }}
            aria-label='recipe'
          >
            {artist.gender === 'male' ? <ManIcon /> : <WomanIcon />}
          </Avatar>
        </ListItemIcon>
        <ListItemText
          sx={{ color: '#3f51b5' }}
          primary={`${artist.firstName} ${artist.lastName}`}
          secondary={
            <>
              <Typography
                sx={{ display: 'inline' }}
                component='span'
                variant='body2'
                color='text.primary'
              >
                {artist.role}
              </Typography>
            </>
          }
        />
      </ListItem>
      <Divider variant='inset' component='li' />
    </>
  );
};

export default Artist;
