import { HomeIcon, FireIcon, ClockIcon, FilmIcon, HeartIcon, BookmarkIcon, UserIcon, CogIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function Sidebar() {
  const { user } = useAuthStore();

  const menuItems = [
    { icon: HomeIcon, text: 'Home', path: '/' },
    { icon: FireIcon, text: 'Trending', path: '/trending' },
    { icon: FilmIcon, text: 'Subscriptions', path: '/subscriptions', requiresAuth: true },
    { icon: ClockIcon, text: 'History', path: '/history', requiresAuth: true },
    { icon: HeartIcon, text: 'Liked Videos', path: '/liked', requiresAuth: true },
    { icon: BookmarkIcon, text: 'Watch Later', path: '/watchlater', requiresAuth: true },
    { icon: UserIcon, text: 'Your Channel', path: '/channel', requiresAuth: true },
    { icon: CogIcon, text: 'Settings', path: '/settings' },
    { icon: QuestionMarkCircleIcon, text: 'Help', path: '/help' },
  ];

  return (
    <div className="fixed left-0 top-16 h-full w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="py-4">
        {menuItems.map((item) => (
          (!item.requiresAuth || user) && (
            <Link
              key={item.text}
              to={item.path}
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
            >
              <item.icon className="h-6 w-6 mr-4" />
              <span>{item.text}</span>
            </Link>
          )
        ))}
      </div>
    </div>
  );
}