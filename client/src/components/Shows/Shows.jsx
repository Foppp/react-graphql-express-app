import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Spinner from '../Spinners/Spinner.jsx';

import { GET_ALL_SHOWS } from '../../query/query';
import { Grid } from '@mui/material';
import Show from './Show.jsx';

const Shows = ({ dialogClose, handleDialogOpen }) => {
  const [shows, setShows] = useState([]);
  const [filteredShowList, setFilteredShowList] = useState(shows);
  const [showsError, setShowsError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { data, error, refetch } = useQuery(GET_ALL_SHOWS);

  const handleSearch = (data, query) => {
    if (query === '') setFilteredShowList(data);
    const filteredData = data.filter((show) => {
      return show.name.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredShowList(filteredData);
  };

  useEffect(() => {
    if (data) {
      const updatedData = data.getShows.map((show) => {
        const isActive = show.finishDate === '';
        return { ...show, isActive };
      });
      setShows(updatedData);
      setFilteredShowList(updatedData);
    }
  }, [data]);

  useEffect(() => {
    handleSearch(shows, searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (error) {
      setShowsError(error);
      console.log(showsError);
    }
  }, [error]);

  useEffect(() => {
    if (dialogClose) refetch();
  }, [dialogClose]);

  
  return (
    <>
      <Typography variant='h4' m={1} sx={{ textAlign: 'center' }}>
        Shows
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          type='submit'
          color='primary'
          variant='contained'
          sx={{ margin: '15px 0' }}
          size='small'
          onClick={() => handleDialogOpen('showAdd')}
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
      {shows.length === 0 ? <Spinner /> : (
        <Grid container spacing={2} >
          {filteredShowList.map((show) => (
            <Show key={show._id} show={show} handleDialogOpen={handleDialogOpen} fadeIn={shows.length} />
          ))}
        </Grid>
      )}
    </>
  );
};

export default Shows;
