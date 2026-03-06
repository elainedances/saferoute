// All times displayed in UAE time (Gulf Standard Time, UTC+4)
export const UAE_TZ = "Asia/Dubai";

export function formatUAETime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleString("en-GB", {
    timeZone: UAE_TZ,
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function formatUAETimeShort(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleString("en-GB", {
    timeZone: UAE_TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function formatUAETimeFull(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleString("en-GB", {
    timeZone: UAE_TZ,
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }) + " GST";
}

export function getUAENow(): string {
  return formatUAETimeFull(new Date());
}
