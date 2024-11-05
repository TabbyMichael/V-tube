import { useQuery } from 'react-query';
import { useAuthStore } from '../store/authStore';
import LoadingSpinner from '../components/LoadingSpinner';
import { youtube } from '../lib/youtube';

export default function ChannelPage() {
  const { user } = useAuthStore();

  const { data, status } = useQuery(
    'channel',
    async () => {
      if (!user) throw new Error('Not authenticated');
      
      const response = await youtube.get('/channels', {
        params: {
          part: 'snippet,statistics',
          mine: true,
        },
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      });
      return response.data.items[0];
    },
    {
      enabled: !!user,
    }
  );

  if (!user) {
    return (
      <div className="pt-16 pl-64">
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Your Channel</h1>
          <p>Please sign in to view your channel.</p>
        </div>
      </div>
    );
  }

  if (status === 'loading') return <LoadingSpinner />;
  if (status === 'error') return <div>Error loading channel data</div>;

  return (
    <div className="pt-16 pl-64">
      <div className="p-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center space-x-4">
            <img
              src={data.snippet.thumbnails.medium.url}
              alt={data.snippet.title}
              className="w-24 h-24 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold">{data.snippet.title}</h1>
              <p className="text-gray-600">{data.statistics.subscriberCount} subscribers</p>
              <p className="text-gray-600">{data.statistics.videoCount} videos</p>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-600">{data.snippet.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}