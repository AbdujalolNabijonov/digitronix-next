import { Notifications, NotificationsActive } from '@mui/icons-material';
import React, { useEffect } from 'react';

const RingBell = () => {
  useEffect
  return (
      <button className="ring-btn">
        <Notifications className='bell' />
        <NotificationsActive className='bell-ring' />
      </button>
  );
}

export default RingBell;
