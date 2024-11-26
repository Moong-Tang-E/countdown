import React, { useState, useCallback } from 'react';
import ClipboardCopybar from '../components/ClipboardCopybar';
import ColorPickInput from '../components/ColorPickInput';

const DEFAULT_TIME = '20250101,000000';
const DEFAULT_COLOR = '000000';
const DEFAULT_TITLE = 'By 2025';

const MainPage: React.FC = () => {
  const [time, setTime] = useState(DEFAULT_TIME);
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [title, setTitle] = useState(DEFAULT_TITLE);

  const handleTimeChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    setTime(ev.target.value.replaceAll(/[(\-|:)|(T)]/g, match => (match === 'T' ? ',' : '')) + '00');
  }, []);

  const handleTitleChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(ev.target.value);
  }, []);

  return (
    <div className='flex flex-col items-center justify-center text-black bg-gray-900 p-5 gap-5 h-screen w-screen'>
      <div className='w-1/2 p-5 rounded-lg shadow bg-gray-50'>
        <h2 className='text-2xl mb-3 font-bold'>Countdown Generator</h2>
        <form className='mb-5'>
          <ul>
            <li className='mb-3'>
              <label className='text-lg'>Target Date</label>
              <input
                className='text-black border border-gray-300 rounded px-3 py-2 w-full'
                type='datetime-local'
                defaultValue='2025-01-01T00:00'
                onChange={handleTimeChange}
              />
            </li>
            <li className='mb-3'>
              <ColorPickInput color={color} setColor={setColor} />
            </li>
            <li className='mb-3'>
              <label className='text-lg'>Title</label>
              <input
                type='text'
                defaultValue={DEFAULT_TITLE}
                onChange={handleTitleChange}
                className='text-black border border-gray-300 rounded px-3 py-2 w-full'
              />
            </li>
          </ul>
        </form>
        <iframe
          src={`/embed/?date=${time}&title=${encodeURIComponent(title)}&color=${encodeURIComponent(color)}`}
          style={{ border: 'none', height: '95px', backgroundColor: "#D1D5DB", justifySelf: 'center' }}
          className='w-full'
        />
        <div className='w-full h-px bg-gray-50 mt-8 flex items-center justify-center' />
        <ClipboardCopybar time={time} title={title} color={color} />
      </div>
    </div>
  );
}

export default React.memo(MainPage);
