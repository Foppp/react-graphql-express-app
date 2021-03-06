import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
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
import BackDrop from '../Spinners/BackDrop.jsx';

import useStyles from '../../assets/styles/artists/artistAddEditStyles';

import { EDIT_ARTIST } from '../../mutation/mutation';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const getValuesById = (ids, data) =>
  data.filter((value) => ids.includes(value._id));

const validationSchema = yup.object({
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
});

const ArtistEdit = ({
  id,
  artists,
  shows,
  dialogClose,
  handleSnackBarOpen,
}) => {
  const classes = useStyles();
  const [artist, setArtist] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (artists) {
      const artistById = artists.find(({ _id }) => id === _id);
      setArtist(artistById);
    }
  }, [artists]);

  const [editArtist] = useMutation(EDIT_ARTIST);

  const handleEditArtist = async (artist) => {
    try {
      await editArtist({ variables: { userId: id, artist } });
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

  return !artist ? (
    <BackDrop backDropIsOpen={!artist} />
  ) : (
    <Box className={classes.root}>
      <Typography variant='h4'>Edit Artist</Typography>
      <Divider />
      {error && renderError()}
      <Formik
        initialValues={{
          firstName: artist.firstName,
          lastName: artist.lastName,
          country: artist.country,
          role: artist.role,
          showIds: artist.showIds,
          gender: artist.gender,
          birthDate: artist.birthDate,
          startDate: artist.startDate,
          finishDate: artist.finishDate,
          email: artist.email,
          phoneNumber: artist.phoneNumber,
          createdAt: artist.createdAt,
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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
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
                  helperText={props.touched.firstName && props.errors.firstName}
                  value={props.values.firstName}
                  onChange={props.handleChange}
                  disabled={props.isSubmitting && !error}
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
              <Grid item xs={12} sm={6}>
                <FormControl
                  variant='standard'
                  required
                  error={props.touched.gender && Boolean(props.errors.gender)}
                  fullWidth
                  disabled={props.isSubmitting && !error}
                >
                  <InputLabel id='demo-simple-select-standard-label'>
                    Gender
                  </InputLabel>
                  <Select
                    className={classes.genderInput}
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
                    return props.setFieldValue('showIds', showIds);
                  }}
                  fullWidth
                  value={getValuesById(props.values.showIds, shows)}
                  renderInput={(params) => (
                    <TextField {...params} label='Shows' name='showIds' />
                  )}
                />
              </Grid>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                locale={ruLocale}
              >
                <Grid item sm={4} xs={4}>
                  <DatePicker
                    mask='__.__.____'
                    label='BirthDate'
                    name='birthDate'
                    value={props.values.birthDate}
                    disabled={props.isSubmitting && !error}
                    onChange={(newValue) =>
                      props.setFieldValue('birthDate', newValue ?? '')
                    }
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
                <Grid item sm={4} xs={4}>
                  <DatePicker
                    mask='__.__.____'
                    label='Start Date'
                    value={props.values.startDate}
                    disabled={props.isSubmitting && !error}
                    onChange={(newValue) =>
                      props.setFieldValue('startDate', newValue ?? '')
                    }
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
                <Grid item sm={4} xs={4}>
                  <DatePicker
                    mask='__.__.____'
                    label='Finish Date'
                    value={props.values.finishDate}
                    disabled={props.isSubmitting && !error}
                    onChange={(newValue) =>
                      props.setFieldValue('finishDate', newValue ?? '')
                    }
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
              </LocalizationProvider>
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

export default ArtistEdit;
