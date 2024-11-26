import { useRouter } from 'next/router';
import React, { useState, useCallback, useMemo } from 'react';
import Digit from '../components/Digit';
import { getRemainingTime } from '../utils/getRemainingTime';
import useInterval from '../hooks/useInterval';

const formatTimeString = (format: string, date: string): string => {
  return format.replace(/(?:^\$|[^\\]\$)(D|H|M|S)/gi, (_, p: string, index: number, string: string) => {
    const timeMap: Record<string, number> = {
      d: getRemainingTime(date, 'day', true),
      D: getRemainingTime(date, 'day', true),
      H: getRemainingTime(date, 'hour', true),
      h: getRemainingTime(date, 'hour'),
      M: getRemainingTime(date, 'minute', true),
      m: getRemainingTime(date, 'minute'),
      S: getRemainingTime(date, 'second', true),
      s: getRemainingTime(date, 'second')
    };
    return (index === 0 ? '' : string[index]) + (timeMap[p] ?? '').toString();
  });
};

const Title: React.FC<{ format: string; date: string }> = ({ format, date }) => {
  const [title, setTitle] = useState('');

  useInterval(() => {
    setTitle(formatTimeString(format, date));
  }, 10);

  if (!title) return null;
  return <div className='title'>{title}</div>;
};

const TimerEmbed: React.FC = () => {
  const { query } = useRouter();
  const date = query.date?.toString() || '';
  const title = query.title?.toString() || '';
  const color = query.color?.toString().replaceAll('#', '') || '000000';

  const isValidDate = useMemo(() => /\d{8},\d{6}/.test(date), [date]);

  const getTimeDigit = useCallback((unit: string) => {
    return () => getRemainingTime(date, unit).toString().padStart(2, '0');
  }, [date]);

  const getMiliseconds = useCallback(() => {
    return Math.round(getRemainingTime(date, 'milisecond') / 10)
      .toString()
      .slice(0, 2)
      .padStart(2, '0');
  }, [date]);

  return (
    <div className='timer-container bg-white'>
      <Title format={title} date={date} />
      <div className='timer' style={{ color: `#${color}` }}>
        {date && !isValidDate ? (
          <span className='text-red-500'>Invalid date format</span>
        ) : (
          <>
            <Digit getter={getTimeDigit('day')} />:
            <Digit getter={getTimeDigit('hour')} />:
            <Digit getter={getTimeDigit('minute')} />:
            <Digit getter={getTimeDigit('second')} style={{ marginRight: 0 }} />
            <div className='flex transform items-baseline translate-x-2'>
              .
              <Digit
                ignoreBlink
                getter={getMiliseconds}
                style={{ textAlign: 'left', fontSize: '0.5em', margin: 5, width: '20px' }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TimerEmbed;