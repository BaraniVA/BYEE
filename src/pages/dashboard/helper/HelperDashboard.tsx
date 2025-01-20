import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import { useRequestStore } from '../../../store/requestStore';
import { ChatButton } from '../../../components/chat/ChatButton';
import { RequestList } from '../../../components/requests/RequestList';

export const HelperDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { requests, acceptRequest, completeRequest } = useRequestStore();

  const pendingRequests = requests
    .filter((request) => request.status === 'pending')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const activeRequests = requests
    .filter((request) => request.helperId === user?.id && request.status === 'accepted')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Helper Dashboard</h1>
        <Link 
          to="/helper/profile/history" 
          className="text-lime-600 hover:text-lime-700"
        >
          View Request History
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
          <h2 className="text-xl font-semibold">Available Requests</h2>
          <RequestList
            requests={pendingRequests}
            status="pending"
            emptyMessage="No available requests at the moment"
            renderActions={(request) => (
              <button
                onClick={() => user?.id && acceptRequest(request.id, user.id)}
                className="w-full bg-lime-500 text-white py-2 px-4 rounded-lg hover:bg-lime-600 transition-colors"
              >
                Accept Request
              </button>
            )}
          />
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
          <h2 className="text-xl font-semibold">Your Active Helps</h2>
          <RequestList
            requests={activeRequests}
            status="active"
            emptyMessage="No active helps at the moment"
            renderActions={(request) => (
              <div className="flex items-center gap-4">
                <ChatButton requestId={request.id} otherUserId={request.userId} />
                <button
                  onClick={() => completeRequest(request.id)}
                  className="bg-lime-500 text-white px-4 py-2 rounded-lg hover:bg-lime-600 transition-colors"
                >
                  Complete Help
                </button>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};