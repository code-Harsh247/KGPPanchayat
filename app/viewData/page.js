'use client'
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import FilterSection from '@/Components/FilterSection';
import { Button } from '@/Components/ui/btn';
import { transFormFilters} from '@/lib/utils';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";


const Page = () => {
    const searchParams = useSearchParams();
    const name = searchParams.get('name');
    const decodedTitle = searchParams.get('title');

    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [limit] = useState(25);
    const [sortColumn, setSortColumn] = useState("invoice");
    const [sortOrder, setSortOrder] = useState("asc");
    const [filters, setFilters] = useState(null); // flip between 0 and 1
    const [columnsWithTypes, setColumsWithTypes] = useState({});

    useEffect(() => {
        const fetchFilteredData = async () => {
            setLoading(true);
            setError(null);

            const apiFilters = transFormFilters(filters);

            try {
                console.log("filters:", filters);
                console.log("ApiFilters:", apiFilters);
                const response = await axios.post("/api/fetchData", {
                    table: name,
                    page,
                    limit,
                    sort: sortColumn,
                    order: sortOrder,
                    filters: apiFilters
                });

                setColumns(response.data.columns);
                setColumsWithTypes(response.data.columnsWithTypes);
                setData(response.data.records);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to fetch data");
            }

            setLoading(false);
        };

        fetchFilteredData();
    }, [name, page, limit, sortColumn, sortOrder, filters]);

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? dateString : date.toLocaleDateString('en-GB', {
            day: '2-digit', month: 'short', year: 'numeric'
        });
    };

    const handleApplyFilters = (Filter) => {
        setSortColumn(Filter.sortBy);
        setSortOrder(Filter.sortOrder);
        setFilters(Filter);
    }

    return (
        <div className="w-full flex flex-col items-center font-Crimson">
            <h1 className="text-4xl sm:text-5xl md:text-6xl p-4 text-center">{decodedTitle}</h1>

            {/* Filter Section */}
        
            <FilterSection handleApplyFilters={handleApplyFilters} name={name}/>

            <div className="w-[80%] p-6 mt-4 border">
                <div className="w-full text-xl mb-4">Available Records:</div>

                {/* Loading & Error Handling */}
                {loading ? (
                    <p className="text-center text-gray-500">Loading data...</p>
                ) : error ? (
                    <p className="text-center text-red-500">Error: {error}</p>
                ) : (
                    <Table>
                        <TableCaption>Data related to {decodedTitle}</TableCaption>
                        <TableHeader>
                            <TableRow>
                                {columns.map((col) => (
                                    <TableHead
                                        key={col}
                                        onClick={() => setSortColumn(col)}
                                        className="cursor-pointer hover:underline"
                                    >
                                        {col}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((row, index) => (
                                <TableRow key={index}>
                                    {columns.map((col) => (
                                        <TableCell key={col}>
                                            {columnsWithTypes[col] === "date" || columnsWithTypes[col] === "timestamp"
                                                ? formatDate(row[col])
                                                : row[col]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}

                {/* Pagination Controls */}
                <div className="flex justify-between items-center mt-4">
                    <Button
                        variant="outline"
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                    >
                        Previous
                    </Button>
                    <span className="text-sm font-medium">Page {page}</span>
                    <Button
                        variant="default"
                        onClick={() => setPage((prev) => prev + 1)}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Page;
