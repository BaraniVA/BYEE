import React from 'react';
import { Camera, MapPin } from 'lucide-react';

export const Profile: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-sm">
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
            <h1 className="text-2xl font-bold">Sarah Johnson</h1>
            <div className="flex items-center gap-2 text-gray-600 mt-1">
              <MapPin className="w-4 h-4" />
              <span>San Francisco, CA</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
        <h2 className="text-xl font-semibold">Profile Settings</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-lime-500 focus:border-lime-500"
              defaultValue="Sarah Johnson"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-lime-500 focus:border-lime-500"
              rows={3}
              defaultValue="Professional helper with 5+ years of experience in social situations."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Preferred Situations
            </label>
            <div className="mt-2 space-y-2">
              {['Awkward Dates', 'Family Gatherings', 'Work Events'].map((situation) => (
                <label key={situation} className="flex items-center gap-2">
                  <input type="checkbox" className="rounded text-lime-500 focus:ring-lime-500" />
                  <span>{situation}</span>
                </label>
              ))}
            </div>
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