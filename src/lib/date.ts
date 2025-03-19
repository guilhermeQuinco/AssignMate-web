export function DateFormatter(date: string) {
  return new Date(date).toLocaleDateString("pt-br", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
