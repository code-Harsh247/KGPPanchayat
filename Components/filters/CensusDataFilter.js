import React, { useState, useRef } from "react";
import { Input } from "../ui/inputBox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/Components/ui/dropdown-menu";
import { Button } from "@/Components/ui/btn";
import { toast } from "sonner";

const CensusDataFilter = ({ onApply }) => {
  const maxHouseholdId = useRef(null);
  const minHouseholdId = useRef(null);
  const [filters, setFilters] = useState({
    yearMax: "",
    yearMin: "",
    birthsMax: "",
    birthsMin: "",
    deathsMax: "",
    deathsMin: "",
    marriagesMax: "",
    marriagesMin: "",
    divorcesMax: "",
    divorcesMin: "",
    malePopulationMax: "",
    malePopulationMin: "",
    femalePopulationMax: "",
    femalePopulationMin: "",
    totalPopulationMax: "",
    totalPopulationMin: "",
    sortBy: "",
    sortOrder: "asc", // Default sort order
  });

  const handleApply = () => {
    toast.success("Filters applied successfully");
    onApply(filters);
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    // Reset all filters to empty values
    toast.success("Filters cleared successfully");
    setFilters({
      yearMax: "",
      yearMin: "",
      birthsMax: "",
      birthsMin: "",
      deathsMax: "",
      deathsMin: "",
      marriagesMax: "",
      marriagesMin: "",
      divorcesMax: "",
      divorcesMin: "",
      malePopulationMax: "",
      malePopulationMin: "",
      femalePopulationMax: "",
      femalePopulationMin: "",
      totalPopulationMax: "",
      totalPopulationMin: "",
      sortBy: "",
      sortOrder: "asc", // Default sort order
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
    { label: "Year", value: "year" },
    { label: "Number of Births", value: "births" },
    { label: "Number of Deaths", value: "deaths" },
    { label: "Number of Marriages", value: "marriages" },
    { label: "Number of Divorces", value: "divorces" },
    { label: "Male Population", value: "malePopulation" },
    { label: "Female Population", value: "femalePopulation" },
    { label: "Total Population", value: "totalPopulation" },
  ];

  return (
    <div className="w-[80%] bg-[#FCF4F2] border border-gray-300 p-4 mx-auto relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="space-y-4">

          <div className="w-full">
            <label className="block text-sm font-medium mb-1">Year Range</label>
            <div className="flex flex-col space-y-2">
              <Input
                type="number"
                name="yearMin"
                value={filters.yearMin}
                onChange={handleChange}
                placeholder="Min Population"
                className="w-full bg-white"
              />
              <Input
                type="number"
                name="yearMax"
                value={filters.yearMax}
                onChange={handleChange}
                placeholder="Max Population"
                className="w-full bg-white"
              />
            </div>
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium mb-1">Number of Births Range</label>
            <div className="flex flex-col space-y-2">
              <Input
                type="number"
                name="birthsMin"
                value={filters.birthsMin}
                onChange={handleChange}
                placeholder="Min Number of Births"
                className="w-full bg-white"
              />
              <Input
                type="number"
                name="birthsMax"
                value={filters.birthsMax}
                onChange={handleChange}
                placeholder="Max Number of Births"
                className="w-full bg-white"
              />
            </div>
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium mb-1">Number of Deaths Range</label>
            <div className="flex flex-col space-y-2">
              <Input
                type="number"
                name="deathsMin"
                value={filters.deathsMin}
                onChange={handleChange}
                placeholder="Min Number of Deaths"
                className="w-full bg-white"
              />
              <Input
                type="number"
                name="deathsMax"
                value={filters.deathsMax}
                onChange={handleChange}
                placeholder="Max Number of Deaths"
                className="w-full bg-white"
              />
            </div>
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium mb-1"> Total Population Range</label>
            <div className="flex flex-col space-y-2">
              <Input
                type="number"
                name="totalPopulationMin"
                value={filters.totalPopulationMin}
                onChange={handleChange}
                placeholder="Min Total Population"
                className="w-full bg-white"
              />
              <Input
                type="number"
                name="totalPopulationMax"
                value={filters.totalPopulationMax}
                onChange={handleChange}
                placeholder="Max Total Population"
                className="w-full bg-white"
              />
            </div>
          </div>


        </div>

        {/* Right Column */}
        <div className="space-y-4">

          <div className="w-full">
            <label className="block text-sm font-medium mb-1">Number of Marriages Range</label>
            <div className="flex flex-col space-y-2">
              <Input
                type="number"
                name="marriagesMin"
                value={filters.marriagesMin}
                onChange={handleChange}
                placeholder="Min Number of Marriages"
                className="w-full bg-white"
              />
              <Input
                type="number"
                name="marriagesMax"
                value={filters.marriagesMax}
                onChange={handleChange}
                placeholder="Max Number of Marriages"
                className="w-full bg-white"
              />
            </div>
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium mb-1">Number of Divorces Range</label>
            <div className="flex flex-col space-y-2">
              <Input
                type="number"
                name="divorcesMin"
                value={filters.divorcesMin}
                onChange={handleChange}
                placeholder="Min Number of Divorces"
                className="w-full bg-white"
              />
              <Input
                type="number"
                name="divorcesMax"
                value={filters.divorcesMax}
                onChange={handleChange}
                placeholder="Max Number of Divorces"
                className="w-full bg-white"
              />
            </div>
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium mb-1"> Female Population Range</label>
            <div className="flex flex-col space-y-2">
              <Input
                type="number"
                name="femalePopulationMin"
                value={filters.femalePopulationMin}
                onChange={handleChange}
                placeholder="Min Female Population"
                className="w-full bg-white"
              />
              <Input
                type="number"
                name="femalePopulationMax"
                value={filters.femalePopulationMax}
                onChange={handleChange}
                placeholder="Max Female Population"
                className="w-full bg-white"
              />
            </div>
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium mb-1"> Male Population Range</label>
            <div className="flex flex-col space-y-2">
              <Input
                type="number"
                name="malePopulationMin"
                value={filters.malePopulationMin}
                onChange={handleChange}
                placeholder="Min Male Population"
                className="w-full bg-white"
              />
              <Input
                type="number"
                name="malePopulationMax"
                value={filters.malePopulationMax}
                onChange={handleChange}
                placeholder="Max Male Population"
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

export default CensusDataFilter;