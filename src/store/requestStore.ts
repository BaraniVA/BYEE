import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Request } from '../types';

interface RequestState {
  requests: Request[];
  addRequest: (request: Request) => void;
  acceptRequest: (requestId: string, helperId: string) => void;
  completeRequest: (requestId: string) => void;
  markAsReviewed: (requestId: string) => void;
}

export const useRequestStore = create<RequestState>()(
  persist(
    (set) => ({
      requests: [],
      addRequest: (request) =>
        set((state) => ({
          requests: [...state.requests, request],
        })),
      acceptRequest: (requestId, helperId) =>
        set((state) => ({
          requests: state.requests.map((request) =>
            request.id === requestId
              ? { ...request, helperId, status: 'accepted', updatedAt: new Date() }
              : request
          ),
        })),
      completeRequest: (requestId) =>
        set((state) => ({
          requests: state.requests.map((request) =>
            request.id === requestId
              ? { ...request, status: 'completed', updatedAt: new Date() }
              : request
          ),
        })),
      markAsReviewed: (requestId) =>
        set((state) => ({
          requests: state.requests.map((request) =>
            request.id === requestId
              ? { ...request, isReviewed: true }
              : request
          ),
        })),
    }),
    {
      name: 'requests-storage',
    }
  )
);