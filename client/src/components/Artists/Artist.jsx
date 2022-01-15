import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { pink, indigo } from '@mui/material/colors';


const Artist = ({ artist, handleDialogOpen }) => {
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
        onClick={() => handleDialogOpen('artistProfile', artist._id)}
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
        PaperProps={{ sx: { borderRadius: '15px' }}}
      >
        <Box sx={{ display: 'flex' }}>
          <MenuItem onClick={handleClose}>
            <IconButton
              aria-label='info'
              size='small'
              color='error'
              onClick={() => handleDialogOpen('artistRemove', artist._id)}
            >
              <DeleteIcon fontSize='small' />
            </IconButton>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <IconButton
              aria-label='info'
              size='small'
              color='secondary'
              onClick={() => handleDialogOpen('artistEdit', artist._id)}
            >
              <ModeEditOutlineOutlinedIcon fontSize='small' />
            </IconButton>
          </MenuItem>
        </Box>
      </Menu>
    </>
  );

  const avatarSection = (
    <Badge variant='dot' color={artist.isActive ? 'success' : 'error'}>
      <Avatar
        sx={{ bgcolor: artist.gender === 'male' ? indigo[500] : pink[500] }}
        aria-label='recipe'
      >
        {artist.gender === 'male' ? <ManIcon /> : <WomanIcon />}
      </Avatar>
    </Badge>
  );

  return (
    <Grid item xs={12} sm={12} md={6}>
      <Card>
        <CardHeader
          avatar={avatarSection}
          action={actionSection}
          title={`${artist.firstName} ${artist.lastName}`}
          subheader={artist.role}
        />
      </Card>
    </Grid>
  );
};

export default Artist;
