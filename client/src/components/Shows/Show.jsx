// import React, { useState } from 'react';
// import Card from '@mui/material/Card';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import CardHeader from '@mui/material/CardHeader';
// import Avatar from '@mui/material/Avatar';
// import IconButton from '@mui/material/IconButton';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
// import DeleteIcon from '@mui/icons-material/Delete';
// import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
// import Badge from '@mui/material/Badge';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import { teal } from '@mui/material/colors';
// import Fade from '@mui/material/Fade';

// const Show = ({ show, handleDialogOpen, fadeIn }) => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const actionSection = (
//     <>
//       <IconButton
//         aria-label='info'
//         size='small'
//         color='info'
//         onClick={() => handleDialogOpen('showProfile', show._id)}
//       >
//         <InfoOutlinedIcon fontSize='small' />
//       </IconButton>
//       <IconButton
//         aria-label='settings'
//         aria-controls={open ? 'action-menu' : undefined}
//         aria-expanded={open ? 'true' : undefined}
//         aria-haspopup='true'
//         onClick={handleClick}
//       >
//         <MoreVertIcon />
//       </IconButton>
//       <Menu
//         id='action-menu'
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         PaperProps={{ sx: { borderRadius: '15px' }}}
//       >
//         <Box sx={{ display: 'flex' }}>
//           <MenuItem onClick={handleClose}>
//             <IconButton
//               aria-label='info'
//               size='small'
//               color='error'
//               onClick={() => handleDialogOpen('showRemove', show._id)}
//             >
//               <DeleteIcon fontSize='small' />
//             </IconButton>
//           </MenuItem>
//           <MenuItem onClick={handleClose}>
//             <IconButton
//               aria-label='info'
//               size='small'
//               color='secondary'
//               onClick={() => handleDialogOpen('showEdit', show._id)}
//             >
//               <ModeEditOutlineOutlinedIcon fontSize='small' />
//             </IconButton>
//           </MenuItem>
//         </Box>
//       </Menu>
//     </>
//   );

//   const avatarSection = (
//     <Badge variant='dot' color={show.isActive ? 'success' : 'error'}>
//       <Avatar
//         sx={{ bgcolor: teal[200] }}
//         aria-label='recipe'
//       >
//         <TheaterComedyIcon />
//       </Avatar>
//     </Badge>
//   );

//   return (
//     <Grid item xs={12} sm={12} md={6} lg={4}>
//       <Fade in={fadeIn !== 0}>
//       <Card>
//         <CardHeader
//           avatar={avatarSection}
//           action={actionSection}
//           title={show.name}
//           subheader={show.description}
//         />
//       </Card>
//       </Fade>
//     </Grid>
//   );
// };

// export default Show;

import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

import Stack from '@mui/material/Stack';
import danceShow from '../../assets/images/showDance.png';
import useStyles from '../../assets/styles/shows/showStyles';

const Show = ({ show, currentId, handleOpenProfile }) => {
  const classes = useStyles(show);

  return (
    <>
      <ListItem
        button
        selected={show._id === currentId}
        alignItems='center'
        className={classes.root}
        secondaryAction={
          <Chip
            className={classes.chipStatus}
            variant='outlined'
            label={show.isActive ? 'Aviable' : 'Not Aviable'}
            color={show.isActive ? 'success' : 'error'}
            size='small'
          />
        }
        onClick={() => handleOpenProfile(show._id)}
      >
        <Stack direction='row' spacing={2}>
          <ListItemIcon className={classes.avatar}>
            <Avatar alt='Remy Sharp' src={danceShow} />
          </ListItemIcon>
          <ListItemText>
            <Typography variant='subtitle1' color='primary'>
              {show.name}
            </Typography>
            <Typography variant='body2' color='secondary'>
              {show.description}
            </Typography>
          </ListItemText>
        </Stack>
        <ListItemText className={classes.chipStatus}>
          <Typography variant='body2' color='secondary'>
            {show.artistIds.length} artists
          </Typography>
        </ListItemText>
      </ListItem>
    </>
  );
};

export default Show;
