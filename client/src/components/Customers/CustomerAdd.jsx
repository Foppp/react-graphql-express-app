import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/client';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';


import { CREATE_CUSTOMER } from '../../mutation/mutation';

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

const CustomerAdd = ({ dialogClose, handleSnackBarOpen }) => {
  const [error, setErrors] = useState(null);
  const [addCustomer] = useMutation(CREATE_CUSTOMER);

  const handleCreateCustomer = async (customer) => {
    try {
      await addCustomer({ variables: { customer } });
      dialogClose();
      handleSnackBarOpen();
    } catch (e) {
      setErrors(e);
      console.log(error);
    }
  };

  const renderError = () => (
    <Box sx={{ my: 1 }}>
      <Typography color='error'>
        Oops! Something went wrong! Try Again!
      </Typography>
    </Box>
  );

  const formik = useFormik({
    initialValues: {
      name: '',
      country: '',
      city: '',
      email: '',
      phoneNumber: '',
      createdAt: new Date(),
    },
    validationSchema,
    onSubmit: (values) => {
      handleCreateCustomer(values);
    },
  });

  return (
    <Box
      component='form'
      sx={{ m: 1, p: 1, textAlign: 'center' }}
      noValidate
      autoComplete='off'
      onSubmit={formik.handleSubmit}
    >
      <Typography variant='h4'>Add New Customer</Typography>
      <Divider />
      {error && renderError()}
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
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            value={formik.values.name}
            onChange={formik.handleChange}
            disabled={formik.isSubmitting && !error}
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
            error={formik.touched.country && Boolean(formik.errors.country)}
            helperText={formik.touched.country && formik.errors.country}
            value={formik.values.country}
            onChange={formik.handleChange}
            disabled={formik.isSubmitting && !error}
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
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
            value={formik.values.city}
            onChange={formik.handleChange}
            disabled={formik.isSubmitting && !error}
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
            value={formik.values.email}
            onChange={formik.handleChange}
            disabled={formik.isSubmitting && !error}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
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
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            disabled={formik.isSubmitting && !error}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
          <Stack
            direction='row'
            spacing={2}
            sx={{ justifyContent: 'flex-end', m: 2 }}
          >
            <Button variant='contained' color='secondary' onClick={dialogClose}>
              Close
            </Button>
            <Button
              color='info'
              variant='contained'
              type='submit'
              disabled={formik.isSubmitting && !error}
            >
              Save
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerAdd;
