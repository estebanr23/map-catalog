import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import Card from "@/components/ui/Card";

import {iconMarker1, iconMarker2, bikeMarker} from "@/components/maps/customMarker";
import { centerPosition } from "@/components/maps/customPosition";
import { generateTrayectory } from '@/helpers/generateTrayectory';
import Loading from '@/components/Loading';
  
const initialState = {
    start: [],
    end: [],
    trayectory: []
}
export const InteractiveMap = () => {
    const [points, setPoints] = useState(initialState)
    const { start, end, trayectory} = points

    const [bike, setBike] = useState([])
    const [time, setTime] = useState(0)
    const [index, setIndex] = useState(0)

    const [isLoading, setIsLoading] = useState(true)

    function timeIncrement () {
        if(index > trayectory.length - 1) return false

        setTimeout(() => {
            console.log(trayectory[index])
            setBike(trayectory[index])
            setTime(time + 3)
            setIndex(index + 1)
        }, 3000) 
    }

    useEffect(() => {
        // Simula una trayectoria real de un hub a otro
        const data = generateTrayectory()
        setPoints(data)

        setIsLoading(false)
    }, [])

    useEffect(() => {
        if(trayectory.length === 0) return setTime(3)
        timeIncrement()
    }, [time])

    return (
        <Card 
        title="Mapa Interactivo"
        subtitle="El componente simula un cliente en movimiento de una estacion a otra." 
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

                        {/* Bici en movimiento */}
                        {
                            (bike.length > 0) && (
                                <Marker position={bike} icon={bikeMarker}>
                                    <Popup>
                                    A pretty CSS3 popup. <br /> Easily customizable.
                                    </Popup>
                                </Marker>
                            )
                        }
                    </MapContainer>
                )
            }
        </Card>
    )
};

