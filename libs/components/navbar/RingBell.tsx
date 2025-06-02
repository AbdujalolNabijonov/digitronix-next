import { Notifications, NotificationsActive } from '@mui/icons-material';
import { Badge, Box, Stack } from '@mui/material';
import React from 'react';

const RingBell = (props: { total: number }) => {
  const { total } = props
  return (
    <Stack className='relative'>
      <button className="ring-btn">
        <Notifications className='bell' />
        <NotificationsActive className='bell-ring' />
      </button>
      {
        total ? (
          <Box className='absolute  -top-1 -right-1 bg-blue-300 text-black font-bold h-[23px] w-[23px] rounded-full text-center'>
            <Badge badgeContent={total} />
          </Box>
        ) : null
      }
    </Stack>
  );
}

export default RingBell;
