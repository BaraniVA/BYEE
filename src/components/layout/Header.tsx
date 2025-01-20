import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { AuthenticatedNav } from './nav/AuthenticatedNav';
import { UnauthenticatedNav } from './nav/UnauthenticatedNav';
import { NotificationBell } from '../notifications/NotificationBell';

export const Header: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-lime-500">BYEE</span>
          </Link>

          <nav className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <NotificationBell />
                <AuthenticatedNav />
              </>
            ) : (
              <UnauthenticatedNav />
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};