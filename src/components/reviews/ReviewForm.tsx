import React, { useState } from 'react';
import { RatingStars } from './RatingStars';
import { useReviewStore } from '../../store/reviewStore';
import { useAuthStore } from '../../store/authStore';
import { useRequestStore } from '../../store/requestStore';

interface ReviewFormProps {
  requestId: string;
  toUserId: string;
  onSubmit?: () => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
  requestId,
  toUserId,
  onSubmit,
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { addReview } = useReviewStore();
  const { user } = useAuthStore();
  const { markAsReviewed } = useRequestStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || rating === 0) return;

    addReview({
      id: Date.now().toString(),
      requestId,
      fromUserId: user.id,
      toUserId,
      rating,
      comment,
      createdAt: new Date(),
    });

    markAsReviewed(requestId);
    setRating(0);
    setComment('');
    onSubmit?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rating
        </label>
        <RatingStars rating={rating} onRatingChange={setRating} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Comment (Optional)
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-lime-500 focus:border-lime-500"
          rows={3}
          placeholder="Share your experience..."
        />
      </div>

      <button
        type="submit"
        disabled={rating === 0}
        className="w-full bg-lime-500 text-white py-2 px-4 rounded-lg hover:bg-lime-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Submit Review
      </button>
    </form>
  );
};