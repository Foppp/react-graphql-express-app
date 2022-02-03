import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import Chip from '@mui/material/Chip';

const Artist = ({ artist, setCurrentId, currentId, setProfileOpen, profileOpen }) => {

  const handleToggleArtist = () => {
    if (currentId === artist._id) {
      setProfileOpen(!profileOpen);
    } else {
      setCurrentId(artist._id);
      setProfileOpen(true);
    }
  };

  return (
    <>
      <ListItem
        alignItems='center'
        component={Button}
        fullWidth
        sx={{
          borderRadius: 3,
          borderLeft: 5,
          borderTop: 1,
          borderBottom: 1,
          borderRight: 1,
          backgroundColor: artist._id === currentId ? '#e0e0e0' : 'inherit',
          borderLeftColor: artist.gender === 'male' ? '#3f51b5' : '#e91e63',
          borderTopColor: '#e0e0e0',
          borderBottomColor: '#e0e0e0',
          borderRightColor: '#e0e0e0',
          '&:hover': {
            backgroundColor: '#e0e0e0',
          },
          my: 1,
        }}
        secondaryAction={
          <Chip
            variant='outlined'
            label={artist.isActive ? 'Active' : 'Inactive'}
            color={artist.isActive ? 'success' : 'error'}
            size='small'
          />
        }
        onClick={handleToggleArtist}
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
    </>
  );
};

export default Artist;
