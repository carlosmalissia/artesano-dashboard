export function formatARS(value: number) {
  return new Intl.NumberFormat('es-AR', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(value);
}
