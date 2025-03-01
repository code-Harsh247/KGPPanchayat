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

const HouseholdInfoFilter = ({ onApply }) => {
    const minAnnualIncome = useRef(null);
    const maxAnnualIncome = useRef(null);
    const minMemberCount = useRef(null);
    const maxMemberCount = useRef(null);
    const [filters, setFilters] = useState({
        address: "",
        memberCountMax: "",
        memberCountMin: "",
        annualIncomeMin: "",
        annualIncomeMax: "",
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
            memberCountMax: "",
            memberCountMin: "",
            annualIncomeMin: "",
            annualIncomeMax: "",
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
        { label: "Address", value: "address" },
        { label: "Annual Income", value: "annual_income" },
        { label: "Member Count", value: "member_count" }
    ];

    return (
        <div className="w-[80%] bg-[#FCF4F2] border border-gray-300 p-4 mx-auto relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left Column */}
                <div className="space-y-4">
                    <div className="w-full">
                        <label className="block text-sm font-medium mb-1">Annual Income Range</label>
                        <div className="flex flex-col space-y-2">
                            <Input
                                type="number"
                                name="annualIncomeMin"
                                ref={minAnnualIncome}
                                value={filters.annualIncomeMin}
                                onChange={handleChange}
                                placeholder="Min Annual Income"
                                className="w-full bg-white"
                            />
                            <Input
                                type="number"
                                name="annualIncomeMax"
                                ref={maxAnnualIncome}
                                value={filters.annualIncomeMax}
                                onChange={handleChange}
                                placeholder="Max Annual Income"
                                className="w-full bg-white"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">

                    <div className="w-full">
                        <label className="block text-sm font-medium mb-1">Member Count Range</label>
                        <div className="flex flex-col space-y-2">
                            <Input
                                type="number"
                                name="memberCountMin"
                                ref={minMemberCount}
                                value={filters.memberCountMin}
                                onChange={handleChange}
                                placeholder="Min Member Count"
                                className="w-full bg-white"
                            />
                            <Input
                                type="number"
                                name="memberCountMax"
                                ref={maxMemberCount}
                                value={filters.memberCountMax}
                                onChange={handleChange}
                                placeholder="Max Member Count"
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

export default HouseholdInfoFilter;