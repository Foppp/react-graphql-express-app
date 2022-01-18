
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

import Spinner from '../Spinners/Spinner.jsx';
import getFormatedDate from '../../utils/dateFormat'
import { StyledTableCell, StyledTableRow } from '../StyledComponents.jsx';

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

  const renderTable = () => (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Show Name</StyledTableCell>
            <StyledTableCell align='center'>Start Date</StyledTableCell>
            <StyledTableCell align='center'>Artists</StyledTableCell>
            <StyledTableCell align='center'>Status</StyledTableCell>
            <StyledTableCell align='center'>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredShowList.map((show) => {
            return (
              <StyledTableRow key={show._id}>
                <StyledTableCell component='th' scope='row'>
                  {show.name}
                </StyledTableCell>
                <StyledTableCell align='center'>
                  {getFormatedDate(show.startDate)}
                </StyledTableCell>
                <StyledTableCell align='center'>
                  {show.artistIds.length}
                </StyledTableCell>
                <StyledTableCell align='center'>
                  <Typography
                    variant='caption'
                    sx={{ color: show.isActive ? 'green' : 'red' }}
                  >
                    {show.isActive ? 'Active' : 'Not Active'}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align='center'>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <IconButton
                      aria-label='info'
                      size='small'
                      color='info'
                      onClick={() =>
                        handleDialogOpen('showProfile', show._id)
                      }
                    >
                      <InfoOutlinedIcon fontSize='small' />
                    </IconButton>
                    <IconButton
                      aria-label='info'
                      size='small'
                      color='error'
                      onClick={() =>
                        handleDialogOpen('showRemove', show._id)
                      }
                    >
                      <DeleteIcon fontSize='small' />
                    </IconButton>
                    <IconButton
                      aria-label='info'
                      size='small'
                      color='secondary'
                      onClick={() => handleDialogOpen('showEdit', show._id)}
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
