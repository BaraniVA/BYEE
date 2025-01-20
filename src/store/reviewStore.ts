import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Review } from '../types';

interface ReviewState {
  reviews: Review[];
  addReview: (review: Review) => void;
  getReviewsForUser: (userId: string) => Review[];
  getAverageRating: (userId: string) => number;
}

export const useReviewStore = create<ReviewState>()(
  persist(
    (set, get) => ({
      reviews: [],
      addReview: (review) =>
        set((state) => ({
          reviews: [...state.reviews, review],
        })),
      getReviewsForUser: (userId) =>
        get().reviews.filter((review) => review.toUserId === userId),
      getAverageRating: (userId) => {
        const userReviews = get().getReviewsForUser(userId);
        if (userReviews.length === 0) return 0;
        const sum = userReviews.reduce((acc, review) => acc + review.rating, 0);
        return sum / userReviews.length;
      },
    }),
    {
      name: 'reviews-storage',
    }
  )
);