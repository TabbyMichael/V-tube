import { useQuery } from 'react-query';
import { useAuthStore } from '../store/authStore';
import VideoCard from '../components/VideoCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { youtube } from '../lib/youtube';

export default function WatchLaterPage() {
  const { user } = useAuthStore();

  const { data, status } = useQuery(
    'watch-later',
    async () => {
      if (!user) throw new Error('Not authenticated');
      
      const response = await youtube.get('/playlistItems', {
        params: {
          part: 'snippet,contentDetails',
          playlistId: 'WL',
          maxResults: 25,
        },
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      });
      return response.data;
    },
    {
      enabled: !!user,
    }
  );

  if (!user) {
    return (
      <div className="pt-16 pl-64">
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Watch Later</h1>
          <p>Please sign in to view your watch later list.</p>
        </div>
      </div>
    );
  }

  if (status === 'loading') return <LoadingSpinner />;
  if (status === 'error') return <div>Error loading watch later videos</div>;

  return (
    <div className="pt-16 pl-64">
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Watch Later</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.items.map((item: any) => (
            <VideoCard
              key={item.id}
              id={item.snippet.resourceId.videoId}
              title={item.snippet.title}
              channelName={item.snippet.channelTitle}
              thumbnail={item.snippet.thumbnails.medium.url}
              views={0}
              timestamp={new Date(item.snippet.publishedAt).toLocaleDateString()}
              duration=""
            />
          ))}
        </div>
      </div>
    </div>
  );
}