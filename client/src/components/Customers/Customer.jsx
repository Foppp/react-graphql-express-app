
import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import customers from '../../assets/images/customers.png';
import useStyles from '../../assets/styles/customers/customerStyles';

const Customer = ({ customer, currentId, handleOpenProfile }) => {
  const classes = useStyles(customer);
  return (
    <>
      <ListItem
        button
        selected={customer._id === currentId}
        alignItems='center'
        className={classes.root}
        onClick={() => handleOpenProfile(customer._id)}
      >
        <Stack direction='row' spacing={2}>
          <ListItemIcon className={classes.avatar}>
            <Avatar alt='Remy Sharp' src={customers} />
          </ListItemIcon>
          <ListItemText>
            <Typography variant='subtitle1' color='primary'>
              {customer.name}
            </Typography>
            <Typography variant='body2' color='secondary'>
              {customer.city}
            </Typography>
          </ListItemText>
        </Stack>
        <ListItemText className={classes.infoColumn}>
          <Typography variant='body2' color='secondary'>
            {customer.country}
          </Typography>
        </ListItemText>
      </ListItem>
    </>
  );
};

export default Customer;
