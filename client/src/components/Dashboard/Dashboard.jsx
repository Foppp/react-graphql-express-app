import React from 'react';
import Badge from '@mui/material/Badge';

import { Button, Card, Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <>
      <Card elevation={6} component={Button}>
        <Typography>
          <Badge badgeContent='Active' color='primary'></Badge>
        </Typography>
      </Card>
    </>
  );
};

export default Dashboard;
