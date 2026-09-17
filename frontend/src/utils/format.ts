export function formatDuration(duration: string): string {
  return duration.replace("PT", "").replace("H", "h ").replace("M", "m");
}

export function formatTime(isoTime: string): string {
  return new Date(isoTime).toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatTransferCount(transferCount: number): string {
  if (transferCount === 0) return "Direkt";
  return `${transferCount} byte${transferCount > 1 ? "n" : ""}`;
}
