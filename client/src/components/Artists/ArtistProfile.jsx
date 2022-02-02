import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

import getAge from '../../utils/ageCount';
import getFormatedDate from '../../utils/dateFormat';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const ArtistProfile = ({ id, shows, artists, handleDialogOpen }) => {
  const [value, setValue] = useState(0);
  const [artist, setArtist] = useState(null);
  const [artistShows, setArtistShows] = useState([]);

  useEffect(() => {
    const artistById = artists.find(({ _id }) => id === _id);
    setArtist(artistById);
  }, [id, artists]);

  useEffect(() => {
    if (artist) {
      const showsById = shows.filter((show) =>
        artist.showIds.includes(show._id)
      );
      setArtistShows(showsById);
    }
  }, [artist, artists]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return !artist ? (
    <Box sx={{ textAlign: 'center', alignItems: 'center' }}>
      <Typography variant='h6'>Please select artist from list..!.</Typography>
    </Box>
  ) : (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          <Tab label='Personal Info' {...a11yProps(0)} />
          <Tab label='Work Info' {...a11yProps(1)} />
        </Tabs>
      </Box>
      <Stack direction='row' justifyContent='end'>
        <IconButton
          aria-label='info'
          size='small'
          color='secondary'
          onClick={() => handleDialogOpen('artistEdit', artist._id)}
        >
          <ModeEditOutlineOutlinedIcon fontSize='small' />
        </IconButton>
        <IconButton
          aria-label='info'
          size='small'
          color='error'
          onClick={() => handleDialogOpen('artistRemove', artist._id)}
        >
          <DeleteIcon fontSize='small' />
        </IconButton>
      </Stack>
      <TabPanel value={value} index={0}>
        <Typography variant='body1'>
          Name: {artist.firstName} {artist.lastName}{' '}
          {artist.gender === 'male' ? (
            <ManIcon sx={{ color: '#3f51b5' }} />
          ) : (
            <WomanIcon sx={{ color: '#e91e63' }} />
          )}{' '}
        </Typography>
        <Typography variant='body1'>Country: {artist.country}</Typography>
        <Typography variant='body1'>
          Birth Date: {getFormatedDate(artist.birthDate)}
        </Typography>
          <Typography variant='body1'>Age: {getAge(artist.birthDate)}</Typography>
          <Typography variant='body1'>Email: {artist.email}</Typography>
        <Typography variant='body1'>Phone: {artist.phoneNumber}</Typography>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography variant='body1'>Role: {artist.role}</Typography>
        <Typography variant='body1'>
          Start Date: {getFormatedDate(artist.startDate)}
        </Typography>
        <Typography variant='body1'>
          Finish Date: {getFormatedDate(artist.finishDate)}
          </Typography>
          {artistShows.map((show) => (
          <Typography variant='body1' key={show._id}>
            {show.name}
          </Typography>
        ))}
      </TabPanel>
    </Box>
  );
};

export default ArtistProfile;
