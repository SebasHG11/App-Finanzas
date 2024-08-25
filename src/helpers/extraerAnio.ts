export const extraerAnio = (fecha: string): number | string => {
  try {
    // Parsear la fecha del formato dado
    const date = new Date(fecha);

    if (isNaN(date.getTime())) {
      return 'Fecha inválida';
    }

    // Obtener el año
    const year = date.getFullYear();

    return year;
  } catch (error) {
    console.error("Error al extraer el año:", error);
    return 'Error al procesar la fecha';
  }
};