import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchVideoDetails } from '../lib/youtube';
import LoadingSpinner from '../components/LoadingSpinner';

export default function WatchPage() {
  const { videoId } = useParams<{ videoId: string }>();

  const { data: video, status } = useQuery(['video', videoId], () =>
    fetchVideoDetails(videoId!)
  );

  if (status === 'loading') return <LoadingSpinner />;
  if (status === 'error') return <div>Error loading video</div>;

  return (
    <div className="pt-16 pl-64">
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="aspect-w-16 aspect-h-9 mb-4">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title={video.snippet.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg"
            />
          </div>
          
          <h1 className="text-2xl font-bold mb-2">{video.snippet.title}</h1>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                {video.snippet.channelTitle[0]}
              </div>
              <div>
                <h2 className="font-semibold">{video.snippet.channelTitle}</h2>
                <p className="text-sm text-gray-600">
                  {parseInt(video.statistics.viewCount).toLocaleString()} views •{' '}
                  {new Date(video.snippet.publishedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                Subscribe
              </button>
            </div>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-4">
            <p className="whitespace-pre-wrap">{video.snippet.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}