import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import VideoCard from './VideoCard';
import { fetchVideos } from '../lib/youtube';
import LoadingSpinner from './LoadingSpinner';

export default function Feed() {
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    'videos',
    fetchVideos,
    {
      getNextPageParam: (lastPage) => lastPage.nextPageToken,
    }
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'error') {
    return <div>Error loading videos</div>;
  }

  return (
    <div className="pt-16 pl-64">
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.pages.map((page) =>
            page.items.map((video: any) => (
              <VideoCard
                key={video.id}
                id={video.id}
                title={video.snippet.title}
                channelName={video.snippet.channelTitle}
                thumbnail={video.snippet.thumbnails.medium.url}
                views={parseInt(video.statistics.viewCount)}
                timestamp={new Date(video.snippet.publishedAt).toLocaleDateString()}
                duration={video.contentDetails.duration}
              />
            ))
          )}
        </div>
        <div ref={ref} className="flex justify-center mt-8">
          {isFetchingNextPage && <LoadingSpinner />}
        </div>
      </div>
    </div>
  );
}