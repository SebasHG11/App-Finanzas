export const extraerMes = (fecha: string): number | string => {
  try {
    // Asegurarse de que la fecha está en el formato esperado
    const date = new Date(fecha);
    if (isNaN(date.getTime())) {
      return 'Fecha inválida';
    }
    // Obtener el mes (0-indexado, por eso sumamos 1)
    return date.getMonth() + 1;
  } catch (error) {
    console.error("Error al extraer el mes:", error);
    return 'Error al procesar la fecha';
  }
};
