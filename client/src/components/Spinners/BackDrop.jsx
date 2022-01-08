import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const BackDrop = ({ backDropIsOpen }) => {
  const [open, setOpen] = useState(backDropIsOpen);
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={() => setOpen(!open)}
    >
      <CircularProgress color='inherit' />
    </Backdrop>
  );
};
export default BackDrop;
