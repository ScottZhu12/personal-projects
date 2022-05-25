import React from 'react';
import { parseISO, formatDistanceToNow } from 'date-fns';

interface TimeAgoPros {
  timestamp: string;
}

const TimeAgo: React.FC<TimeAgoPros> = ({ timestamp }) => {
  let timeAgo = '';

  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <div className='time-ago' title={timestamp}>
      <i>{timeAgo}</i>
    </div>
  );
};

export default TimeAgo;
