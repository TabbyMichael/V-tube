import React from 'react';
import { HomeIcon, FireIcon, ClockIcon, FilmIcon, HeartIcon, BookmarkIcon, UserIcon, CogIcon, QuestionMarkCircleIcon, MusicalNoteIcon, MicrophoneIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function Sidebar({ isOpen }) {
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
    { icon: MusicalNoteIcon, text: 'Music', path: '/music' },
    { icon: MicrophoneIcon, text: 'Podcasts', path: '/podcasts' },
    { text: 'YouTube Premium', path: '/premium' },
    { text: 'YouTube Music', path: '/youtube-music' },
    { text: 'YouTube Kids', path: '/youtube-kids' },
    { text: 'Report history', path: '/report-history' },
    { text: 'Send feedback', path: '/feedback' },
    { text: 'About', path: '/about' },
  ];

  return (
    <div className={`fixed left-0 top-16 h-full ${isOpen ? 'w-64' : 'w-16'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto transition-width duration-300`}>
      <div className="py-4">
        {menuItems.map((item) => (
          (!item.requiresAuth || user) && (
            <Link
              key={item.text}
              to={item.path}
              className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {item.icon && <item.icon className="h-6 w-6 mr-4" />}
              {isOpen && <span>{item.text}</span>}
            </Link>
          )
        ))}
      </div>
    </div>
  );
}