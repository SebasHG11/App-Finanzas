type totalCategoria = {
  categoriaId: number,
  total: number
}

export const tomarTotalPorCategoria = <T extends { categoriaId: number, monto: number }>(ArrayEntrada: T[]): totalCategoria[] => {
  const totalPorCategoria = ArrayEntrada.reduce((acc: Record<number, number>, a) => {
    if (!acc[a.categoriaId]) {
      acc[a.categoriaId] = 0;
    }
    acc[a.categoriaId] += a.monto;
    return acc
  }, {} as Record<number, number>);

  return Object.keys(totalPorCategoria).map(categoriaId => ({
    categoriaId: Number(categoriaId),
    total: totalPorCategoria[Number(categoriaId)]
  }))
}