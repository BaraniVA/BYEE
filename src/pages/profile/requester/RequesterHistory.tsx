import React, { useState } from 'react';
import { useAuthStore } from '../../../store/authStore';
import { useRequestStore } from '../../../store/requestStore';
import { RequestList } from '../../../components/requests/RequestList';
import { ReviewModal } from '../../../components/reviews/ReviewModal';

export const RequesterHistory: React.FC = () => {
  const { user } = useAuthStore();
  const { requests } = useRequestStore();
  const [showReviewModal, setShowReviewModal] = useState<string | null>(null);

  const completedRequests = requests
    .filter(request => 
      request.userId === user?.id && 
      request.status === 'completed'
    )
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Your Request History</h2>
      <RequestList
        requests={completedRequests}
        status="completed"
        emptyMessage="No past requests yet"
        renderActions={(request) => (
          !request.isReviewed && (
            <button
              onClick={() => setShowReviewModal(request.id)}
              className="bg-lime-500 text-white px-4 py-2 rounded-lg hover:bg-lime-600 transition-colors"
            >
              Rate Helper
            </button>
          )
        )}
      />

      {showReviewModal && (
        <ReviewModal
          requestId={showReviewModal}
          helperId={requests.find(r => r.id === showReviewModal)?.helperId || ''}
          onClose={() => setShowReviewModal(null)}
        />
      )}
    </div>
  );
};