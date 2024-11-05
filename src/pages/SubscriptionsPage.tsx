import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import VideoCard from '../components/VideoCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { youtube } from '../lib/youtube';

export default function SubscriptionsPage() {
  const { user } = useAuthStore();
  const { ref, inView } = useInView();

  const fetchSubscriptions = async ({ pageParam = '' }) => {
    if (!user) throw new Error('Not authenticated');
    
    const response = await youtube.get('/subscriptions', {
      params: {
        part: 'snippet',
        mine: true,
        maxResults: 12,
        pageToken: pageParam,
        order: 'relevance',
      },
      headers: {
        Authorization: `Bearer ${user.access_token}`,
      },
    });
    return response.data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery('subscriptions', fetchSubscriptions, {
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
    enabled: !!user,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (!user) {
    return (
      <div className="pt-16 pl-64">
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Subscriptions</h1>
          <p>Please sign in to view your subscriptions.</p>
        </div>
      </div>
    );
  }

  if (status === 'loading') return <LoadingSpinner />;
  if (status === 'error') return <div>Error loading subscriptions</div>;

  return (
    <div className="pt-16 pl-64">
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Subscriptions</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.pages.map((page) =>
            page.items.map((subscription: any) => (
              <VideoCard
                key={subscription.id}
                id={subscription.snippet.resourceId.channelId}
                title={subscription.snippet.title}
                channelName={subscription.snippet.channelTitle}
                thumbnail={subscription.snippet.thumbnails.medium.url}
                views={0}
                timestamp={new Date(subscription.snippet.publishedAt).toLocaleDateString()}
                duration=""
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