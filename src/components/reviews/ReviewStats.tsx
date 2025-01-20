import React from 'react';
import { Star } from 'lucide-react';

interface ReviewStatsProps {
  ratings: number[];
}

export const ReviewStats: React.FC<ReviewStatsProps> = ({ ratings }) => {
  const averageRating = ratings.length 
    ? ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length 
    : 0;

  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= Math.round(averageRating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
      </div>
      <div>
        <span className="font-semibold">{averageRating.toFixed(1)}</span>
        <span className="text-gray-600 ml-1">({ratings.length} reviews)</span>
      </div>
    </div>
  );
};