import { useState } from 'react';
import { Link } from 'react-router-dom';

interface VideoCardProps {
  id: string;
  title: string;
  channelName: string;
  thumbnail: string;
  views: number;
  timestamp: string;
  duration: string;
}

export default function VideoCard({ id, title, channelName, thumbnail, views, timestamp, duration }: VideoCardProps) {
  return (
    <div className="w-full">
      <Link to={`/watch/${id}`} className="block">
        <div className="relative">
          <img 
            src={thumbnail} 
            alt={title}
            className="w-full h-48 object-cover rounded-lg"
          />
          <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-sm px-2 py-1 rounded">
            {duration}
          </span>
        </div>
      </Link>
      <div className="mt-2 flex">
        <div className="flex-shrink-0 mr-3">
          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
            {channelName[0].toUpperCase()}
          </div>
        </div>
        <div>
          <Link to={`/watch/${id}`} className="block">
            <h3 className="text-sm font-semibold line-clamp-2 text-gray-900">
              {title}
            </h3>
          </Link>
          <Link to={`/channel/${channelName}`} className="block">
            <p className="text-sm text-gray-600 mt-1">{channelName}</p>
          </Link>
          <p className="text-sm text-gray-600">
            {views.toLocaleString()} views • {timestamp}
          </p>
        </div>
      </div>
    </div>
  );
}