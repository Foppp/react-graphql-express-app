import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const ArtistAdd = () => {
  const [firstname, setFirstName] = useState('');

  return (
    <Box component='form' sx={{ flexGrow: 1 }} noValidate autoComplete='off'>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 4 }}
      >
        <Grid item xs={2} sm={4} md={3}>
          <TextField
            id='standard-basic'
            label='Standard'
            variant='standard'
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            id='standard-basic'
            label='Standard'
            variant='standard'
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            id='standard-basic'
            label='Standard'
            variant='standard'
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            id='standard-basic'
            label='Standard'
            variant='standard'
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Grid>
      </Grid>
      <Button variant='outlined' onClick={() => alert(firstname)}>
        Save
      </Button>
    </Box>
  );
};

export default ArtistAdd;
