import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in React-Leaflet
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

interface LocationPickerProps {
  value: { lat: number; lng: number } | null;
  onChange: (location: { lat: number; lng: number }) => void;
  disabled?: boolean;
}

function MapClickHandler({
  onChange,
  disabled,
}: {
  onChange: (location: { lat: number; lng: number }) => void;
  disabled?: boolean;
}) {
  useMapEvents({
    click(e) {
      if (!disabled) {
        onChange({ lat: e.latlng.lat, lng: e.latlng.lng });
      }
    },
  });
  return null;
}

export function LocationPicker({ value, onChange, disabled }: LocationPickerProps) {
  const [mapReady, setMapReady] = useState(false);
  const mapRef = useRef<L.Map | null>(null);

  // Default center: India
  const defaultCenter: [number, number] = [20.5937, 78.9629];
  const center: [number, number] = value ? [value.lat, value.lng] : defaultCenter;

  useEffect(() => {
    // Delay to ensure proper rendering
    const timer = setTimeout(() => setMapReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-3">
      <div className="relative h-[300px] rounded-lg overflow-hidden border border-border">
        {mapReady && (
          <MapContainer
            center={center}
            zoom={value ? 15 : 5}
            className="h-full w-full"
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapClickHandler onChange={onChange} disabled={disabled} />
            {value && <Marker position={[value.lat, value.lng]} icon={defaultIcon} />}
          </MapContainer>
        )}
        {disabled && (
          <div className="absolute inset-0 bg-background/50 cursor-not-allowed" />
        )}
      </div>
      
      {value && (
        <div className="flex gap-4 text-sm">
          <div className="flex-1 p-3 bg-secondary rounded-lg">
            <span className="text-muted-foreground">Latitude: </span>
            <span className="font-medium text-foreground">{value.lat.toFixed(6)}</span>
          </div>
          <div className="flex-1 p-3 bg-secondary rounded-lg">
            <span className="text-muted-foreground">Longitude: </span>
            <span className="font-medium text-foreground">{value.lng.toFixed(6)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
