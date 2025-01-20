import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import type { AuthUser } from '../../types/auth';

interface EditProfileFormProps {
  onCancel: () => void;
}

export const EditProfileForm: React.FC<EditProfileFormProps> = ({ onCancel }) => {
  const { user, updateUser } = useAuthStore();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    phone: user?.phone || '',
    specialties: user?.specialties?.join(', ') || '',
    languages: user?.languages?.join(', ') || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const updatedUser: AuthUser = {
      ...user,
      ...formData,
      specialties: formData.specialties.split(',').map(s => s.trim()).filter(Boolean),
      languages: formData.languages.split(',').map(l => l.trim()).filter(Boolean),
      updatedAt: new Date(),
    };

    updateUser(updatedUser);
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-lime-500 focus:border-lime-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Bio
        </label>
        <textarea
          value={formData.bio}
          onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-lime-500 focus:border-lime-500"
          rows={3}
          placeholder="Tell us about yourself..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-lime-500 focus:border-lime-500"
          placeholder="+1 (555) 555-5555"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Specialties (comma-separated)
        </label>
        <input
          type="text"
          value={formData.specialties}
          onChange={(e) => setFormData(prev => ({ ...prev, specialties: e.target.value }))}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-lime-500 focus:border-lime-500"
          placeholder="Awkward dates, Family gatherings, Work events"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Languages (comma-separated)
        </label>
        <input
          type="text"
          value={formData.languages}
          onChange={(e) => setFormData(prev => ({ ...prev, languages: e.target.value }))}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-lime-500 focus:border-lime-500"
          placeholder="English, Spanish, French"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 bg-lime-500 text-white py-2 px-4 rounded-lg hover:bg-lime-600 transition-colors"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};