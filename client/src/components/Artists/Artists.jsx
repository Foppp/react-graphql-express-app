import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
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
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Spinner from '../Spinners/Spinner.jsx';

import { StyledTableCell, StyledTableRow } from '../StyledComponents.jsx';

import { GET_ALL_ARTISTS } from '../../query/query';

const Artists = ({ handleModalOpen, modalClose }) => {
  const [artists, setArtists] = useState([]);
  const [filteredArtistList, setFilteredList] = useState(artists);
  const [artistsError, setArtistsError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('')
  const { data, loading, error, refetch } = useQuery(GET_ALL_ARTISTS);

  const handleSearch = (data, query) => {
    if (query === '') setFilteredList(data);
    const filteredData = data.filter(({ name }) =>
      name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredList(filteredData);
  };


  useEffect(() => {
    if (data) {
      setArtists(data.getArtists)
      setFilteredList(data.getArtists)
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
    if (modalClose) refetch();
  }, [modalClose]);

  const renderTable = () => (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align='center'>Age</StyledTableCell>
            <StyledTableCell align='center'>Role</StyledTableCell>
            <StyledTableCell align='center'>Status</StyledTableCell>
            <StyledTableCell align='center'>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredArtistList.map((artist) => (
            <StyledTableRow key={artist._id}>
              <StyledTableCell component='th' scope='row'>
                {artist.name}
              </StyledTableCell>
              <StyledTableCell align='center'>{artist.age}</StyledTableCell>
              <StyledTableCell align='center'>{artist.role}</StyledTableCell>
              <StyledTableCell align='center'>
                <Typography
                  variant='caption'
                  sx={{ color: artist.status === 'active' ? 'green' : 'red' }}
                >
                  {artist.status}
                </Typography>
              </StyledTableCell>
              <StyledTableCell align='center'>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <IconButton
                    aria-label='info'
                    size='small'
                    color='info'
                    onClick={() => handleModalOpen('artistProfile', artist._id)}
                  >
                    <InfoOutlinedIcon fontSize='small' />
                  </IconButton>
                  <IconButton
                    aria-label='info'
                    size='small'
                    color='error'
                    onClick={() => handleModalOpen('artistRemove', artist._id)}
                  >
                    <DeleteIcon fontSize='small' />
                  </IconButton>
                  <IconButton
                    aria-label='info'
                    size='small'
                    color='secondary'
                    onClick={() => handleModalOpen('artistEdit', artist._id)}
                  >
                    <ModeEditOutlineOutlinedIcon fontSize='small' />
                  </IconButton>
                </Box>
              </StyledTableCell>
            </StyledTableRow>
          ))}
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
        <IconButton
          aria-label='info'
          color='inherit'
          variant='button'
          onClick={() => handleModalOpen('artistAdd')}
        >
          <AddCircleOutlineRoundedIcon
            fontSize='large'
            sx={{ alignItems: 'end', mx: 1 }}
          />
        </IconButton>
        <TextField
          id='input-with-sx'
          label='Search...'
          variant='standard'
          sx={{ mb: 2, mx: 2 }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>
      {loading ? <Spinner /> : renderTable()}
    </>
  );
};

export default Artists;
