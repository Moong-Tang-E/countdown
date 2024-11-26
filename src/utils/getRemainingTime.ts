const TIME_MULTIPLIERS = {
  day: 86400000,    // 1000 * 60 * 60 * 24
  hour: 3600000,    // 1000 * 60 * 60
  minute: 60000,    // 1000 * 60
  second: 1000,     // 1000
  milisecond: 1
} as const;

const parseDate = (date: string): Date => {
  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6, 8);
  const hour = date.slice(9, 11);
  const minute = date.slice(11, 13);
  const second = date.slice(13, 15);
  
  return new Date(+year, +month - 1, +day, +hour, +minute, +second);
};

type TimeType = 'day' | 'hour' | 'minute' | 'second' | 'milisecond';

export const getRemainingTime = (date: string, type: TimeType, all = false): number => {
  const timeDifference = parseDate(date).getTime() - Date.now();
  const multiplier = TIME_MULTIPLIERS[type];
  
  const result = all 
    ? timeDifference / multiplier 
    : (timeDifference / multiplier) % (type === 'day' ? Infinity : (multiplier === 1 ? 1000 : 60));
    
  return Math.max(Math.floor(result), 0);
};
