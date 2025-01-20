import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';
import { useReviewStore } from '../../../store/reviewStore';
import { LocationMap } from '../../../components/map/LocationMap';
import { LocationInput } from '../../../components/auth/LocationInput';
import { ReviewStats } from '../../../components/reviews/ReviewStats';
import { ReviewList } from '../../../components/reviews/ReviewList';
import { EditProfileForm } from '../../../components/profile/EditProfileForm';
import { ProfileInfo } from '../../../components/profile/ProfileInfo';

export const HelperProfile: React.FC = () => {
  const { user, updateUser, updateLocation } = useAuthStore();
  const { reviews } = useReviewStore();
  const [isEditing, setIsEditing] = useState(false);
  
  if (!user) return null;

  const userReviews = reviews.filter(review => review.toUserId === user.id);
  const ratings = userReviews.map(review => review.rating);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center gap-6 mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gray-200 rounded-full">
              <img
                src={user.photoUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-lime-500 p-2 rounded-full text-white hover:bg-lime-600">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-gray-600">Helper</p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-lime-500 text-white px-4 py-2 rounded-lg hover:bg-lime-600 transition-colors"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>
        </div>

        {isEditing ? (
          <EditProfileForm onCancel={() => setIsEditing(false)} />
        ) : (
          <ProfileInfo user={user} />
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
        <h2 className="text-xl font-semibold">Ratings & Reviews</h2>
        <ReviewStats ratings={ratings} />
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Recent Reviews</h3>
          <ReviewList userId={user.id} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
        <h2 className="text-xl font-semibold">Location</h2>
        <LocationInput
          onLocationSelect={updateLocation}
          defaultLocation={user.location}
        />
        
        {user.location && (
          <div className="mt-4">
            <LocationMap
              latitude={user.location.latitude}
              longitude={user.location.longitude}
              markers={[{ lat: user.location.latitude, lng: user.location.longitude }]}
            />
          </div>
        )}
      </div>
    </div>
  );
};