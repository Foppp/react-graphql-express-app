import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

import Stack from '@mui/material/Stack';
import danceShow from '../../assets/images/showDance.png';
import useStyles from '../../assets/styles/shows/showStyles';

const Show = ({ show, currentId, handleOpenProfile }) => {
  const classes = useStyles(show);

  return (
    <>
      <ListItem
        button
        selected={show._id === currentId}
        alignItems='center'
        className={classes.root}
        secondaryAction={
          <Chip
            className={classes.chipStatus}
            variant='outlined'
            label={show.isActive ? 'Aviable' : 'Not Aviable'}
            color={show.isActive ? 'success' : 'error'}
            size='small'
          />
        }
        onClick={() => handleOpenProfile(show._id)}
      >
        <Stack direction='row' spacing={2}>
          <ListItemIcon className={classes.avatar}>
            <Avatar alt='Remy Sharp' src={danceShow} />
          </ListItemIcon>
          <ListItemText>
            <Typography variant='subtitle1' color='primary'>
              {show.name}
            </Typography>
            <Typography variant='body2' color='secondary'>
              {show.description}
            </Typography>
          </ListItemText>
        </Stack>
        <ListItemText className={classes.chipStatus}>
          <Typography variant='body2' color='secondary'>
            {show.artistIds.length} artists
          </Typography>
        </ListItemText>
      </ListItem>
    </>
  );
};

export default Show;
