export type LineColorCategory = "walk" | "train" | "bus" | "fallback";

export function getLineColor(transportType: string): LineColorCategory {
  if (transportType === "WALK") return "walk";
  if (transportType.startsWith("J")) return "train";
  if (transportType.startsWith("B")) return "bus";

  return "fallback";
}

const lineColorClasses: Record<LineColorCategory, string> = {
  walk: "bg-gray-100 text-gray-600",
  train: "bg-sky-100 text-sky-700",
  bus: "bg-orange-100 text-orange-700",
  fallback: "bg-neutral-200 text-gray-800",
};

export function getLineColorClasses(transportType: string): string {
  return lineColorClasses[getLineColor(transportType)];
}
