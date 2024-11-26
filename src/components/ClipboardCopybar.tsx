import React from 'react';
import ClipCopybar from './ClipCopybar';
import LinkIcon from './icons/LinkIcon';
import GithubIcon from './icons/GithubIcon';

export interface ClipboardCopybarProps {
  time: string
  title: string
  color: string
}

const ClipboardCopybar: React.FC<ClipboardCopybarProps> = ({ time, title, color }) => {
  const link = `https://timer.eungyolee.kr/embed/?date=${time}&title=${title}&color=${color}`;
  const text = `<iframe src='${link}' style='border: none; height: 85px;'></iframe>`;

  return (
    <div className='clipboard-bar flex gap-3 mt-5 text-sm w-min'>
      <ClipCopybar text={text} />
      <ClipCopybar text={link} icon={<LinkIcon />} />
    </div>
  )
}

export default ClipboardCopybar;