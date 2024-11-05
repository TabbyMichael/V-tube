import axios from 'axios';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const youtube = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

export const fetchVideos = async ({ pageParam = '' }) => {
  const response = await youtube.get('/videos', {
    params: {
      part: 'snippet,statistics,contentDetails',
      chart: 'mostPopular',
      maxResults: 12,
      pageToken: pageParam,
      regionCode: 'US',
    },
  });
  return response.data;
};

export const searchVideos = async (query: string, pageToken = '') => {
  const response = await youtube.get('/search', {
    params: {
      part: 'snippet',
      q: query,
      maxResults: 12,
      pageToken,
      type: 'video',
    },
  });
  return response.data;
};

export const fetchVideoDetails = async (videoId: string) => {
  const response = await youtube.get('/videos', {
    params: {
      part: 'snippet,statistics,contentDetails',
      id: videoId,
    },
  });
  return response.data.items[0];
};

export const fetchChannelDetails = async (channelId: string) => {
  const response = await youtube.get('/channels', {
    params: {
      part: 'snippet,statistics',
      id: channelId,
    },
  });
  return response.data.items[0];
};