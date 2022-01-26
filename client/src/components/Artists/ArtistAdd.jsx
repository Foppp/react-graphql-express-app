import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useMutation, useQuery } from '@apollo/client';
import * as yup from 'yup';
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
import ruLocale from 'date-fns/locale/ru';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { CREATE_ARTIST } from '../../mutation/mutation';
import { GET_ALL_SHOWS } from '../../query/query';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const ArtistAdd = ({ dialogClose, handleSnackBarOpen }) => {
  const [shows, setShows] = useState([]);
  const [error, setErrors] = useState(null);
  const [addArtist] = useMutation(CREATE_ARTIST);
  const { data } = useQuery(GET_ALL_SHOWS);

  const handleCreateArtist = async (artist) => {
    try {
      await addArtist({ variables: { artist } });
      dialogClose();
      handleSnackBarOpen();
    } catch (e) {
      setErrors(e);
      console.log(error);
    }
  };

  useEffect(() => {
    if (data) {
      setShows(data.getShows);
    }
  }, [data]);

  const renderError = () => (
    <Box sx={{ my: 1 }}>
      <Typography color='error'>
        Oops! Something went wrong! Try Again!
      </Typography>
    </Box>
  );

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      country: '',
      role: '',
      showIds: [],
      gender: '',
      birthDate: '',
      startDate: new Date(),
      finishDate: '',
      email: '',
      phoneNumber: '',
    },
    validationSchema: yup.object({
      firstName: yup
        .string('Enter valid name')
        .min(2, 'Name should be of minimum 2 characters length')
        .required('Name is required'),
      lastName: yup
        .string('Enter valid last name')
        .min(2, 'Last name should be of minimum 2 characters length')
        .required('Last name is required'),
      country: yup
        .string('Enter valid country')
        .min(2, 'Country should be of minimum 2 characters length')
        .required('Country is required'),
      role: yup
        .string('Enter valid role')
        .min(2, 'Role should be of minimum 2 characters length')
        .required('Role is required'),
      gender: yup.string().required('Gender is required'),
      email: yup.string('Enter email').email('Enter a valid email'),
    }),
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
        <Grid item xs={12} sm={4}>
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
        <Grid item xs={12} sm={4}>
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
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
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
          <Autocomplete
            multiple
            id='checkboxes-tags-demo'
            name='showIds'
            options={shows}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.name}
              </li>
            )}
            onChange={(event, newValue) => {
              const showIds = newValue.map((show) => show._id);
              return formik.setFieldValue('showIds', showIds);
            }}
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                label='Shows'
                name='showIds'
                value={formik.values.showIds}
              />
            )}
          />
        </Grid>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
          <Grid item sm={4} xs={4}>
            <DatePicker
              mask='__.__.____'
              label='BirthDate'
              name='birthDate'
              value={formik.values.birthDate}
              disabled={formik.isSubmitting && !error}
              onChange={(newValue) =>
                formik.setFieldValue('birthDate', newValue)
              }
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item sm={4} xs={4}>
            <DatePicker
              mask='__.__.____'
              label='Start Date'
              value={formik.values.startDate}
              disabled={formik.isSubmitting && !error}
              onChange={(newValue) =>
                formik.setFieldValue('startDate', newValue)
              }
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item sm={4} xs={4}>
            <DatePicker
              mask='__.__.____'
              label='Finish Date'
              value={formik.values.finishDate}
              disabled={formik.isSubmitting && !error}
              onChange={(newValue) =>
                formik.setFieldValue('finishDate', newValue)
              }
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
        </LocalizationProvider>

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

export default ArtistAdd;
