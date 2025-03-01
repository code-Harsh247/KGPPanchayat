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

const SchemeBeneficiariesFilter = ({ onApply }) => {
  const maxSchemeId = useRef(null);
  const minSchemeId = useRef(null);
  const [filters, setFilters] = useState({
    enrollmentDateStart: "",
    enrollmentDateEnd: "",
    schemeIdMax: "",
    schemeIdMin: "",
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
        enrollmentDateStart: "",
        enrollmentDateEnd: "",
        schemeIdMax: "",
        schemeIdMin: "",
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
    { label: "Citizen Id", value: "citizen_id" },
    { label: "Scheme ID", value: "scheme_id" },
    { label: "Enrollment Date", value: "enrollment_date" }
  ];

  return (
    <div className="w-[80%] bg-[#FCF4F2] border border-gray-300 p-4 mx-auto relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="space-y-4">

          <div className="w-full">
            <label className="block text-sm font-medium mb-1">Date of Birth Range</label>
            <div className="flex flex-col space-y-2">
              <Input
                type="date"
                name="enrollmentDateStart"
                value={filters.enrollmentDateStart}
                onChange={handleChange}
                placeholder="Enrollment Date Start"
                className="w-full bg-white"
              />
              <Input
                type="date"
                name="enrollmentDateEnd"
                value={filters.enrollmentDateEnd}
                onChange={handleChange}
                placeholder="Enrollment Date End"
                className="w-full bg-white"
              />
            </div>
          </div>


        </div>

        {/* Right Column */}
        <div className="space-y-4">

          <div className="w-full">
            <label className="block text-sm font-medium mb-1">scheme ID Range</label>
            <div className="flex flex-col space-y-2">
              <Input
                type="number"
                name="schemeIdMin"
                ref={minSchemeId}
                value={filters.schemeIdMin}
                onChange={handleChange}
                placeholder="Min Scheme ID"
                className="w-full bg-white"
              />
              <Input
                type="number"
                name="schemeIdMax"
                ref={maxSchemeId}
                value={filters.schemeIdMax}
                onChange={handleChange}
                placeholder="Max Scheme ID"
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

export default SchemeBeneficiariesFilter;