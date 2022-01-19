import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Spinner from '../Spinners/Spinner.jsx';
import Grid from '@mui/material/Grid';

import Customer from './Customer.jsx';

import { GET_ALL_CUSTOMERS } from '../../query/query';

const Customers = ({ dialogClose, handleDialogOpen }) => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomerList, setFilteredCustomerList] = useState(customers);
  const [customersError, setCustomersError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { data, error, refetch } = useQuery(GET_ALL_CUSTOMERS);

  const handleSearch = (data, query) => {
    if (query === '') setFilteredCustomerList(data);
    const filteredData = data.filter((customer) => {
      return customer.name.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredCustomerList(filteredData);
  };

  useEffect(() => {
    if (data) {
      setCustomers(data.getCustomers);
      setFilteredCustomerList(data.getCustomers);
    }
  }, [data]);

  useEffect(() => {
    handleSearch(customers, searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (error) {
      setCustomersError(error);
      console.log(customersError);
    }
  }, [error]);

  useEffect(() => {
    if (dialogClose) refetch();
  }, [dialogClose]);

  return (
    <>
      <Typography variant='h4' m={1} sx={{ textAlign: 'center' }}>
        Customers
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          type='submit'
          color='primary'
          variant='contained'
          sx={{ margin: '15px 0' }}
          size='small'
          onClick={() => handleDialogOpen('customerAdd')}
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
      {customers.length === 0 ? (
        <Spinner />
      ) : (
        <Grid container spacing={2}>
          {filteredCustomerList.map((customer) => (
            <Customer
              key={customer._id}
              customer={customer}
              handleDialogOpen={handleDialogOpen}
              fadeIn={customers.length}
            />
          ))}
        </Grid>
      )}
    </>
  );
};

export default Customers;
