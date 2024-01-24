// Función para generar una secuencia de puntos entre dos puntos dados
const generatePointSequence = (start, end, numPoints) => {
    const latDiff = (end[0] - start[0]) / numPoints;
    const lonDiff = (end[1] - start[1]) / numPoints;

    const points = [];
    for (let i = 0; i <= numPoints; i++) {
        const lat = start[0] + i * latDiff;
        const lon = start[1] + i * lonDiff;
        points.push([lat, lon]);
    }

    return points;
};

export default generatePointSequence;