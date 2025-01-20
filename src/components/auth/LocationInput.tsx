import React, { useState } from 'react';
import { MapPin, Search, Loader2 } from 'lucide-react';
import { useGeolocation } from '../../hooks/useGeolocation';
import { LocationMap } from '../map/LocationMap';
import { geocodeAddress } from '../../utils/geocoding';
import type { Location } from '../../types/location';

interface LocationInputProps {
  onLocationSelect: (location: Location) => void;
  defaultLocation?: Location;
}

export const LocationInput: React.FC<LocationInputProps> = ({ onLocationSelect, defaultLocation }) => {
  const { location, loading: geoLoading, getLocation } = useGeolocation();
  const [manualAddress, setManualAddress] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<Location | undefined>(defaultLocation);
  const [geocoding, setGeocoding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetLocation = () => {
    getLocation();
    if (location && !location.error) {
      handleLocationSelect(location);
    }
  };

  const handleLocationSelect = (loc: Location) => {
    setSelectedLocation(loc);
    onLocationSelect(loc);
    setError(null);
  };

  const handleManualAddress = async () => {
    if (!manualAddress.trim()) {
      setError('Please enter an address');
      return;
    }

    setGeocoding(true);
    setError(null);

    try {
      const result = await geocodeAddress(manualAddress);
      if (result) {
        handleLocationSelect(result);
      } else {
        setError('Address not found');
      }
    } catch (err) {
      setError('Error finding address');
    } finally {
      setGeocoding(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={handleGetLocation}
          className="flex items-center gap-2 bg-lime-100 text-lime-700 px-4 py-2 rounded-lg hover:bg-lime-200 transition-colors"
          disabled={geoLoading}
        >
          <MapPin className="w-5 h-5" />
          {geoLoading ? 'Getting location...' : 'Use current location'}
        </button>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Enter address manually
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={manualAddress}
            onChange={(e) => setManualAddress(e.target.value)}
            placeholder="Enter street address, city, country"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-lime-500 focus:border-lime-500"
            onKeyDown={(e) => e.key === 'Enter' && handleManualAddress()}
          />
          <button
            type="button"
            onClick={handleManualAddress}
            disabled={geocoding}
            className="bg-lime-500 text-white px-4 py-2 rounded-lg hover:bg-lime-600 transition-colors disabled:opacity-50"
          >
            {geocoding ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Or select location on map
        </label>
        <LocationMap
          latitude={selectedLocation?.latitude || 51.505}
          longitude={selectedLocation?.longitude || -0.09}
          markers={selectedLocation ? [{ lat: selectedLocation.latitude, lng: selectedLocation.longitude }] : []}
          onLocationSelect={handleLocationSelect}
        />
      </div>

      {location?.error && (
        <p className="text-red-500 text-sm">{location.error}</p>
      )}
      
      {selectedLocation && (
        <p className="text-green-600 text-sm">Location is set ✓</p>
      )}
    </div>
  );
};