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

export const transformCitizenFilters = (filters) => {
  let apiFilters = {};

  if (!filters) return apiFilters;

  const mapRangeFilter = (apiKey, minKey, maxKey) => {
      if (filters[minKey]) {
          apiFilters[apiKey] = { ...(apiFilters[apiKey] || {}), gte: parseInt(filters[minKey]) };
      }
      if (filters[maxKey]) {
          apiFilters[apiKey] = { ...(apiFilters[apiKey] || {}), lte: parseInt(filters[maxKey]) };
      }
  };

  if (filters.gender) apiFilters.gender = filters.gender;
  if (filters.educationLevel) apiFilters.education_level = filters.educationLevel;

  mapRangeFilter("date_of_birth", "dateOfBirthStart", "dateOfBirthEnd");
  mapRangeFilter("household_id", "householdIdMin", "householdIdMax");
  mapRangeFilter("income", "incomeMin", "incomeMax");

  return apiFilters;
};

export const transformAgriFilters = (filters) => {
  let apiFilters = {};
  console.log("Transforming");
  if (!filters) return apiFilters;
  console.log("Mapping");
  const mapRangeFilter = (apiKey, minKey, maxKey) => {
      if (filters[minKey]) {
          apiFilters[apiKey] = { ...(apiFilters[apiKey] || {}), gte: parseInt(filters[minKey]) };
      }
      if (filters[maxKey]) {
          apiFilters[apiKey] = { ...(apiFilters[apiKey] || {}), lte: parseInt(filters[maxKey]) };
      }
  };

  if (filters.cropType) apiFilters.crop_type = filters.cropType;
  if (filters.season) apiFilters.season = filters.season;
  if (filters.sortBy) apiFilters.sortBy = filters.sortBy;
  if (filters.sortOrder) apiFilters.sortOrder = filters.sortOrder;

  mapRangeFilter("yield", "yieldMin", "yieldMax");
  mapRangeFilter("year", "yearMin", "yearMax");

  return apiFilters;
};


export const transformAssetsFilters = (filters) => {
  let apiFilters = {};
  if (!filters) return apiFilters;
  const mapRangeFilter = (apiKey, minKey, maxKey) => {

      if (filters[minKey]) {
          apiFilters[apiKey] = { ...(apiFilters[apiKey] || {}), gte: parseInt(filters[minKey]) };
      }
      if (filters[maxKey]) {
          apiFilters[apiKey] = { ...(apiFilters[apiKey] || {}), lte: parseInt(filters[maxKey]) };
      }
  };
  if(filters.name)apiFilters.name = filters.name;
  if(filters.type)apiFilters.type = filters.type;
  if(filters.sortBy)apiFilters.sortBy = filters.sortBy;
  if(filters.sortOrder)apiFilters.sortOrder = filters.sortOrder;

  mapRangeFilter("purchase_date", "purchaseDateStart", "purchaseDateEnd");
  mapRangeFilter("value", "valueMin", "valueMax");
  mapRangeFilter("last_maintenance", "lastMaintenanceDateStart", "lastMaintenanceDateEnd");

  return apiFilters;

}