import { Location } from '../types/location';

// Using OpenStreetMap's Nominatim service for geocoding
const NOMINATIM_API = 'https://nominatim.openstreetmap.org/search';

export async function geocodeAddress(address: string): Promise<Location | null> {
  try {
    const params = new URLSearchParams({
      q: address,
      format: 'json',
      limit: '1',
    });

    const response = await fetch(`${NOMINATIM_API}?${params}`);
    const data = await response.json();

    if (data && data[0]) {
      return {
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon),
      };
    }
    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
}