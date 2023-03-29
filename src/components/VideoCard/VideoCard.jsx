import React from 'react';
import { formatAgo } from '../../util/date';
import { useNavigate } from 'react-router-dom';

function VideoCard({ video, type }) {
  const { title, thumbnails, channelTitle, publishedAt } = video.snippet;
  const navigate = useNavigate();
  const isList = type === 'list';
  const handleClick = () => {
    navigate(`/videos/watch/${video.id}`, { state: { video } });
  };
  return (
    <li
      className={
        'cursor-pointer transition-transform hover:scale-110 ' +
        (isList ? 'flex gap-1 m-2' : '')
      }
      onClick={handleClick}
    >
      <img
        className={isList ? 'w-60 mr-2' : 'w-full'}
        src={thumbnails.medium.url}
        alt={title}
      />
      <div>
        <p className={'font-semibold my-2 line-clamp-2'}>{title}</p>
        <p className={'text-sm opacity-80'}>{channelTitle}</p>
        <p className={'text-sm opacity-80'}>{formatAgo(publishedAt)}</p>
      </div>
    </li>
  );
}

export default VideoCard;
