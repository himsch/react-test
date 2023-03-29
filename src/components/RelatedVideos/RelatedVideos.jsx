import React from 'react';
import { useYoutubeApi } from '../../context/YoutubeApiContext';
import { useQuery } from '@tanstack/react-query';
import VideoCard from '../VideoCard/VideoCard';

function RelatedVideos({ id }) {
  const { youtube } = useYoutubeApi();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(['related', id], () => youtube.relatedVideos(id), {
    staleTime: 1000 * 60 * 5,
  });
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong 🙃</p>}
      {videos && (
        <ul>
          {videos.map(video => (
            <VideoCard key={video.id} video={video} type={'list'} />
          ))}
        </ul>
      )}
    </>
  );
}

export default RelatedVideos;
