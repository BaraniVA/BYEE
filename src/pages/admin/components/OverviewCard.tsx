import React from 'react';

interface OverviewCardProps {
  totalUsers: number;
  activeRequests: number;
  pendingRequests: number;
}

export const OverviewCard: React.FC<OverviewCardProps> = ({
  totalUsers,
  activeRequests,
  pendingRequests,
}) => (
  <div className="bg-white p-6 rounded-xl shadow-sm">
    <h2 className="text-xl font-semibold mb-4">Overview</h2>
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-gray-600">Total Users</span>
        <span className="font-semibold">{totalUsers}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-600">Active Requests</span>
        <span className="font-semibold">{activeRequests}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-600">Pending Requests</span>
        <span className="font-semibold">{pendingRequests}</span>
      </div>
    </div>
  </div>
);