import React from 'react';
import { RatingEmoji } from './RatingEmoji';
import { useReviewStore } from '../../store/reviewStore';
import { formatTimeAgo } from '../../utils/date';

interface ReviewListProps {
  userId: string;
}

export const ReviewList: React.FC<ReviewListProps> = ({ userId }) => {
  const { reviews } = useReviewStore();
  const userReviews = reviews
    .filter(review => review.toUserId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  if (userReviews.length === 0) {
    return (
      <p className="text-gray-500 text-center py-4">
        No reviews yet
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {userReviews.map((review) => (
        <div key={review.id} className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <RatingEmoji rating={review.rating} />
            <div className="flex-1">
              <p className="font-medium">Anonymous User</p>
              <p className="text-sm text-gray-500">
                {formatTimeAgo(review.createdAt)} ago
              </p>
            </div>
          </div>
          {review.comment && (
            <p className="text-gray-700">{review.comment}</p>
          )}
        </div>
      ))}
    </div>
  );
};