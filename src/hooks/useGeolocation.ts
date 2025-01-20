import { useState, useEffect } from 'react';

interface Location {
  latitude: number;
  longitude: number;
  error?: string;
}

export const useGeolocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(false);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocation({ latitude: 0, longitude: 0, error: 'Geolocation is not supported' });
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoading(false);
      },
      (error) => {
        setLocation({ latitude: 0, longitude: 0, error: error.message });
        setLoading(false);
      }
    );
  };

  return { location, loading, getLocation };
};