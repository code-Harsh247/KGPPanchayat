import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export function formatTableName(tableName) {
  return tableName
    .split("_") // Split by underscore
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter
    .join(" "); // Join words back with space
}
