import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import Card from "@/components/ui/Card";

import {iconMarker1, iconMarker2} from "@/components/maps/customMarker";
import { centerPosition, marker1Position, marker2Position } from "@/components/maps/customPosition";

export const InitialPage = () => {
  return (
    <Card 
    title="Prueba de Mapa"
    subtitle="Mapa de San Fernando del Valle de Catamarca." 
    bodyClass="h-[36rem] p-10">
        <MapContainer center={centerPosition} zoom={13} scrollWheelZoom={true} className="h-full">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={marker1Position} icon={iconMarker1}>
                <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>

            <Marker position={marker2Position} icon={iconMarker2}>
                <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    </Card>
  )
}