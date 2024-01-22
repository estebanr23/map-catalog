import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet"
import Card from "@/components/ui/Card";

export const EventPage = () => {
  function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }

  return (
    <Card 
      title="Ubicacion actual del usuario" 
      subtitle="Haga clic en el mapa para mostrar un marcador en su ubicación detectada."
      bodyClass="h-[36rem] p-10">
        <MapContainer
          className="h-full"
          center={{ lat: 51.505, lng: -0.09 }}
          zoom={13}
          scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
        </MapContainer>
    </Card>
  )
}
