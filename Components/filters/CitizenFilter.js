import React, { useState, useRef } from "react";
import { Input } from "../ui/inputBox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/Components/ui/dropdown-menu";
import { Button } from "@/Components/ui/btn";

const CitizenFilter = ({ onApply }) => {
  const maxHouseholdId = useRef(null);
  const minHouseholdId = useRef(null);
  const [filters, setFilters] = useState({
    gender: "",
    dateOfBirthStart: "",
    dateOfBirthEnd: "",
    householdIdMax: "",
    householdIdMin: "",
    educationLevel: "",
    incomeMin: "",
    incomeMax: "",
    sortBy: "",
    sortOrder: "asc", // Default sort order
  });

  const handleApply = () => {
    onApply(filters);
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    // Reset all filters to empty values
    setFilters({
      gender: "",
      dateOfBirthStart: "",
      dateOfBirthEnd: "",
      householdIdMax: "",
      householdIdMin: "",
      educationLevel: "",
      incomeMin: "",
      incomeMax: "",
      sortBy: "",
      sortOrder: "asc",
    });
    
    // Optionally, also apply the cleared filters immediately
    onApply({
      gender: "",
      dateOfBirthStart: "",
      dateOfBirthEnd: "",
      householdIdMax: "",
      householdIdMin: "",
      educationLevel: "",
      incomeMin: "",
      incomeMax: "",
      sortBy: "",
      sortOrder: "asc",
    });
  };

  // Toggle sort order between ascending and descending
  const toggleSortOrder = () => {
    setFilters({
      ...filters,
      sortOrder: filters.sortOrder === "asc" ? "desc" : "asc"
    });
  };

  // Sort options
  const sortOptions = [
    { label: "Date of Birth", value: "date_of_birth" },
    { label: "Household ID", value: "household_id" },
    { label: "Income", value: "income" },
    { label: "Education Level", value: "education_level" }
  ];

  return (
    <div className="w-[80%] bg-[#FCF4F2] border border-gray-300 p-4 mx-auto relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="space-y-4">
          <div className="w-full">
            <label className="block text-sm font-medium mb-1">Gender</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  {filters.gender || "Select Gender"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                {["Male", "Female", "Others"].map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => setFilters({ ...filters, gender: option })}
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium mb-1">Date of Birth Range</label>
            <div className="flex flex-col space-y-2">
              <Input
                type="date"
                name="dateOfBirthStart"
                value={filters.dateOfBirthStart}
                onChange={handleChange}
                placeholder="DOB Start"
                className="w-full bg-white"
              />
              <Input
                type="date"
                name="dateOfBirthEnd"
                value={filters.dateOfBirthEnd}
                onChange={handleChange}
                placeholder="DOB End"
                className="w-full bg-white"
              />
            </div>
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium mb-1">Household ID Range</label>
            <div className="flex flex-col space-y-2">
              <Input
                type="number"
                name="householdIdMin"
                ref={minHouseholdId}
                value={filters.householdIdMin}
                onChange={handleChange}
                placeholder="Min Household ID"
                className="w-full bg-white"
              />
              <Input
                type="number"
                name="householdIdMax"
                ref={maxHouseholdId}
                value={filters.householdIdMax}
                onChange={handleChange}
                placeholder="Max Household ID"
                className="w-full bg-white"
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div className="w-full">
            <label className="block text-sm font-medium mb-1">Education Level</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  {filters.educationLevel || "Select Education"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                {[
                  "Bachelor's Degree",
                  "Master's Degree",
                  "Technical Certification",
                  "High School Diploma",
                  "PhD",
                  "None",
                ].map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => setFilters({ ...filters, educationLevel: option })}
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium mb-1">Income Range</label>
            <div className="flex flex-col space-y-2">
              <Input
                type="number"
                name="incomeMin"
                value={filters.incomeMin}
                onChange={handleChange}
                placeholder="Min Income"
                className="w-full bg-white"
              />
              <Input
                type="number"
                name="incomeMax"
                value={filters.incomeMax}
                onChange={handleChange}
                placeholder="Max Income"
                className="w-full bg-white"
              />
            </div>
          </div>

          {/* Sort Options */}
          <div className="w-full">
            <label className="block text-sm font-medium mb-1">Sort Options</label>
            <div className="flex flex-col sm:flex-row gap-2">
              {/* Sort By Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-2/3 justify-start">
                    {filters.sortBy ? `Sort by: ${sortOptions.find(opt => opt.value === filters.sortBy)?.label}` : "Sort by"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {sortOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => setFilters({ ...filters, sortBy: option.value })}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Sort Order Button */}
              <Button 
                variant="outline" 
                className="w-full sm:w-1/3" 
                onClick={toggleSortOrder}
                disabled={!filters.sortBy}
              >
                {filters.sortOrder === "asc" ? "Ascending ↑" : "Descending ↓"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action Buttons - Positioned at the bottom right */}
      <div className="mt-6 flex flex-col sm:flex-row gap-2 md:justify-end w-full">
        <Button 
          onClick={handleClear} 
          variant="outline" 
          className="w-full sm:w-auto border-gray-300 order-2 sm:order-1"
        >
          Clear Filters
        </Button>
        <Button 
          onClick={handleApply} 
          className="bg-primary_orange text-white w-full sm:w-auto order-1 sm:order-2"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default CitizenFilter;