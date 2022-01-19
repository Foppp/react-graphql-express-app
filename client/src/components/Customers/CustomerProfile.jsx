import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useQuery } from '@apollo/client';

import { GET_CUSTOMER} from '../../query/query';
import BackDrop from '../Spinners/BackDrop.jsx';

const CustomerProfile = ({ id, dialogClose }) => {
  const [customer, setCustomer] = useState({});
  //   const [error, setError] = useState(null);

  const { data, loading } = useQuery(GET_CUSTOMER, {
    variables: { customerId: id },
  });

  useEffect(() => {
    if (data) {
      setCustomer(data.getCustomer);
    }
  }, [data]);

  return loading ? (
    <BackDrop backDropIsOpen={loading} />
  ) : (
    <Box
      component='form'
      sx={{ m: 1, minWidth: '250px', textAlign: 'center' }}
      noValidate
      autoComplete='off'
    >
      <Typography variant='h6'>CUSTOMER PROFILE</Typography>
      <Divider />
      <Grid container spacing={2} sx={{ my: 2, textAlign: 'center' }}>
        <Grid item xs={12} sm={6}>
          <Typography variant='overline'>
            Name: {customer.name}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='overline'>Country: {customer.country}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='overline'>City: {customer.city}</Typography>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Typography variant='overline'>Email: {customer.email}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='overline'>
            Phone: {customer.phoneNumber}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
          <Button
            variant='contained'
            color='secondary'
            onClick={dialogClose}
            sx={{ mt: 1 }}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerProfile;
