import React from 'react';
import { MapPin, Phone, Mail, Globe2 } from 'lucide-react';
import type { AuthUser } from '../../types/auth';

interface ProfileInfoProps {
  user: AuthUser;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ user }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-gray-600">
        <Mail className="w-4 h-4" />
        <span>{user.email}</span>
      </div>
      
      {user.phone && (
        <div className="flex items-center gap-2 text-gray-600">
          <Phone className="w-4 h-4" />
          <span>{user.phone}</span>
        </div>
      )}

      {user.location && (
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>Location set</span>
        </div>
      )}

      {user.languages && user.languages.length > 0 && (
        <div className="flex items-center gap-2 text-gray-600">
          <Globe2 className="w-4 h-4" />
          <span>{user.languages.join(', ')}</span>
        </div>
      )}

      {user.bio && (
        <p className="text-gray-700 mt-4">{user.bio}</p>
      )}

      {user.specialties && user.specialties.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Specialties</h3>
          <div className="flex flex-wrap gap-2">
            {user.specialties.map((specialty, index) => (
              <span
                key={index}
                className="bg-lime-50 text-lime-700 px-3 py-1 rounded-full text-sm"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};