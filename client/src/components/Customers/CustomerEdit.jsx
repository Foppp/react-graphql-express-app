import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import BackDrop from '../Spinners/BackDrop.jsx';

import useStyles from '../../assets/styles/customers/customerAddEditStyles';

import { EDIT_CUSTOMER } from '../../mutation/mutation';

const validationSchema = yup.object({
  name: yup
    .string('Enter valid name')
    .min(2, 'Name should be of minimum 2 characters length')
    .required('Name is required'),
  country: yup
    .string('Enter valid country')
    .min(2, 'Country should be of minimum 2 characters length')
    .required('Country is required'),
  city: yup
    .string('Enter valid city')
    .min(2, 'Role should be of minimum 2 characters length')
    .required('City is required'),
  email: yup.string('Enter email').email('Enter a valid email'),
});

const CustomerEdit = ({ id, dialogClose, handleSnackBarOpen, customers }) => {
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null);
  const [editCustomer] = useMutation(EDIT_CUSTOMER);
  const classes = useStyles();

  useEffect(() => {
    if (customers) {
      const customerById = customers.find(({ _id }) => id === _id);
      setCustomer(customerById);
    }
  }, [customers]);

  const handleEditCustomer = async (customer) => {
    try {
      await editCustomer({ variables: { customerId: id, customer } });
      dialogClose();
      handleSnackBarOpen();
    } catch (e) {
      setError(e);
      console.log(error);
    }
  };

  const renderError = () => (
    <Box className={classes.errorMessage}>
      <Typography color='error'>
        Oops! Something went wrong! Try Again!
      </Typography>
    </Box>
  );

  return !customer ? (
    <BackDrop backDropIsOpen={!customer} />
  ) : (
    <Box className={classes.root}>
      <Typography variant='h4'>Edit Artist</Typography>
      <Divider />
      {error && renderError()}
      <Formik
        initialValues={{
          name: customer.name,
          country: customer.country,
          city: customer.city,
          email: customer.email,
          phoneNumber: customer.phoneNumber,
          createdAt: customer.createdAt,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleEditCustomer(values);
        }}
      >
        {(props) => (
          <Box
            component='form'
            noValidate
            autoComplete='off'
            onSubmit={props.handleSubmit}
          >
            <Grid container spacing={2} sx={{ textAlign: 'center' }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id='standard-basic'
                  label='Name'
                  name='name'
                  variant='standard'
                  margin='dense'
                  error={props.touched.name && Boolean(props.errors.name)}
                  helperText={props.touched.name && props.errors.name}
                  value={props.values.name}
                  onChange={props.handleChange}
                  disabled={props.isSubmitting && !error}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  id='standard-basic'
                  label='Country'
                  name='country'
                  variant='standard'
                  margin='dense'
                  error={props.touched.country && Boolean(props.errors.country)}
                  helperText={props.touched.country && props.errors.country}
                  value={props.values.country}
                  onChange={props.handleChange}
                  disabled={props.isSubmitting && !error}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  id='standard-basic'
                  label='City'
                  name='city'
                  variant='standard'
                  margin='dense'
                  error={props.touched.city && Boolean(props.errors.city)}
                  helperText={props.touched.city && props.errors.city}
                  value={props.values.city}
                  onChange={props.handleChange}
                  disabled={props.isSubmitting && !error}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id='standard-basic'
                  label='Email'
                  name='email'
                  variant='standard'
                  margin='dense'
                  value={props.values.email}
                  onChange={props.handleChange}
                  disabled={props.isSubmitting && !error}
                  error={props.touched.email && Boolean(props.errors.email)}
                  helperText={props.touched.email && props.errors.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id='standard-basic'
                  label='Phone'
                  name='phoneNumber'
                  variant='standard'
                  margin='dense'
                  value={props.values.phoneNumber}
                  onChange={props.handleChange}
                  disabled={props.isSubmitting && !error}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider />
                <Stack direction='row' spacing={2} className={classes.buttons}>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={dialogClose}
                  >
                    Close
                  </Button>
                  <Button
                    color='info'
                    variant='contained'
                    type='submit'
                    disabled={props.isSubmitting && !error}
                  >
                    Save
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default CustomerEdit;
