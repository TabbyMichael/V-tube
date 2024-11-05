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
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <Sidebar />
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
        </Router>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default App;