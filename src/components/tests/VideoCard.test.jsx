import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import VideoCard from '../VideoCard/VideoCard';
import '@testing-library/jest-dom';
import { formatAgo } from '../../util/date';

describe('VideoCard', () => {
  const video = {
    id: 1,
    snippet: {
      title: 'title',
      channelId: '1',
      channelTitle: 'channelTitle',
      publishedAt: new Date(),
      thumbnails: {
        medium: {
          url: 'http://image/',
        },
      },
    },
  };
  const { title, channelId, channelTitle, publishedAt, thumbnails } =
    video.snippet;

  it('renders video item', () => {
    render(
      <MemoryRouter>
        <VideoCard video={video} />
      </MemoryRouter>
    );

    const image = screen.getByRole('img');
    expect(image.src).toBe(thumbnails.medium.url);
    expect(image.alt).toBe(title);
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(channelTitle)).toBeInTheDocument();
    expect(screen.getByText(formatAgo(publishedAt))).toBeInTheDocument();
  });
});
