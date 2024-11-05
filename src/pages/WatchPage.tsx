import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchVideoDetails, fetchRelatedVideos } from '../lib/youtube';
import LoadingSpinner from '../components/LoadingSpinner';
import VideoCard from '../components/VideoCard';

export default function WatchPage() {
  const { videoId } = useParams<{ videoId: string }>();

  const { data: video, status: videoStatus } = useQuery(['video', videoId], () =>
    fetchVideoDetails(videoId!)
  );

  const { data: relatedVideos, status: relatedStatus } = useQuery(['relatedVideos', videoId], () =>
    fetchRelatedVideos(videoId!)
  );

  if (videoStatus === 'loading' || relatedStatus === 'loading') return <LoadingSpinner />;
  if (videoStatus === 'error' || relatedStatus === 'error') return <div>Error loading video</div>;

  if (!video) return <div>No video data available</div>;

  return (
    <div className="pt-16 pl-64 flex">
      <div className="flex-1 p-8">
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
      </div>

      <div className="w-1/3 p-8">
        <h2 className="text-xl font-bold mb-4">Suggested Videos</h2>
        <div className="space-y-4">
          {relatedVideos?.items.map((relatedVideo: any) => (
            <VideoCard
              key={relatedVideo.id.videoId}
              id={relatedVideo.id.videoId}
              title={relatedVideo.snippet.title}
              channelName={relatedVideo.snippet.channelTitle}
              thumbnail={relatedVideo.snippet.thumbnails.medium.url}
              views={0}
              timestamp={new Date(relatedVideo.snippet.publishedAt).toLocaleDateString()}
              duration=""
            />
          ))}
        </div>
      </div>
    </div>
  );
}