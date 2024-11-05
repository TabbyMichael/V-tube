import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import TrendingPage from './pages/TrendingPage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import HistoryPage from './pages/HistoryPage';
import LikedVideosPage from './pages/LikedVideosPage';
import WatchLaterPage from './pages/WatchLaterPage';
import ChannelPage from './pages/ChannelPage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';
import WatchPage from './pages/WatchPage';

const queryClient = new QueryClient();

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID as string}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <Header toggleSidebar={toggleSidebar} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            <div className="flex">
              <Sidebar isOpen={isSidebarOpen} />
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<Feed />} />
                  <Route path="/trending" element={<TrendingPage />} />
                  <Route path="/subscriptions" element={<SubscriptionsPage />} />
                  <Route path="/history" element={<HistoryPage />} />
                  <Route path="/liked" element={<LikedVideosPage />} />
                  <Route path="/watchlater" element={<WatchLaterPage />} />
                  <Route path="/channel" element={<ChannelPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/help" element={<HelpPage />} />
                  <Route path="/watch/:videoId" element={<WatchPage />} />
                </Routes>
              </div>
            </div>
          </div>
        </Router>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default App;