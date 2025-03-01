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

export const transFormFilters = (filters) => {
  let apiFilters = {};

  if (!filters) return apiFilters;

  const mapRangeFilter = (apiKey, minKey, maxKey, isDate = false) => {
      if (filters[minKey]) {
          apiFilters[apiKey] = { ...(apiFilters[apiKey] || {}), gte: isDate ? filters[minKey] : parseInt(filters[minKey]) };
      }
      if (filters[maxKey]) {
          apiFilters[apiKey] = { ...(apiFilters[apiKey] || {}), lte: isDate ? filters[maxKey] : parseInt(filters[maxKey]) };
      }
  };
  //Citizens
  if (filters.gender) apiFilters.gender = filters.gender;
  if (filters.educationLevel) apiFilters.education_level = filters.educationLevel;
  mapRangeFilter("date_of_birth", "dateOfBirthStart", "dateOfBirthEnd", true);
  mapRangeFilter("household_id", "householdIdMin", "householdIdMax");
  mapRangeFilter("income", "incomeMin", "incomeMax");

  //AgriRecords
  if (filters.cropType) apiFilters.crop_type = filters.cropType;
  if (filters.season) apiFilters.season = filters.season;
  if (filters.sortBy) apiFilters.sortBy = filters.sortBy;
  if (filters.sortOrder) apiFilters.sortOrder = filters.sortOrder;
  mapRangeFilter("yield", "yieldMin", "yieldMax");
  mapRangeFilter("year", "yearMin", "yearMax");

  return apiFilters;
}


