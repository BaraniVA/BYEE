import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Request } from '../../../types';
import { formatTimeAgo } from '../../../utils/date';

interface SystemAlertsCardProps {
  pendingRequests: Request[];
}

export const SystemAlertsCard: React.FC<SystemAlertsCardProps> = ({ pendingRequests }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm">
    <h2 className="text-xl font-semibold mb-4">System Alerts</h2>
    <div className="space-y-4">
      {pendingRequests.slice(0, 5).map((request) => (
        <div key={request.id} className="flex items-center gap-3 text-yellow-600">
          <AlertTriangle className="w-5 h-5" />
          <div>
            <p className="font-medium">Request pending for {formatTimeAgo(request.createdAt)}</p>
            <p className="text-sm text-gray-600">
              Created: {new Date(request.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);