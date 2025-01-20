import React from 'react';
import { MapPin, Clock, AlertCircle } from 'lucide-react';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
          <h2 className="text-xl font-semibold">Create New Request</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Situation Type
              </label>
              <select className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-lime-500 focus:border-lime-500">
                <option>Awkward Date</option>
                <option>Family Gathering</option>
                <option>Work Event</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea 
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-lime-500 focus:border-lime-500"
                rows={3}
                placeholder="Describe your situation..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-lime-500 text-white py-2 px-4 rounded-lg hover:bg-lime-600 transition-colors"
            >
              Request Help
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
          <h2 className="text-xl font-semibold">Active Requests</h2>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Awkward Date</span>
                <span className="text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full text-sm">
                  Pending
                </span>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>2.5 miles away</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>5 minutes ago</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>High Priority</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};