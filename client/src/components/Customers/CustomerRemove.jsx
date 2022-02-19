import React, { useState } from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
import { useMutation } from '@apollo/client';
import { REMOVE_CUSTOMER } from '../../mutation/mutation';

import useStyles from '../../assets/styles/artists/artistRemoveStyles';

const CustomerRemove = ({ id, dialogClose, handleSnackBarOpen, setCurrentId }) => {
  const [remove] = useMutation(REMOVE_CUSTOMER);
  const [error, setError] = useState(null);
  const classes = useStyles();

  const handleRemoveCustomer = async (id) => {
    try {
      await remove({ variables: { customerId: id } });
      dialogClose();
      handleSnackBarOpen();
      setCurrentId(null);
    } catch (e) {
      setError(e);
      console.log(error);
    }
  };

  return (
    <Box className={classes.root}>
      <Typography variant='h5'>Are you sure ?</Typography>
      <Stack direction='row' spacing={2} className={classes.buttons}>
        <Button color='secondary' onClick={dialogClose}>
          Close
        </Button>
        <Button
          variant='outlined'
          color='error'
          onClick={() => handleRemoveCustomer(id)}
        >
          Remove
        </Button>
      </Stack>
    </Box>
  );
};

export default CustomerRemove;
