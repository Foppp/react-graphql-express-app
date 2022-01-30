import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Spinner from '../Spinners/Spinner.jsx';
import Grid from '@mui/material/Grid';

import Show from './Show.jsx';

const Shows = ({ handleDialogOpen, shows }) => {
  const [filteredShowList, setFilteredShowList] = useState(shows);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (data, query) => {
    if (query === '') setFilteredShowList(data);
    const filteredData = data.filter((show) => {
      return show.name.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredShowList(filteredData);
  };

  useEffect(() => {
    setFilteredShowList(shows);
  }, [shows]);

  useEffect(() => {
    handleSearch(shows, searchQuery);
  }, [searchQuery]);

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
