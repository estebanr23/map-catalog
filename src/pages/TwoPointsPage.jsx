import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import Card from "@/components/ui/Card";

import {iconMarker1, iconMarker2} from "@/components/maps/customMarker";
import { centerPosition } from "@/components/maps/customPosition";
import { generateTrayectory } from '@/helpers/generateTrayectory';
import Loading from '@/components/Loading';
  
const initialState = {
    start: [],
    end: [],
    trayectory: []
}
export const TwoPointsPage = () => {
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
        title="Mapa con sucesión de puntos"
        subtitle="Muestra los puntos por donde se movio un cliente utillizando un array de posiciones para la simulación." 
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

                        {/* Trayectoria recorrida */}
                        {
                            (trayectory.length > 0) && trayectory.map((point, index) => (
                                <Marker key={index} position={point} className="custom_marker">
                                    <Popup>
                                    A pretty CSS3 popup. <br /> Easily customizable.
                                    </Popup>
                                </Marker>
                            ))
                        }
                    </MapContainer>
                )
            }
        </Card>
    )
};

