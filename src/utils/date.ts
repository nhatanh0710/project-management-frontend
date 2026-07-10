export function formatDate(date?: string | Date) {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-GB");
}