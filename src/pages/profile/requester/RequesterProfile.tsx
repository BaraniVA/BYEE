import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, MapPin } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';
import { LocationMap } from '../../../components/map/LocationMap';
import { LocationInput } from '../../../components/auth/LocationInput';

export const RequesterProfile: React.FC = () => {
  const { user, updateLocation } = useAuthStore();

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gray-200 rounded-full">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <button className="absolute bottom-0 right-0 bg-lime-500 p-2 rounded-full text-white hover:bg-lime-600">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            
            <div>
              <h1 className="text-2xl font-bold">{user?.name}</h1>
              {user?.location && (
                <div className="flex items-center gap-2 text-gray-600 mt-1">
                  <MapPin className="w-4 h-4" />
                  <span>Location saved</span>
                </div>
              )}
            </div>
          </div>
          
          <Link 
            to="/requester/profile/history" 
            className="text-lime-600 hover:text-lime-700"
          >
            View Request History
          </Link>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Default Location</h2>
          <LocationInput onLocationSelect={updateLocation} />
          
          {user?.location && (
            <div className="mt-4">
              <LocationMap 
                latitude={user.location.latitude}
                longitude={user.location.longitude}
                markers={[{ lat: user.location.latitude, lng: user.location.longitude }]}
              />
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
        <h2 className="text-xl font-semibold">Profile Settings</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Preferred Contact Method
            </label>
            <select className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-lime-500 focus:border-lime-500">
              <option>In-app messaging</option>
              <option>SMS</option>
              <option>Phone call</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Emergency Contact
            </label>
            <input
              type="text"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-lime-500 focus:border-lime-500"
              placeholder="Emergency contact name"
            />
            <input
              type="tel"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-lime-500 focus:border-lime-500"
              placeholder="Emergency contact phone"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-lime-500 text-white py-2 px-4 rounded-lg hover:bg-lime-600 transition-colors"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};