import React, { useState } from 'react';
import { MapPin, Clock, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';
import { useRequestStore } from '../../../store/requestStore';
import { LocationInput } from '../../../components/auth/LocationInput';
import { ChatButton } from '../../../components/chat/ChatButton';
import { ReviewModal } from '../../../components/reviews/ReviewModal';

export const RequesterDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { requests, addRequest } = useRequestStore();
  const [location, setLocation] = useState(user?.location);
  const [showReviewModal, setShowReviewModal] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (!location) {
      alert('Please select a location first');
      return;
    }

    const newRequest = {
      id: Date.now().toString(),
      userId: user?.id || '',
      situationType: formData.get('situationType') as string,
      description: formData.get('description') as string,
      location: location,
      urgencyLevel: formData.get('urgencyLevel') as 'low' | 'medium' | 'high',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addRequest(newRequest);
    e.currentTarget.reset();
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Requester Dashboard</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
          <h2 className="text-xl font-semibold">Create New Request</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <LocationInput
                onLocationSelect={(loc) => setLocation(loc)}
                defaultLocation={location}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Situation Type
              </label>
              <select 
                name="situationType"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-lime-500 focus:border-lime-500"
                required
              >
                <option value="awkward_date">Awkward Date</option>
                <option value="family_gathering">Family Gathering</option>
                <option value="work_event">Work Event</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea 
                name="description"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-lime-500 focus:border-lime-500"
                rows={3}
                placeholder="Describe your situation..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Urgency Level
              </label>
              <select 
                name="urgencyLevel"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-lime-500 focus:border-lime-500"
                required
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-lime-500 text-white py-2 px-4 rounded-lg hover:bg-lime-600 transition-colors"
            >
              Request Help
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
          <h2 className="text-xl font-semibold">Your Active Requests</h2>
          <div className="space-y-4">
            {requests
              .filter((request) => request.userId === user?.id)
              .map((request) => (
                <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{request.situationType}</span>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      request.status === 'pending'
                        ? 'bg-yellow-50 text-yellow-600'
                        : request.status === 'completed'
                        ? 'bg-blue-50 text-blue-600'
                        : 'bg-green-50 text-green-600'
                    }`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>Location set</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Created {new Date(request.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      <span>{request.urgencyLevel.charAt(0).toUpperCase() + request.urgencyLevel.slice(1)} Priority</span>
                    </div>
                    <p className="mt-2">{request.description}</p>
                    {request.helperId && request.status === 'accepted' && (
                      <div className="mt-4">
                        <ChatButton requestId={request.id} otherUserId={request.helperId} />
                      </div>
                    )}
                    {request.status === 'completed' && !request.isReviewed && (
                      <div className="mt-4">
                        <button
                          onClick={() => setShowReviewModal(request.id)}
                          className="bg-lime-500 text-white px-4 py-2 rounded-lg hover:bg-lime-600 transition-colors"
                        >
                          Rate Your Experience
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {showReviewModal && (
        <ReviewModal
          requestId={showReviewModal}
          helperId={requests.find(r => r.id === showReviewModal)?.helperId || ''}
          onClose={() => setShowReviewModal(null)}
        />
      )}
    </div>
  );
};