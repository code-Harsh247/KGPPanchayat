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

const AssestsFilter = ({ onApply }) => {
    const maxValue = useRef(null);
    const minValue = useRef(null);
    const [filters, setFilters] = useState({
        purchaseDateStart: "",
        purchaseDateEnd: "",
        lastMaintenanceDateStart: "",
        lastMaintenanceDateEnd: "",
        name: "",
        type: "",
        valueMin: "",
        valueMax: "",
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
            purchaseDateStart: "",
            purchaseDateEnd: "",
            lastMaintenanceDateStart: "",
            lastMaintenanceDateEnd: "",
            name: "",
            type: "",
            valueMin: "",
            valueMax: "",
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
        { label: "Name", value: "name" },
        { label: "Type", value: "type" },
        { label: "Location", value: "location" },
        { label: "Value", value: "value" },
        { label: "Purchase Date", value: "purchase_date" },
        { label: "Last Maintenance Date", value: "last_maintenance" },


    ];

    return (
        <div className="w-[80%] bg-[#FCF4F2] border border-gray-300 p-4 mx-auto relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left Column */}
                <div className="space-y-4">
                    <div className="w-full">
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-full justify-start">
                                    {filters.name || "Select Name"}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-full">
                                {["Solar Panels", "Fire Extinguishers", "Bus Stop", "Water Tank", "Street Lights", "Primary School", "Village Playground", "Panchayat Hall Chairs", "Ambulance", "Village Park", "CCTV Cameras", "Irrigation Pump", "Tractor", "Electric Transformer", "Panchayat Office", "Community Center", "Village Well", "Library", "Community Hall", "Public Toilets", "Medical Dispensary"
                                ].map((option) => (
                                    <DropdownMenuItem
                                        key={option}
                                        onClick={() => setFilters({ ...filters, name: option })}
                                    >
                                        {option}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="w-full">
                        <label className="block text-sm font-medium mb-1">Type</label>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-full justify-start">
                                    {filters.type || "Select Type"}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-full">
                                {["Furniture",
                                "Infrastructure",
                                "Vehicle",
                                "Building",
                                "Equipment"].map((option) => (
                                        <DropdownMenuItem
                                            key={option}
                                            onClick={() => setFilters({ ...filters, type: option })}
                                        >
                                            {option}
                                        </DropdownMenuItem>
                                    ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="w-full">
                        <label className="block text-sm font-medium mb-1">Value Range</label>
                        <div className="flex flex-col space-y-2">
                            <Input
                                type="number"
                                name="valueMin"
                                ref={minValue}
                                value={filters.minValue}
                                onChange={handleChange}
                                placeholder="Min Value"
                                className="w-full bg-white"
                            />
                            <Input
                                type="number"
                                name="ValueMax"
                                ref={maxValue}
                                value={filters.maxValue}
                                onChange={handleChange}
                                placeholder="Max Value"
                                className="w-full bg-white"
                            />
                        </div>
                    </div>

                    <div className="w-full">
                        <label className="block text-sm font-medium mb-1">Maintenance Date Range</label>
                        <div className="flex flex-col space-y-2">
                            <Input
                                type="date"
                                name="lastMaintenanceDateStart"
                                value={filters.lastMaintenanceDateStart}
                                onChange={handleChange}
                                placeholder="Maintenance Date Start"
                                className="w-full bg-white"
                            />
                            <Input
                                type="date"
                                name="lastMaintenanceDateEnd"
                                value={filters.lastMaintenanceDateEnd}
                                onChange={handleChange}
                                placeholder="Maintenance Date End"
                                className="w-full bg-white"
                            />
                        </div>
                    </div>


                </div>

                {/* Right Column */}
                <div className="space-y-4">
                <div className="w-full">
                        <label className="block text-sm font-medium mb-1">Purchase Date Range</label>
                        <div className="flex flex-col space-y-2">
                            <Input
                                type="date"
                                name="purchaseDateStart"
                                value={filters.purchaseDateStart}
                                onChange={handleChange}
                                placeholder="Purchase Date Start"
                                className="w-full bg-white"
                            />
                            <Input
                                type="date"
                                name="purchaseDateEnd"
                                value={filters.purchaseDateEnd}
                                onChange={handleChange}
                                placeholder="Purchase Date End"
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

export default AssestsFilter;