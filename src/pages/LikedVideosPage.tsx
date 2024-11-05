import { useQuery } from 'react-query';
import { useAuthStore } from '../store/authStore';
import VideoCard from '../components/VideoCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { youtube } from '../lib/youtube';

export default function LikedVideosPage() {
  const { user } = useAuthStore();

  const { data, status } = useQuery(
    'liked-videos',
    async () => {
      if (!user) throw new Error('Not authenticated');
      
      const response = await youtube.get('/videos', {
        params: {
          part: 'snippet,statistics,contentDetails',
          myRating: 'like',
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
          <h1 className="text-2xl font-bold mb-4">Liked Videos</h1>
          <p>Please sign in to view your liked videos.</p>
        </div>
      </div>
    );
  }

  if (status === 'loading') return <LoadingSpinner />;
  if (status === 'error') return <div>Error loading liked videos</div>;

  return (
    <div className="pt-16 pl-64">
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Liked Videos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.items.map((video: any) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}