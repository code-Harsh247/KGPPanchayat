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

const AgriFilter = ({ onApply }) => {
  const maxYield = useRef(null);
  const minYield = useRef(null);
  const [filters, setFilters] = useState({
    cropType: "",
    yieldMax: "",
    yieldMin: "",
    season: "",
    yearMin: "",
    yearMax: "",
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
      cropType: "",
      yieldMax: "",
      yieldMin: "",
      season: "",
      yearMin: "",
      yearMax: "",
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
    { label: "Yield", value: "yield" },
    { label: "Season", value: "season" },
    { label: "Year", value: "year" }
  ];

  return (
    <div className="w-[80%] bg-[#FCF4F2] border border-gray-300 p-4 mx-auto relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="space-y-4">
          <div className="w-full">
            <label className="block text-sm font-medium mb-1">Crop Type</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  {filters.cropType || "Select Crop Type"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                {["rice", "peas", "carrots", "tomatoes", "lettuce", "wheat", "cabbage", "corn", "soyabeans", "potatoes"].map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => setFilters({ ...filters, cropType: option })}
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium mb-1">Yield Range</label>
            <div className="flex flex-col space-y-2">
              <Input
                type="number"
                name="yieldMin"
                ref={minYield}
                value={filters.yieldMin}
                onChange={handleChange}
                placeholder="Min Yield"
                className="w-full bg-white"
              />
              <Input
                type="number"
                name="yieldMax"
                ref={maxYield}
                value={filters.yieldMax}
                onChange={handleChange}
                placeholder="Max Yield"
                className="w-full bg-white"
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div className="w-full">
            <label className="block text-sm font-medium mb-1">Season</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  {filters.season || "Select Season"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                {[
                  "Winter",
                  "Summer",
                  "Monsoon"
                ].map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => setFilters({ ...filters, season: option })}
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium mb-1">Year Range</label>
            <div className="flex flex-col space-y-2">
              <Input
                type="number"
                name="yearMin"
                value={filters.yearMin}
                onChange={handleChange}
                placeholder="Min Year"
                className="w-full bg-white"
              />
              <Input
                type="number"
                name="yearMax"
                value={filters.yearMax}
                onChange={handleChange}
                placeholder="Max Year"
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

export default AgriFilter;