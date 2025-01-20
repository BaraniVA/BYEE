export interface Request {
  id: string;
  userId: string;
  situationType: string;
  description: string;
  location: {
    latitude: number;
    longitude: number;
  };
  urgencyLevel: 'low' | 'medium' | 'high';
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  helperId?: string;
  isReviewed?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ... rest of the types ...