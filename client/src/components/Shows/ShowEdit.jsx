import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Formik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import useStyles from '../../assets/styles/shows/showAddEditStyles';

import BackDrop from '../Spinners/BackDrop.jsx';

import { EDIT_SHOW } from '../../mutation/mutation';
import { GET_ALL_ARTISTS } from '../../query/query';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const validationSchema = yup.object({
  name: yup
    .string('Enter valid name')
    .min(2, 'Name should be of minimum 2 characters length')
    .required('Name is required'),
});

const getValuesById = (ids, data) =>
  data.filter((value) => ids.includes(value._id));

const ShowEdit = ({ dialogClose, id, handleSnackBarOpen, shows }) => {
  const [error, setError] = useState(null);
  const [artists, setArtists] = useState([]);
  const [show, setShow] = useState(null);
  const classes = useStyles();

  const [editShow] = useMutation(EDIT_SHOW);
  const { data } = useQuery(GET_ALL_ARTISTS);

  useEffect(() => {
    if (data) {
      setArtists(data.getArtists);
    }
  }, [data]);

  useEffect(() => {
    if (shows) {
      const showsById = shows.find(({ _id }) => id === _id);
      setShow(showsById);
    }
  }, [shows]);

  const handleEditShow = async (show) => {
    try {
      await editShow({ variables: { showId: id, show } });
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

  return !show ? (
    <BackDrop backDropIsOpen={!show} />
  ) : (
    <Box className={classes.root}>
      <Typography variant='h4'>Edit Show</Typography>
      <Divider />
      {error && renderError()}
      <Formik
        initialValues={{
          name: show.name,
          artistIds: show.artistIds,
          startDate: show.startDate,
          finishDate: show.finishDate,
          description: show.description,
          createdAt: show.createdAt,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleEditShow(values);
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
                  label='Show Name'
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
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  id='checkboxes-tags-demo'
                  name='artists'
                  options={artists}
                  disableCloseOnSelect
                  getOptionLabel={(option) =>
                    `${option.firstName} ${option.lastName}`
                  }
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.firstName} {option.lastName}
                    </li>
                  )}
                  onChange={(event, newValue) => {
                    const artistIds = newValue.map((artist) => artist._id);
                    return props.setFieldValue('artistIds', artistIds);
                  }}
                  fullWidth
                  value={getValuesById(props.values.artistIds, artists)}
                  renderInput={(params) => (
                    <TextField {...params} label='Artists' name='artistIds' />
                  )}
                />
              </Grid>
              <Grid item sm={6} xs={6}>
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
              <Grid item sm={6} xs={6}>
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
                <TextField
                  fullWidth
                  required
                  id='outlined-multiline-static'
                  label='Description'
                  name='description'
                  multiline
                  rows={4}
                  variant='standard'
                  margin='dense'
                  error={
                    props.touched.description &&
                    Boolean(props.errors.description)
                  }
                  helperText={
                    props.touched.description && props.errors.description
                  }
                  value={props.values.description}
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

export default ShowEdit;
