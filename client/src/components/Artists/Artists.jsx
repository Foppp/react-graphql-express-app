import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

import Spinner from '../Spinners/Spinner.jsx';
import getAge from '../../utils/ageCount';
import getFormatedDate from '../../utils/dateFormat'
import { StyledTableCell, StyledTableRow } from '../StyledComponents.jsx';

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
      const firstName = artist.firstName.toLowerCase().includes(query.toLowerCase());
      const lastName = artist.lastName.toLowerCase().includes(query.toLowerCase());
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
    if (error) setArtistsError(error);
    console.log(artistsError);
  }, [error]);

  useEffect(() => {
    if (dialogClose) refetch();
  }, [dialogClose]);

  const renderTable = () => (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
          <StyledTableCell></StyledTableCell>
            <StyledTableCell align='center'>First Name</StyledTableCell>
            <StyledTableCell align='center'>Last Name</StyledTableCell>
            <StyledTableCell align='center'>Role</StyledTableCell>
            <StyledTableCell align='center'>Country</StyledTableCell>
            <StyledTableCell align='center'>Start Date</StyledTableCell>
            <StyledTableCell align='center'>Age</StyledTableCell>
            <StyledTableCell align='center'>Status</StyledTableCell>
            <StyledTableCell align='center'>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredArtistList.map((artist) => {
            return (
              <StyledTableRow key={artist._id}>
                <StyledTableCell component='th' scope='row'>
                  {artist.gender === 'male' ? <MaleIcon color="primary"/> : <FemaleIcon color="secondary"/>}
                </StyledTableCell>
                <StyledTableCell align='center'>
                  {artist.firstName}
                </StyledTableCell>
                <StyledTableCell align='center'>
                  {artist.lastName}
                </StyledTableCell>
                <StyledTableCell align='center'>{artist.role}</StyledTableCell>
                <StyledTableCell align='center'>
                  {artist.country}
                </StyledTableCell>
                <StyledTableCell align='center'>
                  {getFormatedDate(artist.startDate)}
                </StyledTableCell>
                <StyledTableCell align='center'>{artist.age}</StyledTableCell>
                <StyledTableCell align='center'>
                  <Typography
                    variant='caption'
                    sx={{ color: artist.isActive ? 'green' : 'red' }}
                  >
                    {artist.isActive ? 'Active' : 'Not Active'}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align='center'>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <IconButton
                      aria-label='info'
                      size='small'
                      color='info'
                      onClick={() =>
                        handleDialogOpen('artistProfile', artist._id)
                      }
                    >
                      <InfoOutlinedIcon fontSize='small' />
                    </IconButton>
                    <IconButton
                      aria-label='info'
                      size='small'
                      color='error'
                      onClick={() =>
                        handleDialogOpen('artistRemove', artist._id)
                      }
                    >
                      <DeleteIcon fontSize='small' />
                    </IconButton>
                    <IconButton
                      aria-label='info'
                      size='small'
                      color='secondary'
                      onClick={() => handleDialogOpen('artistEdit', artist._id)}
                    >
                      <ModeEditOutlineOutlinedIcon fontSize='small' />
                    </IconButton>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );

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
      {artists.length === 0 ? <Spinner /> : renderTable()}
    </>
  );
};

export default Artists;
