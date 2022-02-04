import React, { useState, useEffect, useRef } from 'react';
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
import Zoom from '@mui/material/Zoom';

import ArtistProfile from './ArtistProfile.jsx';

const Artists = ({ handleDialogOpen, artists, setCurrentId, id }) => {
  const profileRef = useRef(null);
  const [filteredArtistList, setFilteredList] = useState([]);
  const [paginatedList, setPaginatedList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);
  const [pages, setPages] = useState(0);
  const [collapse, setCollapse] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleOpenProfile = (artistId) => {
    setCurrentId(artistId);
    setCollapse(true);
    setProfileOpen(true);
  };

  const handleCloseProfile = () => {
    setProfileOpen(false);
  };

  const handleExitProfile = () => {
    setCollapse(false);
    window.scrollTo({ top: 0, behavior: "smooth" })
  };

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
    if (!id) {
      setProfileOpen(false);
    }
  }, [id]);

  useEffect(() => {
    setPages(Math.ceil(filteredArtistList.length / perPage));
  }, [perPage, filteredArtistList]);

  useEffect(() => {
    if (artists) {
      setFilteredList(artists);
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
      {!artists ? (
        <Spinner />
      ) : (
        <Box sx={{ alignText: 'center' }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={collapse ? 8 : 12}
              sx={{ transition: 'all 0.2s ease-in-out' }}
            >
              <Paper
                elevation={1}
                sx={{ width: '100%', p: 2, borderRadius: 6 }}
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
                  {paginatedList.length === 0 ? (
                    <Typography>No artists...</Typography>
                  ) : (
                    <List sx={{ width: '100%', height: '100%', bgcolor: 'background.paper' }}>
                      {paginatedList.map((artist) => (
                        <Artist
                          key={artist._id}
                          artist={artist}
                          currentId={id}
                          handleOpenProfile={handleOpenProfile}
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
              <Grid item xs>
              <Zoom
                ref={profileRef}
                in={profileOpen}
                style={{ transitionDelay: profileOpen ? '100ms' : '0ms' }}
                onEntered={() => profileRef.current.scrollIntoView({ behavior: "smooth" })}
                onExited={handleExitProfile}
              >
                <Paper
                  sx={{ width: '100%', height: '100%', p: 2, borderRadius: 6 }}
                  elevation={1}
                >
                  <ArtistProfile
                    handleDialogOpen={handleDialogOpen}
                    setProfileOpen={setProfileOpen}
                    profileOpen={profileOpen}
                    artists={artists}
                    id={id}
                    handleCloseProfile={handleCloseProfile}
                  />
                </Paper>
              </Zoom>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default Artists;
