import React from 'react';
import { Scheduler } from '@aldabil/react-scheduler';
import { Paper } from '@mui/material';

const Account = () => {
  return (
    <Paper sx={{ width: '100%',
    padding: '30px',
    borderRadius: '20px'}}>
      <Scheduler
      view='month'
      events={[
        {
          event_id: 1,
          title: 'Event 1',
          start: new Date('2021 5 2 09:30'),
          end: new Date('2021 5 2 10:30'),
        },
        {
          event_id: 2,
          title: 'Event 2',
          start: new Date('2021 5 4 10:00'),
          end: new Date('2021 5 4 11:00'),
        },
      ]}
    />
    </Paper>
  );
};

export default Account;
