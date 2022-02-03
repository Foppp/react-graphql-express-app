// import React, { useState } from 'react';
// import Typography from '@mui/material/Typography';
// import Collapse from '@mui/material/Collapse';
// import Zoom from '@mui/material/Zoom';
// import { Box, Button, Grid, Paper } from '@mui/material';

// const Account = () => {
//   const [open, setOpen] = useState(false);
//   const [collapsed, setCollapsed] = useState(false);

//   const handleChange = () => {
//     setOpen((prev) => !prev);
//   };

//   return (
//     <>
//       <Typography variant='h4' m={1} sx={{ textAlign: 'center' }}>
//         Account
//       </Typography>
//       <Button variant='filled' onClick={handleChange}>
//         Click
//       </Button>
//       <Grid container spacing={3}>
//         <Grid
//           item
//           xs={12}
//           sm={collapsed ? 6 : 12}
//           sx={{ transition: 'all .2s' }}
//         >
//           <Paper>
//             <Typography>Anvcnvmnvmxcnvmxcvxcv mnv,mxc v,cxnvmx nv,</Typography>
//             <Typography>Anvcnvmnvmxcnvmxcvxcv mnv,mxc v,cxnvmx nv,</Typography>
//             <Typography>Anvcnvmnvmxcnvmxcvxcv mnv,mxc v,cxnvmx nv,</Typography>
//             <Typography>Anvcnvmnvmxcnvmxcvxcv mnv,mxc v,cxnvmx nv,</Typography>
//             <Typography>Anvcnvmnvmxcnvmxcvxcv mnv,mxc v,cxnvmx nv,</Typography>
//           </Paper>
//         </Grid>
//         <Grid item xs={12} sm={6}>

//         <Zoom
//           in={open}
//           style={{ transitionDelay: open ? '300ms' : '0ms' }}
//           onEnter={() => setCollapsed(true)}
//           onExited={() => setCollapsed(false)}
//         >
//             <Paper>
//               <Typography>
//                 Anvcnvmnvmxcnvmxcvxcv mnv,mxc v,cxnvmx nv,
//               </Typography>
//               <Typography>
//                 Anvcnvmnvmxcnvmxcvxcv mnv,mxc v,cxnvmx nv,
//               </Typography>
//               <Typography>
//                 Anvcnvmnvmxcnvmxcvxcv mnv,mxc v,cxnvmx nv,
//               </Typography>
//               <Typography>
//                 Anvcnvmnvmxcnvmxcvxcv mnv,mxc v,cxnvmx nv,
//               </Typography>
//               <Typography>
//                 Anvcnvmnvmxcnvmxcvxcv mnv,mxc v,cxnvmx nv,
//               </Typography>
//             </Paper>
//           </Zoom>
//           </Grid>

//       </Grid>
//     </>
//   );
// };

// export default Account;
