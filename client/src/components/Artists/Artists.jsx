import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Spinner from '../Spinners/Spinner.jsx';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import List from '@mui/material/List';
import Artist from './Artist.jsx';
import paginate from '../../utils/pagination';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Zoom from '@mui/material/Zoom';

import ArtistProfile from './ArtistProfile.jsx';

const Artists = ({ handleDialogOpen, artists, shows, setCurrentId, id }) => {
  const [filteredArtistList, setFilteredList] = useState([]);
  const [paginatedList, setPaginatedList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(4);
  const [pages, setPages] = useState(0);
  const [collapsed, setCollapsed] = useState(false)

  const renderArtists = () => (
    <Box sx={{ alignText: 'center' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={collapsed ? 8 : 12} sx={{ transition: 'all .2s' }}>
          <Paper
            component={Stack}
            direction='column'
            justifyContent='space-between'
            elevation={1}
            sx={{ width: '100%', height: '100%', p: 2, borderRadius: 6 }}
          >
            <Box>
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
              {paginatedList.length === 0 ? (
                <Typography>No artist added</Typography>
              ) : (
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                  {paginatedList.map((artist) => (
                    <Artist
                      key={artist._id}
                      artist={artist}
                      setCurrentId={setCurrentId}
                      currentId={id}
                      fadeIn={artists.length}
                    />
                  ))}
                </List>
              )}
            </Box>
            <Pagination
              sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
              count={pages}
              onChange={(_, value) => setCurrentPage(value)}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4}>
        <Zoom
          in={id}
          style={{ transitionDelay: id ? '300ms' : '0ms' }}
          onEnter={() => setCollapsed(true)}
          onExited={() => setCollapsed(false)}
        >
          <Paper
            sx={{ width: '100%', height: '100%', p: 2, borderRadius: 6 }}
            elevation={1}
          >
            <ArtistProfile
              handleDialogOpen={handleDialogOpen}
              artists={artists}
              id={id}
              shows={shows}
            />
            </Paper>
            </Zoom>
        </Grid>
      </Grid>
    </Box>
  );

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
    if (artists) {
      setFilteredList(artists);
    }
    if (artists && !id) {
      setCurrentId(artists[0]._id);
    }
  }, [artists]);

  useEffect(() => {
    setPaginatedList(paginate(currentPage, perPage, filteredArtistList));
  }, [currentPage, filteredArtistList, perPage]);

  useEffect(() => {
    if (artists) {
      handleSearch(artists, searchQuery);
      setCurrentPage(1);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (paginatedList.length === 0) {
      setCurrentPage(1);
    }
  }, [paginatedList]);

  return (
    <>
      <Typography variant='h4' m={1}>
        ARTISTS
      </Typography>
      {!artists ? <Spinner /> : renderArtists()}
    </>
  );
};

export default Artists;
