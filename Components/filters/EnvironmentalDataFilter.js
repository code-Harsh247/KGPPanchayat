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

const EnvironmentalDataFilter = ({ onApply }) => {
    const [filters, setFilters] = useState({
        airQualityIndexMax: "",
        airQualityIndexMin: "",
        soilQualityIndexMin: "",
        soilQualityIndexMax: "",
        waterQualityIndexMin: "",
        waterQualityIndexMax: "",
        yearMin:"",
        yearMax:"",
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
            airQualityIndexMax: "",
            airQualityIndexMin: "",
            soilQualityIndexMin: "",
            soilQualityIndexMax: "",
            waterQualityIndexMin: "",
            waterQualityIndexMax: "",
            yearMin:"",
            yearMax:"",
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
        { label: "Air Quality Index", value: "air_quality_index" },
        { label: "Soil Quality Index", value: "soil_quality_index" },
        { label: "Water Quality Index", value: "water_quality_index" },
        { label: "Year", value: "year" }
    ];

    return (
        <div className="w-[80%] bg-[#FCF4F2] border border-gray-300 p-4 mx-auto relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left Column */}
                <div className="space-y-4">
                    
                <div className="w-full">
                        <label className="block text-sm font-medium mb-1">Air Quality Index Range</label>
                        <div className="flex flex-col space-y-2">
                            <Input
                                type="number"
                                name="airQualityIndexMin"
                                value={filters.airQualityIndexMin}
                                onChange={handleChange}
                                placeholder="Min Air Quality Index"
                                className="w-full bg-white"
                            />
                            <Input
                                type="number"
                                name="airQualityIndexMax"
                                value={filters.airQualityIndexMax}
                                onChange={handleChange}
                                placeholder="Max Air Quality Index"
                                className="w-full bg-white"
                            />
                        </div>
                    </div>

                    <div className="w-full">
                        <label className="block text-sm font-medium mb-1">Soil Quality Index Range</label>
                        <div className="flex flex-col space-y-2">
                            <Input
                                type="number"
                                name="soilQualityIndexMin"
                                value={filters.soilQualityIndexMin}
                                onChange={handleChange}
                                placeholder="Min Soil Quality Index"
                                className="w-full bg-white"
                            />
                            <Input
                                type="number"
                                name="soilQualityIndexMax"
                                value={filters.soilQualityIndexMax}
                                onChange={handleChange}
                                placeholder="Max Soil Quality Index"
                                className="w-full bg-white"
                            />
                        </div>
                    </div>



                </div>

                {/* Right Column */}
                <div className="space-y-4">
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

                <div className="w-full">
                        <label className="block text-sm font-medium mb-1">Water Quality Index Range</label>
                        <div className="flex flex-col space-y-2">
                            <Input
                                type="number"
                                name="waterQualityIndexMin"
                                value={filters.waterQualityIndexMin}
                                onChange={handleChange}
                                placeholder="Min Water Quality Index"
                                className="w-full bg-white"
                            />
                            <Input
                                type="number"
                                name="waterQualityIndexMax"
                                value={filters.waterQualityIndexMax}
                                onChange={handleChange}
                                placeholder="Max Water Quality Index"
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

export default EnvironmentalDataFilter;