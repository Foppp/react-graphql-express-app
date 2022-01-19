import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { red } from '@mui/material/colors';
import Fade from '@mui/material/Fade';
import CountertopsOutlinedIcon from '@mui/icons-material/CountertopsOutlined';

const Customer = ({ customer, handleDialogOpen, fadeIn }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const actionSection = (
    <>
      <IconButton
        aria-label='info'
        size='small'
        color='info'
        onClick={() => handleDialogOpen('customerProfile', customer._id)}
      >
        <InfoOutlinedIcon fontSize='small' />
      </IconButton>
      <IconButton
        aria-label='settings'
        aria-controls={open ? 'action-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id='action-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { borderRadius: '15px' } }}
      >
        <Box sx={{ display: 'flex' }}>
          <MenuItem onClick={handleClose}>
            <IconButton
              aria-label='info'
              size='small'
              color='error'
              onClick={() => handleDialogOpen('customerRemove', customer._id)}
            >
              <DeleteIcon fontSize='small' />
            </IconButton>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <IconButton
              aria-label='info'
              size='small'
              color='secondary'
              onClick={() => handleDialogOpen('customerEdit', customer._id)}
            >
              <ModeEditOutlineOutlinedIcon fontSize='small' />
            </IconButton>
          </MenuItem>
        </Box>
      </Menu>
    </>
  );

  const avatarSection = (
    <Avatar sx={{ bgcolor: red[400] }} aria-label='recipe'>
      <CountertopsOutlinedIcon />
    </Avatar>
  );

  return (
    <Grid item xs={12} sm={12} md={6} lg={4}>
      <Fade in={fadeIn !== 0}>
        <Card>
          <CardHeader
            avatar={avatarSection}
            action={actionSection}
            title={customer.name}
            subheader={customer.city}
          />
        </Card>
      </Fade>
    </Grid>
  );
};

export default Customer;
