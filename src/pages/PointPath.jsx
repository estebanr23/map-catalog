import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import Card from "@/components/ui/Card";
import Loading from '@/components/Loading';
import {iconMarker1, iconMarker2} from "@/components/maps/customMarker";
import { centerPosition } from "@/components/maps/customPosition";
import { generateTrayectory } from '@/helpers/generateTrayectory';

const initialState = {
    start: [],
    end: [],
    trayectory: []
}
export const PointPath = () => {
    const [points, setPoints] = useState(initialState)
    const { start, end, trayectory} = points
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Simula una trayectoria real de un hub a otro
        const data = generateTrayectory()
        setPoints(data)

        setIsLoading(false)
    }, [])

    return (
        <Card 
        title="Mapa con trayecto realizado"
        subtitle="El componente muestra la ruta realizada desde un punto a otro uniendo una secuencia de puntos dadas." 
        bodyClass="h-[36rem] p-10">
            {
                (isLoading) 
                ? <Loading />
                : (
                    <MapContainer center={centerPosition} zoom={15} scrollWheelZoom={true} className="h-full">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {/* Estacion incial */}
                        <Marker position={start} icon={iconMarker1}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>

                        {/* Estacion final */}
                        <Marker position={end} icon={iconMarker2}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                        
                        <Polyline positions={trayectory} color="purple" />
                    </MapContainer>
                    )
                }
        </Card>
    )
};

