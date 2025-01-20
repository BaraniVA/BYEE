import React from 'react';
import { X } from 'lucide-react';
import { ReviewForm } from './ReviewForm';

interface ReviewModalProps {
  requestId: string;
  helperId: string;
  onClose: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ requestId, helperId, onClose }) => {
  const handleSubmit = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h2 className="text-xl font-semibold mb-4">Rate Your Experience</h2>
        <p className="text-gray-600 mb-6">
          Your feedback helps maintain the quality of our helper community.
        </p>
        
        <ReviewForm
          requestId={requestId}
          toUserId={helperId}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};