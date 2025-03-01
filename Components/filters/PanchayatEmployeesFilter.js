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

const PanchayatEmployeesFilter = ({ onApply }) => {
    const maxCitizenId = useRef(null);
    const minCitizenId = useRef(null);
    const [filters, setFilters] = useState({
        role: "",
        joiningDateStart: "",
        joiningDateEnd: "",
        citizenIdMin: "",
        citizenIdMax: "",
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
            role: "",
            joiningDateStart: "",
            joiningDateEnd: "",
            citizenIdMin: "",
            citizenIdMax: "",
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
        { label: "Role", value: "role" },
        { label: "Joining Date", value: "joining_date" }
    ];

    return (
        <div className="w-[80%] bg-[#FCF4F2] border border-gray-300 p-4 mx-auto relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left Column */}
                <div className="space-y-4">
                    <div className="w-full">
                        <label className="block text-sm font-medium mb-1">Role</label>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-full justify-start">
                                    {filters.role || "Select Role"}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-full">
                                {['Sarpanch', 'Panchayat Secretary', 'Village Development Officer', 'Gram Rozgar Sahayak', 'Panchayat Clerk', 'Computer Operator'].map((option) => (
                                    <DropdownMenuItem
                                        key={option}
                                        onClick={() => setFilters({ ...filters, role: option })}
                                    >
                                        {option}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="w-full">
                        <label className="block text-sm font-medium mb-1">Joining Date Range</label>
                        <div className="flex flex-col space-y-2">
                            <Input
                                type="date"
                                name="joiningDateStart"
                                value={filters.joiningDateStart}
                                onChange={handleChange}
                                placeholder="DOB Start"
                                className="w-full bg-white"
                            />
                            <Input
                                type="date"
                                name="joiningDateEnd"
                                value={filters.joiningDateEnd}
                                onChange={handleChange}
                                placeholder="DOB End"
                                className="w-full bg-white"
                            />
                        </div>
                    </div>

                </div>

                {/* Right Column */}
                <div className="space-y-4">
                    <div className="w-full">
                        <label className="block text-sm font-medium mb-1">Citizen ID Range</label>
                        <div className="flex flex-col space-y-2">
                            <Input
                                type="number"
                                name="citizenIdMin"
                                ref={minCitizenId}
                                value={filters.citizenIdMin}
                                onChange={handleChange}
                                placeholder="Min Citizen ID"
                                className="w-full bg-white"
                            />
                            <Input
                                type="number"
                                name="citizenIdMax"
                                ref={maxCitizenId}
                                value={filters.citizenIdMax}
                                onChange={handleChange}
                                placeholder="Max Citizen ID"
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

export default PanchayatEmployeesFilter;