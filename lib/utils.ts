import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import L from "leaflet";

export const createCustomIcon = (color: string): L.DivIcon => {
  return L.divIcon({
    className: "custom-div-icon",
    html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
};

export const formatTrend = (
  trend?: "up" | "down" | "stable",
  change?: string
) => {
  if (!trend) return null;

  const iconMap = {
    up: "↑",
    down: "↓",
    stable: "→",
  };

  const colorMap = {
    up: "text-green-500",
    down: "text-red-500",
    stable: "text-gray-500",
  };

  return {
    icon: iconMap[trend],
    class: colorMap[trend],
    text: change || "",
  };
};

export const getFloodZoneColor = (zoneType: string): string => {
  switch (zoneType) {
    case "Zone AE":
      return "#0ea5e9";
    case "Zone X":
      return "#93c5fd";
    case "Zone VE":
      return "#06b6d4";
    default:
      return "#bae6fd";
  }
};

export const getRiskSeverityColor = (
  severity?: "low" | "medium" | "high"
): string => {
  switch (severity) {
    case "high":
      return "#ef4444";
    case "medium":
      return "#f97316";
    case "low":
      return "#22c55e";
    default:
      return "#22c55e";
  }
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/*Helper function to format category names */
export const formatCategoryName = (category: string): string => {
  return category
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
};
