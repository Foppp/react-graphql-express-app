import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
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

import Spinner from '../Spinners/Spinner.jsx';

const ArtistEdit = ({ id, dialogClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('');
  const [role, setRole] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [finishDate, setFinishDate] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);

  const { data, loading } = useQuery(GET_ARTIST, {
    variables: { userId: id },
  });
  const [editArtist] = useMutation(EDIT_ARTIST);

  const handleEditArtist = async () => {
    try {
      await editArtist({
        variables: {
          userId: id,
          artist: {
            firstName,
            lastName,
            country,
            role,
            gender,
            birthDate,
            startDate,
            finishDate,
            email,
            phoneNumber,
          },
        },
      });
      dialogClose();
    } catch (e) {
      setError(e);
      console.log(error);
    }
  };

  useEffect(() => {
    if (data) {
      const artist = data.getArtist;
      setFirstName(artist.firstName);
      setLastName(artist.lastName);
      setCountry(artist.country);
      setRole(artist.role);
      setGender(artist.gender)
      setBirthDate(artist.birthDate);
      setStartDate(artist.startDate);
      setFinishDate(artist.finishDate);
      setEmail(artist.email);
      setPhoneNumber(artist.phoneNumber);
    }
  }, [data]);

  return (
    <Box
      component='form'
      sx={{ m: 1, p: 1, textAlign: 'center' }}
      noValidate
      autoComplete='off'
    >
      <Typography variant='h4'>Edit Artist</Typography>
      <Divider />
      {loading ? (
        <Spinner />
      ) : (
        <Grid container spacing={2} sx={{ textAlign: 'center' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id='standard-basic'
              label='First Name'
              variant='standard'
              margin='dense'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id='standard-basic'
              label='Last Name'
              variant='standard'
              margin='dense'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              id='standard-basic'
              label='Country'
              variant='standard'
              margin='dense'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              id='standard-basic'
              label='Role'
              variant='standard'
              margin='dense'
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            </Grid>
            <Grid item xs={12} sm={4}>
          <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
            <InputLabel id='demo-simple-select-standard-label'>
              Gender
            </InputLabel>
            <Select
              labelId='demo-simple-select-standard-label'
              id='demo-simple-select-standard'
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              label='Gender'
            >
              <MenuItem value=''><em>None</em></MenuItem>
              <MenuItem value='male'>Male</MenuItem>
              <MenuItem value='female'>Female</MenuItem>
            </Select>
          </FormControl>
        </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id='standard-basic'
              label='Email'
              variant='standard'
              margin='dense'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id='standard-basic'
              label='Phone'
              variant='standard'
              margin='dense'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Grid>
          <Grid item sm={4} xs={4}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label='BirthDate'
                value={birthDate}
                onChange={(newValue) => {
                  setBirthDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item sm={4} xs={4}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label='Start Date'
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item sm={4} xs={4}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label='Finish Date'
                value={finishDate}
                onChange={(newValue) => {
                  setFinishDate(newValue);
                }}
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
                onClick={() => handleEditArtist()}
              >
                Save
              </Button>
            </Stack>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ArtistEdit;
