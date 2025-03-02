'use client'
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import FilterSection from '@/Components/FilterSection';
import { Button } from '@/Components/ui/btn';
import { transFormFilters } from '@/lib/utils';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { convertJsonToCsv, downloadCsv } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { set } from 'zod';


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
    const [downloadData, setDownloadData] = useState([]);
    const [downloadLoading, setDownloadLoading] = useState(false);

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

    const handleDownload = async () => {
        setDownloadLoading(true);
        setError(null);
    
        const apiFilters = transFormFilters(filters);
    
        try {
            const response = await axios.post("/api/fetchData", {
                table: name,
                page,
                limit: null,
                sort: sortColumn,
                order: sortOrder,
                filters: apiFilters
            });
    
            const csvData = convertJsonToCsv(response.data.records);
            setDownloadData(csvData);
    
            // Delay for 1 second before enabling button again
            setTimeout(() => {
                setDownloadLoading(false);
            }, 1000);
    
        } catch (err) {
            console.error("Error fetching download data:", err);
            setError("Failed to fetch download data");
            setDownloadLoading(false);
        }
    };
    

    useEffect(() => {
        const csvName = `${name}.csv`;
        if (downloadData.length > 0) {
            downloadCsv(downloadData, csvName);
            setDownloadData([]);
        }

    }, [downloadData]);

    return (
        <div className="w-full flex flex-col items-center font-Crimson">
            <h1 className="text-4xl sm:text-5xl md:text-6xl p-4 text-center">{decodedTitle}</h1>

            {/* Filter Section */}

            <FilterSection handleApplyFilters={handleApplyFilters} name={name} />

            <div className="w-[80%] p-6 mt-4 border ">
                <div className="w-full text-xl mb-4 flex justify-between">
                    <p>Available Records:</p>
                    <Button
                        onClick={handleDownload}
                        variant="default"
                        className="active:scale-95 transition-all duration-300 ease-in-out"
                        disabled={downloadLoading} // Disable when loading
                    >
                        <div className="flex items-center gap-2">
                            {downloadLoading ? (
                                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeDasharray="31.4 31.4" strokeLinecap="round"></circle>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="7 10 12 15 17 10"></polyline>
                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                            )}
                            {downloadLoading ? "Downloading..." : "Download CSV"}
                        </div>
                    </Button>

                </div>




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
