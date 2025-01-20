export type UserRole = 'helper' | 'requester';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  bio?: string;
  phone?: string;
  emergencyContact?: string;
  photoUrl?: string;
  specialties?: string[];
  availability?: string[];
  languages?: string[];
  location?: {
    latitude: number;
    longitude: number;
  };
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface VerificationData {
  idDocument?: File;
  selfie?: File;
  backgroundCheck?: File;
}