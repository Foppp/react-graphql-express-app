import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';

import customersAvatar from '../../assets/images/customers.png';

import useStyles from '../../assets/styles/customers/customerProfileStyles';

const CustomerProfile = ({
  id,
  customers,
  handleDialogOpen,
  handleCloseProfile,
}) => {
  const [customer, setCustomer] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const customerById = customers.find(({ _id }) => id === _id);
    setCustomer(customerById);
  }, [id, customers]);

  return (
    <Box className={classes.root}>
      {!customer ? (
        <Typography variant='h6'>Please select show from list..!.</Typography>
      ) : (
        <Box>
          <Box className={classes.actions}>
            <Box>
              <IconButton onClick={handleCloseProfile}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box>
              <IconButton
                aria-label='info'
                size='small'
                color='secondary'
                onClick={() => handleDialogOpen('customerEdit', customer._id)}
              >
                <ModeEditOutlineOutlinedIcon fontSize='small' />
              </IconButton>
              <IconButton
                aria-label='info'
                size='small'
                color='error'
                onClick={() => handleDialogOpen('customerRemove', customer._id)}
              >
                <DeleteIcon fontSize='small' />
              </IconButton>
            </Box>
          </Box>
          <Divider className={classes.devider} variant='middle' />
          <Grid container className={classes.profileWrapper}>
            <Grid item lg={12} md={6}>
              <img
                src={customersAvatar}
                alt='danceShow'
                width='115'
                height='115'
              />
            </Grid>
            <Grid item lg={12} md={6}>
              <Stack
                direction='row'
                spacing={2}
                className={classes.profileContent}
              >
                <Typography variant='body1'>Customer name:</Typography>
                <Typography variant='body2'>{customer.name}</Typography>
              </Stack>

              <Stack
                direction='row'
                spacing={2}
                className={classes.profileContent}
              >
                <Typography variant='body1'>Country:</Typography>
                <Typography variant='body2'>{customer.country}</Typography>
              </Stack>

              <Stack
                direction='row'
                spacing={2}
                className={classes.profileContent}
              >
                <Typography variant='body1'>City:</Typography>
                <Typography variant='body2'>{customer.city}</Typography>
                </Stack>
                <Stack
                direction='row'
                spacing={2}
                className={classes.profileContent}
              >
                <Typography variant='body1'>Phone:</Typography>
                <Typography variant='body2'>{customer.phoneNumber}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default CustomerProfile;
