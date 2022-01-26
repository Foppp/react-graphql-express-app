import React from 'react';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button, ListItemIcon } from '@mui/material';

import ManIcon from '@mui/icons-material/Man';

import WomanIcon from '@mui/icons-material/Woman';

import { pink, indigo } from '@mui/material/colors';

const Artist = ({ artist, setCurrentId, currentId }) => {
  return (
    <>
      <ListItem
        alignItems='center'
        component={Button}
        fullWidth
        sx={{
          borderLeft: 5,
          backgroundColor: artist._id === currentId ? '#c1eff4' : 'inherit',
          borderLeftColor: artist.gender === 'male' ? indigo[500] : pink[500],
          '&:hover': {
            backgroundColor: '#c1eff4',
          },
        }}
        onClick={() => setCurrentId(artist._id)}
      >
        <ListItemIcon>
          <Avatar
            sx={{
              bgcolor: artist.gender === 'male' ? indigo[500] : pink[500],
              mr: 3,
            }}
            aria-label='recipe'
          >
            {artist.gender === 'male' ? <ManIcon /> : <WomanIcon />}
          </Avatar>
        </ListItemIcon>
        <ListItemText
          sx={{ color: indigo[500] }}
          primary={`${artist.firstName} ${artist.lastName}`}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component='span'
                variant='body2'
                color='text.primary'
              >
                {artist.role}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant='inset' component='li' />
    </>
  );
};

export default Artist;
