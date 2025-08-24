export function formatTime(dateString: string) {
  if (!dateString) return "-";

  const date = new Date(dateString);

  return date.toLocaleString("en-US", {
    timeZone: "Asia/Jakarta", // WIB
    year: "numeric",
    month: "long", // August, September, dst.
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
