import React, { useState, useRef, useCallback } from 'react'
import useInterval from '../hooks/useInterval';

export interface DigitProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  getter: () => string
  ignoreBlink?: boolean
}

const Digit: React.FC<DigitProps> = React.memo(({ getter, ignoreBlink = false, ...props }) => {
  const [time, setTime] = useState<string>('00');
  const ref = useRef<HTMLDivElement>(null);

  const updateClassName = useCallback((includesBlink: boolean) => {
    if (ref.current) {
      ref.current.className = includesBlink ? 'digit blink' : 'digit';
    }
  }, []);

  useInterval(() => {
    const remainingTime = getter();
    if (time !== remainingTime) {
      setTime(remainingTime);

      if (ignoreBlink) {
        if (ref.current?.className.includes('blink')) {
          updateClassName(false);
        }
      } else {
        updateClassName(true);
        setTimeout(() => updateClassName(false), 200);
      }
    }
  }, 10);

  return (
    <div ref={ref} className='digit blink' {...props}>
      {time}
    </div>
  )
});

Digit.displayName = 'Digit';

export default Digit;