import L from 'leaflet'
import customMarkerIcon1 from '@/assets/css/images/marker-prueba1.png';
import customMarkerIcon2 from '@/assets/css/images/marker-prueba2.png';

import customMarkerIcon3 from '@/assets/css/images/bike-marker.png';

export const iconMarker1 = new L.Icon({
    iconUrl: customMarkerIcon1,
    iconSize: [32, 32], // ajusta el tamaño de acuerdo a la imagen
    iconAnchor: [16, 32], // ajusta la posición del anclaje
    popupAnchor: [0, -32], // ajusta la posición del popup
});

export const iconMarker2 = new L.Icon({
    iconUrl: customMarkerIcon2,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

export const bikeMarker = new L.Icon({
    iconUrl: customMarkerIcon3,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});