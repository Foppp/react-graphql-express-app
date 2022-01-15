import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Artist from './Artist.jsx';
import Spinner from '../Spinners/Spinner.jsx';
import Grid from '@mui/material/Grid';

import getAge from '../../utils/ageCount';


import { GET_ALL_ARTISTS } from '../../query/query';

const Artists = ({ dialogClose, handleDialogOpen }) => {
  const [artists, setArtists] = useState([]);
  const [filteredArtistList, setFilteredList] = useState(artists);
  const [artistsError, setArtistsError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { data, error, refetch } = useQuery(GET_ALL_ARTISTS);

  const handleSearch = (data, query) => {
    if (query === '') setFilteredList(data);
    const filteredData = data.filter((artist) => {
      const firstName = artist.firstName
        .toLowerCase()
        .includes(query.toLowerCase());
      const lastName = artist.lastName
        .toLowerCase()
        .includes(query.toLowerCase());
      return firstName || lastName;
    });
    setFilteredList(filteredData);
  };

  useEffect(() => {
    if (data) {
      const updatedData = data.getArtists.map((artist) => {
        const isActive = artist.finishDate === '';
        const age = getAge(artist.birthDate);
        return { ...artist, isActive, age };
      });
      setArtists(updatedData);
      setFilteredList(updatedData);
    }
  }, [data]);

  useEffect(() => {
    handleSearch(artists, searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (error) {
      setArtistsError(error);
      console.log(artistsError);
    }
  }, [error]);

  useEffect(() => {
    if (dialogClose) refetch();
  }, [dialogClose]);


  return (
    <>
      <Typography variant='h4' m={1} sx={{ textAlign: 'center' }}>
        Artists
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          type='submit'
          color='primary'
          variant='contained'
          sx={{ margin: '15px 0' }}
          size='small'
          onClick={() => handleDialogOpen('artistAdd')}
        >
          Add new
        </Button>
        <TextField
          id='input-with-sx'
          label='Search...'
          variant='standard'
          sx={{ mb: 2, mx: 2 }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>
      {artists.length === 0 ? (
        <Spinner />
      ) : (
          <Grid container spacing={2} >
          {filteredArtistList.map((artist) => (
            <Artist key={artist._id} artist={artist} handleDialogOpen={handleDialogOpen}/>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Artists;
