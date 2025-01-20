import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { useRequestStore } from '../../store/requestStore';
import { useReviewStore } from '../../store/reviewStore';
import { Ban, CheckCircle } from 'lucide-react';
import { OverviewCard } from './components/OverviewCard';
import { SystemAlertsCard } from './components/SystemAlertsCard';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { requests } = useRequestStore();
  const { reviews } = useReviewStore();

  // In a real app, we'd check if the user has admin privileges
  if (!user?.isAdmin) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
        <p className="mt-2 text-gray-600">You don't have permission to view this page.</p>
      </div>
    );
  }

  const pendingRequests = requests.filter((req) => req.status === 'pending');
  const activeRequests = requests.filter((req) => req.status === 'accepted');
  const lowRatedUsers = reviews.filter((review) => review.rating < 3);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <OverviewCard
          totalUsers={Object.keys(reviews).length}
          activeRequests={activeRequests.length}
          pendingRequests={pendingRequests.length}
        />

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Recent Reports</h2>
          <div className="space-y-4">
            {lowRatedUsers.slice(0, 5).map((review) => (
              <div key={review.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">User reported</p>
                  <p className="text-sm text-gray-600">Rating: {review.rating}/5</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                    <Ban className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <SystemAlertsCard pendingRequests={pendingRequests} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-2">User</th>
                <th className="pb-2">Role</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[1, 2, 3].map((i) => (
                <tr key={i}>
                  <td className="py-3">User {i}</td>
                  <td className="py-3">{i % 2 === 0 ? 'Helper' : 'Requester'}</td>
                  <td className="py-3">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-50 text-green-600">
                      Active
                    </span>
                  </td>
                  <td className="py-3">
                    <button className="text-red-600 hover:text-red-700">Ban</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {requests.slice(0, 5).map((request) => (
              <div key={request.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{request.situationType}</p>
                  <p className="text-sm text-gray-600">
                    Status: {request.status}
                  </p>
                </div>
                <span className="text-sm text-gray-400">
                  {new Date(request.createdAt).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};