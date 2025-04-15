import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/*Helper function to format category names */
export const formatCategoryName = (category: string): string => {
  return category
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
};
