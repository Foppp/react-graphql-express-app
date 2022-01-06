import React, { useState } from 'react';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import validationSchema from '../../utils/validation';
import { useMutation } from '@apollo/client';
import { CREATE_ARTIST } from '../../mutation/mutation';

const ArtistAdd = ({ dialogClose }) => {
  const [error, setErrors] = useState(null);
  const [addArtist] = useMutation(CREATE_ARTIST);

  const handleCreateArtist = async (artist) => {
    try {
      await addArtist({
        variables: {
          artist: {
            firstName: artist.firstName,
            lastName: artist.lastName,
            country: artist.country,
            role: artist.role,
            gender: artist.gender,
            birthDate: artist.birthDate,
            startDate: artist.startDate,
            finishDate: artist.finishDate,
            email: artist.email,
            phoneNumber: artist.phoneNumber,
          },
        },
      });
      dialogClose();
    } catch (e) {
      setErrors(e);
      console.log(error);
    }
  };

  const renderError = () => (
    <Box sx={{my: 1}}>
      <Typography color="error">Oops! Something went wrong! Try Again!</Typography>
    </Box>
  );

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      country: '',
      role: '',
      gender: '',
      birthDate: '',
      startDate: '',
      finishDate: '',
      email: '',
      phoneNumber: '',
    },
    validationSchema,
    onSubmit: (values) => {
      handleCreateArtist(values);
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
      <Typography variant='h4'>Add New Artist</Typography>
      <Divider />
      {error && renderError()}
        <Grid container spacing={2} sx={{ textAlign: 'center' }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            id='standard-basic'
            label='First Name'
            name='firstName'
            variant='standard'
            margin='dense'
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            value={formik.values.firstName}
            onChange={formik.handleChange}
            disabled={formik.isSubmitting && !error}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            id='standard-basic'
            label='Last Name'
            name='lastName'
            variant='standard'
            margin='dense'
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            value={formik.values.lastName}
            onChange={formik.handleChange}
            disabled={formik.isSubmitting && !error}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
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
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            required
            id='standard-basic'
            label='Role'
            name='role'
            variant='standard'
            margin='dense'
            error={formik.touched.role && Boolean(formik.errors.role)}
            helperText={formik.touched.role && formik.errors.role}
            value={formik.values.role}
            onChange={formik.handleChange}
            disabled={formik.isSubmitting && !error}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl
            variant='standard'
            required
            error={formik.touched.gender && Boolean(formik.errors.gender)}
            fullWidth
            disabled={formik.isSubmitting && !error}
            sx={{ m: 1 }}
          >
            <InputLabel id='demo-simple-select-standard-label'>
              Gender
            </InputLabel>
            <Select
              labelId='demo-simple-select-standard-label'
              id='demo-simple-select-standard'
              name='gender'
              value={formik.values.gender}
              onChange={formik.handleChange}
              label='Gender'
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <MenuItem value='male'>Male</MenuItem>
              <MenuItem value='female'>Female</MenuItem>
            </Select>
            <FormHelperText id='component-helper-text'>
              {formik.touched.gender && formik.errors.gender}
            </FormHelperText>
          </FormControl>
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
        <Grid item sm={4} xs={4}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label='BirthDate'
              name='birthDate'
              value={formik.values.birthDate}
              disabled={formik.isSubmitting && !error}
              onChange={(newValue) =>
                formik.setFieldValue('birthDate', newValue)
              }
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item sm={4} xs={4}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label='Start Date'
              value={formik.values.startDate}
              disabled={formik.isSubmitting && !error}
              onChange={(newValue) =>
                formik.setFieldValue('startDate', newValue)
              }
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item sm={4} xs={4}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label='Finish Date'
              value={formik.values.finishDate}
              disabled={formik.isSubmitting && !error}
              onChange={(newValue) =>
                formik.setFieldValue('finishDate', newValue)
              }
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
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
            <Button color='info' variant='contained' type='submit' disabled={formik.isSubmitting && !error}>
              Save
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ArtistAdd;
