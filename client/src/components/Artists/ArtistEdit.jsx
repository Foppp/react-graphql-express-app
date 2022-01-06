import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Formik } from 'formik';
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

import { GET_ARTIST } from '../../query/query';
import { EDIT_ARTIST } from '../../mutation/mutation';
import validationSchema from '../../utils/validation';
import Spinner from '../Spinners/Spinner.jsx';

const ArtistEdit = ({ id, dialogClose }) => {
  const [artist, setArtist] = useState(null);
  const [error, setError] = useState(null);

  const { data } = useQuery(GET_ARTIST, {
    variables: { userId: id },
  });
  const [editArtist] = useMutation(EDIT_ARTIST);

  const handleEditArtist = async (artist) => {
    try {
      await editArtist({
        variables: {
          userId: id,
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
      setError(e);
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

  useEffect(() => {
    if (data) {
      setArtist(data.getArtist);
    }
  }, [data]);

  return (
    <Box sx={{ m: 1, p: 1, textAlign: 'center' }}>
      <Typography variant='h4'>Edit Artist</Typography>
      <Divider />
      {error && renderError()}
      {!artist ? (
        <Spinner />
      ) : (
        <Formik
          initialValues={{
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
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleEditArtist(values);
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    id='standard-basic'
                    label='First Name'
                    name='firstName'
                    variant='standard'
                    margin='dense'
                    error={
                      props.touched.firstName && Boolean(props.errors.firstName)
                    }
                    helperText={
                      props.touched.firstName && props.errors.firstName
                    }
                    value={props.values.firstName}
                    onChange={props.handleChange}
                    disabled={props.isSubmitting && !error}
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
                    error={
                      props.touched.lastName && Boolean(props.errors.lastName)
                    }
                    helperText={props.touched.lastName && props.errors.lastName}
                    value={props.values.lastName}
                    onChange={props.handleChange}
                    disabled={props.isSubmitting && !error}
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
                    error={
                      props.touched.country && Boolean(props.errors.country)
                    }
                    helperText={props.touched.country && props.errors.country}
                    value={props.values.country}
                    onChange={props.handleChange}
                    disabled={props.isSubmitting && !error}
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
                    error={props.touched.role && Boolean(props.errors.role)}
                    helperText={props.touched.role && props.errors.role}
                    value={props.values.role}
                    onChange={props.handleChange}
                    disabled={props.isSubmitting && !error}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl
                    variant='standard'
                    required
                    error={props.touched.gender && Boolean(props.errors.gender)}
                    fullWidth
                    disabled={props.isSubmitting && !error}
                    sx={{ m: 1 }}
                  >
                    <InputLabel id='demo-simple-select-standard-label'>
                      Gender
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-standard-label'
                      id='demo-simple-select-standard'
                      name='gender'
                      value={props.values.gender}
                      onChange={props.handleChange}
                      label='Gender'
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value='male'>Male</MenuItem>
                      <MenuItem value='female'>Female</MenuItem>
                    </Select>
                    <FormHelperText id='component-helper-text'>
                      {props.touched.gender && props.errors.gender}
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
                    value={props.values.email}
                    onChange={props.handleChange}
                    disabled={props.isSubmitting && !error}
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
                <Grid item sm={4} xs={4}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label='BirthDate'
                      name='birthDate'
                      value={props.values.birthDate}
                      disabled={props.isSubmitting && !error}
                      onChange={(newValue) =>
                        props.setFieldValue('birthDate', newValue)
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item sm={4} xs={4}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label='Start Date'
                      value={props.values.startDate}
                      disabled={props.isSubmitting && !error}
                      onChange={(newValue) =>
                        props.setFieldValue('startDate', newValue)
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item sm={4} xs={4}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label='Finish Date'
                      value={props.values.finishDate}
                      disabled={props.isSubmitting && !error}
                      onChange={(newValue) =>
                        props.setFieldValue('finishDate', newValue)
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <Stack
                    direction='row'
                    spacing={2}
                    sx={{ justifyContent: 'flex-end', m: 2 }}
                  >
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
      )}
    </Box>
  );
};

export default ArtistEdit;
