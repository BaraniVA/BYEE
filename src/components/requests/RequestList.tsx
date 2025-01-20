import React from 'react';
import { RequestCard } from './RequestCard';
import { Request } from '../../types';

interface RequestListProps {
  requests: Request[];
  status: 'pending' | 'active' | 'completed';
  emptyMessage: string;
  renderActions?: (request: Request) => React.ReactNode;
}

export const RequestList: React.FC<RequestListProps> = ({
  requests,
  status,
  emptyMessage,
  renderActions,
}) => {
  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <RequestCard
          key={request.id}
          request={request}
          status={status}
          actions={renderActions?.(request)}
        />
      ))}
      
      {requests.length === 0 && (
        <p className="text-center text-gray-500 py-8">{emptyMessage}</p>
      )}
    </div>
  );
};