import React from 'react';
import { MapPin, Clock, AlertCircle } from 'lucide-react';
import { Request } from '../../types';
import { formatTimeAgo } from '../../utils/date';

interface RequestCardProps {
  request: Request;
  status: 'pending' | 'active' | 'completed';
  actions?: React.ReactNode;
}

export const RequestCard: React.FC<RequestCardProps> = ({ request, status, actions }) => {
  const statusStyles = {
    pending: 'text-yellow-600 bg-yellow-50',
    active: 'text-green-600 bg-green-50',
    completed: 'text-blue-600 bg-blue-50',
  };

  const statusLabels = {
    pending: 'New Request',
    active: 'Active',
    completed: 'Completed',
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium">{request.situationType}</span>
        <span className={`px-2 py-1 rounded-full text-sm ${statusStyles[status]}`}>
          {statusLabels[status]}
        </span>
      </div>
      <div className="text-sm text-gray-600 space-y-1">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>Location available</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>
            {status === 'completed' 
              ? `Completed ${formatTimeAgo(request.updatedAt)} ago`
              : status === 'active'
              ? `Accepted ${new Date(request.updatedAt).toLocaleString()}`
              : `Created ${new Date(request.createdAt).toLocaleString()}`
            }
          </span>
        </div>
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>{request.urgencyLevel.charAt(0).toUpperCase() + request.urgencyLevel.slice(1)} Priority</span>
        </div>
        <p className="mt-2">{request.description}</p>
        {actions && <div className="mt-4">{actions}</div>}
      </div>
    </div>
  );
};