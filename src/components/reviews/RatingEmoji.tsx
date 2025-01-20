import React from 'react';
import { Frown, Meh, Smile, Heart } from 'lucide-react';

interface RatingEmojiProps {
  rating: number;
  size?: number;
}

export const RatingEmoji: React.FC<RatingEmojiProps> = ({ rating, size = 24 }) => {
  const getEmoji = () => {
    if (rating <= 2) return <Frown size={size} className="text-red-500" />;
    if (rating === 3) return <Meh size={size} className="text-yellow-500" />;
    if (rating === 4) return <Smile size={size} className="text-lime-500" />;
    return <Heart size={size} className="text-pink-500" />;
  };

  return getEmoji();
};