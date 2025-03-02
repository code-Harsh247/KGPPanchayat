import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import { map } from "zod";
import { unparse } from 'papaparse';

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

  //Assets
  if (filters.name) apiFilters.name = filters.name;
  if (filters.type) apiFilters.type = filters.type;
  if (filters.sortBy) apiFilters.sortBy = filters.sortBy;
  if (filters.sortOrder) apiFilters.sortOrder = filters.sortOrder;
  mapRangeFilter("purchase_date", "purchaseDateStart", "purchaseDateEnd", true);
  mapRangeFilter("value", "valueMin", "valueMax");
  mapRangeFilter("last_maintenance", "lastMaintenanceDateStart", "lastMaintenanceDateEnd", true);

  //GovtMonitors
  if(filters.jurisdiction)apiFilters.jurisdiction = filters.jurisdiction;

  //Households
  mapRangeFilter("member_count", "memberCountMin", "memberCountMax");
  mapRangeFilter("annual_income", "annualIncomeMin", "annualIncomeMax");

  //LandRecords
  mapRangeFilter("size", "sizeMin", "sizeMax");

  //PanchayatEmployees
  if(filters.role)apiFilters.role = filters.role;
  mapRangeFilter("joining_date", "joiningDateStart", "joiningDateEnd", true);
  mapRangeFilter("citizen_id", "citizenIdMin", "citizenIdMax");

  //SchemeBeneficiaries
  mapRangeFilter("scheme_id", "schemeIdMin", "schemeIdMax");
  mapRangeFilter("enrollment_date", "enrollmentDateStart", "enrollmentDateEnd", true);

  //WelfareSchemes
  mapRangeFilter("budget", "budgetMin", "budgetMax");

  // Census Data
  mapRangeFilter("year", "yearMin", "yearMax");
  mapRangeFilter("female_population", "femalePopulationMin", "femalePopulationMax");
  mapRangeFilter("male_population", "malePopulationMin", "malePopulationMax");
  mapRangeFilter("total_population", "totalPopulationMin", "totalPopulationMax");
  mapRangeFilter("births", "birthsMin", "birthsMax");
  mapRangeFilter("deaths", "deathsMin", "deathsMax");
  mapRangeFilter("marriages", "marriagesMin", "marriagesMax");
  mapRangeFilter("divorces", "divorcesMin", "divorcesMax");

  // Environmental Data
  mapRangeFilter("year", "yearMin", "yearMax");
  mapRangeFilter("air_quality_index", "airQualityIndexMin", "airQualityIndexMax");
  mapRangeFilter("soil_quality_index", "soilQualityIndexMin", "soilQualityIndexMax");
  mapRangeFilter("water_quality_index", "waterQualityIndexMin", "waterQualityIndex");
  mapRangeFilter("tree_count", "treeCountMin", "treeCountMax");
  return apiFilters;
}



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



export function convertJsonToCsv(jsonData) {
    return unparse(jsonData); // Converts JSON to CSV format
}

export function downloadCsv(csvData, filename = "data.csv") {
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
