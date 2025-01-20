import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User as UserIcon } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';

export const AuthenticatedNav: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <Link
        to={`/${user?.role}/dashboard`}
        className="text-gray-700 hover:text-lime-500 transition-colors"
      >
        Dashboard
      </Link>
      <Link
        to={`/${user?.role}/profile`}
        className="text-gray-700 hover:text-lime-500 transition-colors"
      >
        <UserIcon className="w-6 h-6" />
      </Link>
      <button
        onClick={handleLogout}
        className="text-gray-700 hover:text-lime-500 transition-colors"
      >
        <LogOut className="w-6 h-6" />
      </button>
    </>
  );
};