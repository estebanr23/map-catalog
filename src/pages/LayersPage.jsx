import { MapContainer, TileLayer, Circle, CircleMarker, Polyline, Polygon, Rectangle, Popup } from 'react-leaflet';
import Card from "@/components/ui/Card";

const center = [-28.4696, -65.7856];

const polyline = [
  [-28.4696, -65.7856],
  [-28.467, -65.787],
  [-28.465, -65.789],
];

const multiPolyline = [
  [
    [-28.467, -65.787],
    [-28.465, -65.789],
    [-28.463, -65.787],
  ],
  [
    [-28.467, -65.785],
    [-28.465, -65.787],
    [-28.463, -65.785],
  ],
];

const polygon = [
  [-28.47, -65.789],
  [-28.47, -65.791],
  [-28.471, -65.791],
];

const multiPolygon = [
  [
    [-28.47, -65.791],
    [-28.47, -65.793],
    [-28.471, -65.793],
  ],
  [
    [-28.47, -65.788],
    [-28.47, -65.787],
    [-28.471, -65.787],
  ],
];

const rectangle = [
    [-28.468, -65.791],
    [-28.466, -65.789],
];

const fillBlueOptions = { fillColor: 'blue' };
const blackOptions = { color: 'black' };
const limeOptions = { color: 'lime' };
const purpleOptions = { color: 'purple' };
const redOptions = { color: 'red' };

export const LayersPage = () => {
  return (
    <Card 
    title="Mapa con Ejemplos de Layers" 
    subtitle="Mapa con poligonos, multipoligonos, rectangulos, circulos, lineas y multilineas." 
    bodyClass="h-[36rem] p-10">
      <MapContainer center={center} zoom={14} scrollWheelZoom={true} className="h-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Circle center={center} pathOptions={fillBlueOptions} radius={200} />

        <CircleMarker center={[-28.47, -65.786]} pathOptions={redOptions} radius={20}>
          <Popup>Popup en CircleMarker</Popup>
        </CircleMarker>

        <Polyline pathOptions={limeOptions} positions={polyline} />
        <Polyline pathOptions={limeOptions} positions={multiPolyline} />
        <Polygon pathOptions={purpleOptions} positions={polygon} />
        <Polygon pathOptions={purpleOptions} positions={multiPolygon} />

        <Rectangle bounds={rectangle} pathOptions={blackOptions} />
      </MapContainer>
    </Card>
  );
};
