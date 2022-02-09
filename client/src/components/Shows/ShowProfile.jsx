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
import Grid from '@mui/material/Grid';

import danceShow from '../../assets/images/showDance.png';

import useStyles from '../../assets/styles/shows/showProfileStyles';

const ShowProfile = ({ id, shows, handleDialogOpen, handleCloseProfile }) => {
  const [show, setShows] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const showById = shows.find(({ _id }) => id === _id);
    setShows(showById);
  }, [id, shows]);

  return (
    <Box className={classes.root}>
      {!show ? (
        <Typography variant='h6'>Please select show from list..!.</Typography>
      ) : (
        <Box>
          <Box className={classes.actions}>
            <Box>
              <IconButton onClick={handleCloseProfile}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Chip
              variant='outlined'
              label={show.isActive ? 'Aviable' : 'Not Aviable'}
              color={show.isActive ? 'success' : 'error'}
              size='small'
            />
            <Box>
              <IconButton
                aria-label='info'
                size='small'
                color='secondary'
                onClick={() => handleDialogOpen('showEdit', show._id)}
              >
                <ModeEditOutlineOutlinedIcon fontSize='small' />
              </IconButton>
              <IconButton
                aria-label='info'
                size='small'
                color='error'
                onClick={() => handleDialogOpen('showRemove', show._id)}
              >
                <DeleteIcon fontSize='small' />
              </IconButton>
            </Box>
          </Box>
          <Divider className={classes.devider} variant='middle' />
          <Grid container className={classes.profileWrapper}>
            <Grid item lg={12} md={6}>
              <img src={danceShow} alt='danceShow' width='115' height='115' />
            </Grid>
            <Grid item lg={12} md={6}>
              <Stack
                direction='row'
                spacing={2}
                className={classes.profileContent}
              >
                <Typography variant='body1'>Show name:</Typography>
                <Typography variant='body2'>{show.name}</Typography>
              </Stack>

              <Stack
                direction='row'
                spacing={2}
                className={classes.profileContent}
              >
                <Typography variant='body1'>Artists:</Typography>
                <Typography variant='body2'>{show.artistIds.length}</Typography>
              </Stack>

              <Stack
                direction='row'
                spacing={2}
                className={classes.profileContent}
              >
                <Typography variant='body1'>Description:</Typography>
                <Typography variant='body2'>{show.description}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default ShowProfile;
