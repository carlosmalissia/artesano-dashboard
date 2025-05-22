export function formatDate(fecha: string): string {
    const date = new Date(fecha);
    return date.toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}
