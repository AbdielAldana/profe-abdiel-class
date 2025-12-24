const dificultad = [
    { id: 0, nombre: "Común", color: "#9E9E9E", colorName: "comun" }, // gris
    { id: 1, nombre: "Basica", color: "#4CAF50", colorName: "pcomun" }, // verde
    { id: 2, nombre: "Rara", color: "#2196F3", colorName: "raro" }, // azul
    { id: 3, nombre: "Épica", color: "#9C27B0", colorName: "epico" }, // morado
    { id: 4, nombre: "Legendaria", color: "#FF9800", colorName: "legendario" }, // naranja
    { id: 5, nombre: "Mítica", color: "#F44336", colorName: "mitico" }  // rojo
];

export const difName = (difMision) => {
    let item = dificultad.find((d) => d.id == difMision)
    return item ? item.nombre : "Desconocida";
}

export const difColorName = (difMision) => {
    let item = dificultad.find((d) => d.id == difMision)
    return item ? item.colorName : "Desconocida";
}

export const difColor = (difMision) => {
    let item = dificultad.find((d) => d.id == difMision)
    return item ? item.color : "Desconocida";
}
