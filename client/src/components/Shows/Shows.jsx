import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Spinner from '../Spinners/Spinner.jsx';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import List from '@mui/material/List';
import Show from './Show.jsx';
import paginate from '../../utils/pagination';
import Paper from '@mui/material/Paper';
import Zoom from '@mui/material/Zoom';

import useStyles from '../../assets/styles/shows/showsStyles';
import ShowProfile from './ShowProfile.jsx';

const Shows = ({ handleDialogOpen, shows, setCurrentId, id }) => {
  const profileRef = useRef(null);
  const classes = useStyles();
  const [filteredShowList, setFilteredShowList] = useState([]);
  const [paginatedList, setPaginatedList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);
  const [pages, setPages] = useState(0);
  const [collapse, setCollapse] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleOpenProfile = (showId) => {
    setCurrentId(showId);
    setCollapse(true);
    setProfileOpen(true);
  };

  const handleCloseProfile = () => {
    setProfileOpen(false);
  };

  const handleExitProfile = () => {
    setCollapse(false);
    setCurrentId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (data, query) => {
    if (query === '') setFilteredShowList(data);
    const filteredData = data.filter((show) => {
      return show.name.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredShowList(filteredData);
  };

  useEffect(() => {
    if (!id) {
      setProfileOpen(false);
    }
  }, [id]);

  useEffect(() => {
    setPages(Math.ceil(filteredShowList.length / perPage));
  }, [perPage, filteredShowList]);

  useEffect(() => {
    if (shows) {
      setFilteredShowList(shows);
    }
  }, [shows]);

  useEffect(() => {
    setPaginatedList(paginate(currentPage, perPage, filteredShowList));
  }, [currentPage, filteredShowList, perPage]);

  useEffect(() => {
    if (shows) {
      handleSearch(shows, searchQuery);
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
        SHOWS
      </Typography>
      {!shows ? (
        <Spinner />
      ) : (
        <Box>
          <Grid container spacing={2}>
            <Grid
              className={classes.listWrapper}
              item
              xs={12}
              sm={12}
              md={12}
              lg={collapse ? 8 : 12}
            >
              <Paper elevation={1} className={classes.listPaper}>
                <Box>
                  <Box className={classes.listActions}>
                    <Button
                      className={classes.addButton}
                      type='submit'
                      color='primary'
                      variant='contained'
                      size='small'
                      onClick={() => handleDialogOpen('showAdd')}
                    >
                      Add new
                    </Button>
                    <TextField
                      className={classes.serachField}
                      id='input-with-sx'
                      label='Search...'
                      variant='standard'
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </Box>
                  {paginatedList.length === 0 ? (
                    <Typography>No shows...</Typography>
                  ) : (
                    <List className={classes.showsList}>
                      {paginatedList.map((show) => (
                        <Show
                          key={show._id}
                          show={show}
                          currentId={id}
                          handleOpenProfile={handleOpenProfile}
                        />
                      ))}
                    </List>
                  )}
                </Box>
                <Pagination
                  className={classes.pagination}
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
                onEntered={() =>
                  profileRef.current.scrollIntoView({ behavior: 'smooth' })
                }
                onExited={handleExitProfile}
              >
                <Paper className={classes.profilePaper} elevation={1}>
                  <ShowProfile
                    handleDialogOpen={handleDialogOpen}
                    setProfileOpen={setProfileOpen}
                    profileOpen={profileOpen}
                    shows={shows}
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

export default Shows;
