import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Spinner from '../Spinners/Spinner.jsx';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Zoom from '@mui/material/Zoom';

import Customer from './Customer.jsx';
import CustomerProfile from './CustomerProfile.jsx';

import paginate from '../../utils/pagination';
import useStyles from '../../assets/styles/customers/customersStyles';

const Customers = ({ handleDialogOpen, customers, setCurrentId, id }) => {
  const profileRef = useRef(null);
  const classes = useStyles();
  const [filteredCustomerList, setFilteredCustomerList] = useState([]);
  const [paginatedList, setPaginatedList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);
  const [pages, setPages] = useState(0);
  const [collapse, setCollapse] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleOpenProfile = (customerId) => {
    setCurrentId(customerId);
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
    if (query === '') setFilteredCustomerList(data);
    const filteredData = data.filter((customer) => {
      return customer.name.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredCustomerList(filteredData);
  };

  useEffect(() => {
    if (!id) {
      setProfileOpen(false);
    }
  }, [id]);

  useEffect(() => {
    setPages(Math.ceil(filteredCustomerList.length / perPage));
  }, [perPage, filteredCustomerList]);

  useEffect(() => {
    if (customers) {
      setFilteredCustomerList(customers);
    }
  }, [customers]);

  useEffect(() => {
    setPaginatedList(paginate(currentPage, perPage, filteredCustomerList));
  }, [currentPage, filteredCustomerList, perPage]);

  useEffect(() => {
    if (customers) {
      handleSearch(customers, searchQuery);
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
        CUSTOMERS
      </Typography>
      {customers.length === 0 ? (
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
                      onClick={() => handleDialogOpen('customerAdd')}
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
                    <Typography>No customers...</Typography>
                  ) : (
                    <List className={classes.customersList}>
                      {paginatedList.map((customer) => (
                        <Customer
                          key={customer._id}
                          customer={customer}
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
                  <CustomerProfile
                    handleDialogOpen={handleDialogOpen}
                    setProfileOpen={setProfileOpen}
                    profileOpen={profileOpen}
                    customers={customers}
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

export default Customers;
