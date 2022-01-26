import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Spinner from '../Spinners/Spinner.jsx';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import List from '@mui/material/List';
import ArtistList from './ArtistList.jsx';
import paginate from '../../utils/pagination';
import getAge from '../../utils/ageCount';
import Paper from '@mui/material/Paper';

import { GET_ALL_ARTISTS } from '../../query/query';
import ArtistsSummary from './ArtistsSummary.jsx';
import ArtistProfile from './ArtistProfile.jsx';
import { Stack } from '@mui/material';

const Artists = ({ dialogClose, handleDialogOpen }) => {
  const [artists, setArtists] = useState([]);
  const [filteredArtistList, setFilteredList] = useState(artists);
  const [paginatedList, setPaginatedList] = useState([]);
  const [artistsError, setArtistsError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentId, setCurrentId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);
  const [pages, setPages] = useState(0);

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
    setPages(Math.ceil(filteredArtistList.length / perPage));
  }, [perPage, filteredArtistList]);

  useEffect(() => {
    if (data) {
      const updatedData = data.getArtists.map((artist) => {
        const isActive = artist.finishDate === '';
        const age = getAge(artist.birthDate);
        return { ...artist, isActive, age };
      });
      setArtists(updatedData);
      setFilteredList(updatedData);
      setCurrentId(currentId ?? data.getArtists[0]._id);
    }
  }, [data]);


  useEffect(() => {
    setPaginatedList(paginate(currentPage, perPage, filteredArtistList));
  }, [currentPage, filteredArtistList]);

  useEffect(() => {
    handleSearch(artists, searchQuery);
    setCurrentPage(1);
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

      {artists.length === 0 ? (
        <Spinner />
      ) : (
        <Box sx={{ alignText: 'center' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Paper
                component={Stack}
                direction='column'
                justifyContent='space-between'
                sx={{ width: '100%', height: '100%', p: 2 }}
              >
                <Box>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
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
                  <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {paginatedList.map((artist) => (
                      <ArtistList
                        key={artist._id}
                        artist={artist}
                        setCurrentId={setCurrentId}
                        currentId={currentId}
                        fadeIn={artists.length}
                      />
                    ))}
                  </List>
                </Box>

                <Pagination
                  sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
                  count={pages}
                  onChange={(_, value) => setCurrentPage(value)}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ width: '100%', height: '100%', p: 2 }}>
                {!currentId ? (
                  <Typography>Select the artist from list...</Typography>
                ) : (
                  <ArtistProfile
                    handleDialogOpen={handleDialogOpen}
                    id={currentId}
                  />
                )}
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default Artists;
