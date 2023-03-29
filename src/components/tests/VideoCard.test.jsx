import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import VideoCard from '../VideoCard/VideoCard';
import '@testing-library/jest-dom';
import { formatAgo } from '../../util/date';
import userEvent from '@testing-library/user-event';

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
  it('navigates to detailed video page with video state when clicked', () => {
    function LocationStateDisplay() {
      return <pre>{JSON.stringify(useLocation().state)}</pre>;
    }
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<VideoCard video={video} />} />
          <Route
            path={`/videos/watch/${video.id}`}
            element={<LocationStateDisplay />}
          />
        </Routes>
      </MemoryRouter>
    );

    const card = screen.getByRole('listitem');
    userEvent.click(card);

    expect(screen.getByText(JSON.stringify({ video }))).toBeInTheDocument();
  });
});
