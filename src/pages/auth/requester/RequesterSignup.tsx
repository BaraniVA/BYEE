import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';
import { validatePassword, validateEmail } from '../../../utils/validation';
import { LocationInput } from '../../../components/auth/LocationInput';

export const RequesterSignup: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [errors, setErrors] = useState<string[]>([]);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;

    // Validate inputs
    const passwordErrors = validatePassword(password);
    if (!validateEmail(email)) {
      passwordErrors.push('Invalid email address');
    }
    if (passwordErrors.length > 0) {
      setErrors(passwordErrors);
      return;
    }

    // Create user
    setUser({
      id: Date.now().toString(),
      email,
      name,
      role: 'requester',
      isVerified: true, // Requesters don't need verification
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    navigate('/requester/dashboard');
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Create Requester Account</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <div className="mt-1 relative">
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-lime-500 focus:border-lime-500"
              placeholder="Enter your name"
            />
            <User className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="mt-1 relative">
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-lime-500 focus:border-lime-500"
              placeholder="Enter your email"
            />
            <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="mt-1 relative">
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-lime-500 focus:border-lime-500"
              placeholder="Create a password"
            />
            <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <LocationInput 
          onLocationSelect={(location) => {
            // Handle location selection
          }} 
        />

        {errors.length > 0 && (
          <div className="bg-red-50 text-red-500 p-4 rounded-lg">
            <ul className="list-disc list-inside">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-lime-500 text-white py-2 px-4 rounded-lg hover:bg-lime-600 transition-colors"
        >
          Sign Up as Requester
        </button>
      </form>

      <p className="mt-4 text-center text-gray-600">
        Already have an account?{' '}
        <Link to="/requester/login" className="text-lime-500 hover:text-lime-600">
          Log in
        </Link>
      </p>
    </div>
  );
};