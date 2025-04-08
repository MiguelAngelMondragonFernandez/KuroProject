import idiomas from "./languaje.json"

export function cargarIdiomas(opcion = "es") {
    return idiomas[opcion] || idiomas.es;
}

export function guardarIdioma(opcion) {
    localStorage.setItem('idioma', opcion);
}
