import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

interface LocationMapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  markers?: Array<{ lat: number; lng: number; color?: string }>;
  onLocationSelect?: (location: { latitude: number; longitude: number }) => void;
}

// Component to handle map center updates
const MapCenter: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
};

export const LocationMap: React.FC<LocationMapProps> = ({
  latitude,
  longitude,
  zoom = 13,
  markers = [],
  onLocationSelect,
}) => {
  const handleMapClick = (e: L.LeafletMouseEvent) => {
    if (onLocationSelect) {
      onLocationSelect({
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
      });
    }
  };

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={zoom}
      className="w-full h-[400px] rounded-lg z-0"
      onClick={handleMapClick}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapCenter center={[latitude, longitude]} />
      
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={[marker.lat, marker.lng]}
          icon={marker.color ? new L.Icon({
            iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${marker.color}.png`,
            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          }) : defaultIcon}
        />
      ))}
    </MapContainer>
  );
};