import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import Tooltip from '@mui/material/Tooltip';
import customers from '../../assets/images/customers.png';
import useStyles from '../../assets/styles/customers/customerStyles';

const Customer = ({ customer, currentId, handleOpenProfile }) => {
  const classes = useStyles(customer);
  return (
    <ListItem
      button
      selected={customer._id === currentId}
      alignItems='center'
      className={classes.root}
      onClick={() => handleOpenProfile(customer._id)}
      secondaryAction={
        <Tooltip title={customer.phoneNumber} placement='left-start' arrow>
          <PhoneEnabledIcon color='primary' />
        </Tooltip>
      }
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
    </ListItem>
  );
};

export default Customer;
