import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useFormik } from 'formik';
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

import { CREATE_SHOW } from '../../mutation/mutation';
import { GET_ALL_ARTISTS } from '../../query/query';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const validationSchema = yup.object({
  name: yup
    .string('Enter valid name')
    .min(2, 'Name should be of minimum 2 characters length')
    .required('Name is required'),
});

const ShowAdd = ({ dialogClose, handleSnackBarOpen }) => {
  const [error, setError] = useState(null);
  const [addShow] = useMutation(CREATE_SHOW);
  const [artists, setArtists] = useState([]);
  const classes = useStyles();
  const { data } = useQuery(GET_ALL_ARTISTS);

  useEffect(() => {
    if (data) {
      setArtists(data.getArtists);
    }
  }, [data]);

  const handleCreateShow = async (show) => {
    console.log(show)
    try {
      await addShow({ variables: { show } });
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

  const formik = useFormik({
    initialValues: {
      name: '',
      artistIds: [],
      startDate: new Date(),
      finishDate: '',
      description: '',
      createdAt: new Date(),
    },
    validationSchema,
    onSubmit: (values) => {
      handleCreateShow(values);
    },
  });

  return (
    <Box
      className={classes.root}
      component='form'
      noValidate
      onSubmit={formik.handleSubmit}
    >
      <Typography variant='h4'>Add New Show</Typography>
      <Divider />
      {error && renderError()}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            id='standard-basic'
            label='Show Name'
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
              return formik.setFieldValue('artistIds', artistIds);
            }}
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                label='Artists'
                name='artistIds'
                value={formik.values.artistIds}
              />
            )}
          />
        </Grid>
        <Grid item sm={6} xs={6}>
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
        <Grid item sm={6} xs={6}>
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
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
            value={formik.values.description}
            onChange={formik.handleChange}
            disabled={formik.isSubmitting && !error}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
          <Stack direction='row' spacing={2} className={classes.buttons}>
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

export default ShowAdd;
