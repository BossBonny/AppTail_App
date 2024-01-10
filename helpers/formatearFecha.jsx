export const formatearFecha = fecha => {

    if(!fecha) return

    const nuevaFecha = new Date(fecha.split('T')[0])

    const opciones = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    return nuevaFecha.toLocaleDateString('es-ES', opciones);
}