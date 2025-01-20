import React from 'react';
import { useAuthStore } from '../../../store/authStore';
import { useRequestStore } from '../../../store/requestStore';
import { RequestList } from '../../../components/requests/RequestList';

export const RequestHistory: React.FC = () => {
  const { user } = useAuthStore();
  const { requests } = useRequestStore();

  const completedRequests = requests
    .filter(request => 
      request.helperId === user?.id && 
      request.status === 'completed'
    )
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Request History</h2>
      <RequestList
        requests={completedRequests}
        status="completed"
        emptyMessage="No completed requests yet"
      />
    </div>
  );
};