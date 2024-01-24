import { useCallback, useMemo, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { centerPosition } from "@/components/maps/customPosition";
import Card from "@/components/ui/Card";
export const DraggableMarkerPage = () => {

  function DraggableMarker () {
      const [draggable, setDraggable] = useState(false)
      const [position, setPosition] = useState(centerPosition)
      const markerRef = useRef(null)
  
      const eventHandlers = useMemo(
        () => ({
          dragend() {
            const marker = markerRef.current
            if (marker != null) {
              setPosition(marker.getLatLng())
              console.log(marker.getLatLng())
            }
          },
        }),
        [],
      )
      const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
      }, [])
    
      return (
        <Marker
          draggable={draggable}
          eventHandlers={eventHandlers}
          position={position}
          ref={markerRef}>
  
          <Popup minWidth={90}>
            <span onClick={toggleDraggable}>
              {draggable
                ? 'Marker is draggable'
                : 'Click here to make marker draggable'}
            </span>
          </Popup>
  
        </Marker>
      )
  }

  return (
    <Card 
      title="Marcador arrastrable"
      subtitle="El componente permite hacer click en el marcador y habilitar la función para arrastrarlo y cambiar su posición en el mapa." 
      bodyClass="h-[36rem] p-10"
    >
      <MapContainer center={centerPosition} zoom={13} scrollWheelZoom={true} className="h-full">
          <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <DraggableMarker />
      </MapContainer>
    </Card>
  )
}
