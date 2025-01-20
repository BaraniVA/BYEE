import React, { useState } from 'react';
import { Upload } from 'lucide-react';

interface VerificationUploadProps {
  onFileSelect: (file: File) => void;
  type: 'id' | 'selfie' | 'background-check';
}

export const VerificationUpload: React.FC<VerificationUploadProps> = ({ onFileSelect, type }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'id':
        return 'Upload ID Document';
      case 'selfie':
        return 'Upload Selfie';
      case 'background-check':
        return 'Upload Background Check';
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        {getTitle()}
      </label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id={`file-${type}`}
        />
        <label
          htmlFor={`file-${type}`}
          className="cursor-pointer flex flex-col items-center"
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg mb-4"
            />
          ) : (
            <Upload className="w-12 h-12 text-gray-400 mb-4" />
          )}
          <span className="text-sm text-gray-600">
            Click to upload or drag and drop
          </span>
        </label>
      </div>
    </div>
  );
};