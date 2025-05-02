export function DateFormatter(date: string | Date) {
  const d = typeof date === "string" ? new Date(date) : date;

  // Pegando a data como UTC
  const day = d.getUTCDate().toString().padStart(2, "0");
  const month = (d.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = d.getUTCFullYear();

  return `${day}/${month}/${year}`;
}
