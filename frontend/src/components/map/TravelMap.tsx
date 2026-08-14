import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { ItineraryItem, ItemCategory } from '@/types/itinerary';

// Fix for default marker icon issues in react-leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface TripMapProps {
  items: ItineraryItem[];
}

export default function TripMap({ items }: TripMapProps) {
  const locations = items
    .filter((item) => item.location)
    .map((item) => ({
      id: item.id,
      title: item.title,
      lat: item.location!.lat,
      lng: item.location!.lng,
      category: item.category,
    }));

  if (locations.length === 0) {
    return (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-xl">
        <p className="text-slate-500">No locations to display on map yet.</p>
      </div>
    );
  }

  const center = [locations[0].lat, locations[0].lng] as [number, number];
  const polylineCoords = locations.map(loc => [loc.lat, loc.lng] as [number, number]);

  return (
    <div className="w-full h-[500px] md:h-[600px] rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 z-10 relative">
      <MapContainer center={center} zoom={12} scrollWheelZoom={true} className="w-full h-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {locations.map((loc) => (
          <Marker key={loc.id} position={[loc.lat, loc.lng]}>
            <Popup>
              <div className="font-bold">{loc.title}</div>
              <div className="text-xs text-slate-500">{loc.category}</div>
            </Popup>
          </Marker>
        ))}
        
        <Polyline positions={polylineCoords} color="#4F46E5" weight={3} dashArray="5, 10" />
      </MapContainer>
    </div>
  );
}
