import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const UnauthenticatedNav: React.FC = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <button 
          className="text-gray-700 hover:text-lime-500 transition-colors px-4 py-2"
          onClick={() => setLoginOpen(!loginOpen)}
          onBlur={() => setTimeout(() => setLoginOpen(false), 200)}
        >
          Login
        </button>
        {loginOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
            <Link
              to="/helper/login"
              className="block px-4 py-2 text-gray-700 hover:bg-lime-50"
            >
              Login as Helper
            </Link>
            <Link
              to="/requester/login"
              className="block px-4 py-2 text-gray-700 hover:bg-lime-50"
            >
              Login as Requester
            </Link>
          </div>
        )}
      </div>
      <div className="relative">
        <button 
          className="bg-lime-500 text-white px-4 py-2 rounded-lg hover:bg-lime-600 transition-colors"
          onClick={() => setSignupOpen(!signupOpen)}
          onBlur={() => setTimeout(() => setSignupOpen(false), 200)}
        >
          Sign Up
        </button>
        {signupOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
            <Link
              to="/helper/signup"
              className="block px-4 py-2 text-gray-700 hover:bg-lime-50"
            >
              Sign Up as Helper
            </Link>
            <Link
              to="/requester/signup"
              className="block px-4 py-2 text-gray-700 hover:bg-lime-50"
            >
              Sign Up as Requester
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};