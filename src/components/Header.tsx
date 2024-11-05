import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, VideoCameraIcon, BellIcon, UserCircleIcon, Bars3Icon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';

export default function Header({ toggleSidebar, isDarkMode, toggleDarkMode }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 h-16 shadow-sm z-50">
      <div className="h-full flex items-center justify-between px-4">
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <Bars3Icon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
          <Link to="/" className="flex items-center ml-4">
            <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">YouTube</span>
          </Link>
        </div>

        <div className="flex-1 max-w-2xl mx-8">
          <div className="flex">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-full focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
              />
            </div>
            <button className="px-6 bg-gray-100 dark:bg-gray-700 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-full hover:bg-gray-200 dark:hover:bg-gray-600">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button onClick={toggleDarkMode} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            {isDarkMode ? <SunIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" /> : <MoonIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />}
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <VideoCameraIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <BellIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
          <button className="p-2">
            <UserCircleIcon className="h-8 w-8 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>
    </header>
  );
}