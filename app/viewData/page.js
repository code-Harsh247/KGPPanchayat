'use client'
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
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
import { Pencil, Trash2, BarChart } from 'lucide-react'; // Added BarChart icon
import useAuthStore from '@/States/auth';
import { tablePrimaryKeys } from '@/lib/Schema';
import { toast } from 'sonner';
import EditDataModal from '@/Components/EditDataModal';

const Page = () => {
    const router = useRouter(); // Added router for navigation
    const searchParams = useSearchParams();
    const name = searchParams.get('name');
    const decodedTitle = searchParams.get('title');
    const primaryKeyName = tablePrimaryKeys[name];
    // Get user role from auth store
    const { role } = useAuthStore();
    const [editingRecord, setEditingRecord] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [limit] = useState(25);
    const [sortColumn, setSortColumn] = useState("invoice");
    const [sortOrder, setSortOrder] = useState("asc");
    const [filters, setFilters] = useState(null);
    const [columnsWithTypes, setColumsWithTypes] = useState({});
    const [downloadData, setDownloadData] = useState([]);
    const [downloadLoading, setDownloadLoading] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    // Function to navigate to Analytics page
    const handleAnalyticsClick = () => {
        router.push(`/analytics?name=${name}&title=${encodeURIComponent(decodedTitle)}`);
    };

    // Function to check if user has edit permissions
    const hasEditPermission = () => {
        return role === 'Panchayat_Employee' || role === 'Admin';
    };

    // Function to check if user has delete permissions
    const hasDeletePermission = () => {
        return role === 'Panchayat_Employee' || role === 'Admin';
    };

    // Function to fetch data - extracted to be reusable
    const fetchData = async () => {
        setLoading(true);
        setError(null);
        const apiFilters = transFormFilters(filters);
        try {
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
    
    useEffect(() => {
        fetchData();
    }, [name, page, limit, sortColumn, sortOrder, filters, refreshTrigger]);

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

    // Function to handle refreshing data after edits or other changes
    const refreshData = () => {
        // Increment the refreshTrigger to force the useEffect to run again
        setRefreshTrigger(prev => prev + 1);
        toast.success("Data refreshed successfully");
    };

    // Handle opening edit modal with the selected record
    const openEditModal = (rowData) => {
        setEditingRecord(rowData);
        setIsEditModalOpen(true);
    };

    // Handle modal close with optional refresh
    const handleModalClose = (shouldRefresh = false) => {
        setIsEditModalOpen(false);
        if (shouldRefresh) {
            refreshData();
        }
    };

    // Handle delete action
    const handleDelete = async (rowData) => {
        if (!confirm(`Are you sure you want to delete this record?`)) {
            return;
        }
        try {
            const response = await axios.delete("/api/deleteRecord", {
                data: { // Pass as request body
                    table: name,
                    primaryKey: primaryKeyName, // Column name
                    primaryKeyColumn: rowData[primaryKeyName] // Actual value
                }
            });
            if (response.data.success) {
                // Remove the deleted record from the local state
                setData(prevData => prevData.filter(row =>
                    row[primaryKeyName] !== rowData[primaryKeyName]
                ));
                toast.success("Record deleted successfully");
            }
        } catch (err) {
            console.error("Error deleting record:", err);
            toast.error(err.response?.data?.message || "Failed to delete record");
        }
    };

    useEffect(() => {
        const csvName = `${name}.csv`;
        if (downloadData.length > 0) {
            downloadCsv(downloadData, csvName);
            setDownloadData([]);
        }
    }, [downloadData, name]);

    return (
        <div className="w-full flex flex-col items-center font-Crimson">
            <h1 className="text-4xl sm:text-5xl md:text-6xl p-4 text-center">{decodedTitle}</h1>
            {/* Filter Section */}
            <FilterSection handleApplyFilters={handleApplyFilters} name={name} />
            <div className="w-[80%] p-6 mt-4 border ">
                <div className="w-full text-xl mb-4 flex justify-between">
                    <div className="flex gap-2">
                        <p>Available Records:</p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            onClick={refreshData}
                            variant="outline"
                            className="ml-4 h-full px-2"
                            title="Refresh data"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-cw">
                                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                                <path d="M21 3v5h-5"></path>
                                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                                <path d="M3 21v-5h5"></path>
                            </svg>
                        </Button>
                        {/* Analytics Button */}
                        <Button
                            onClick={handleAnalyticsClick}
                            variant="secondary"
                            className="active:scale-95 transition-all duration-300 ease-in-out"
                        >
                            <div className="flex items-center gap-2">
                                <BarChart className="h-5 w-5" />
                                Analytics
                            </div>
                        </Button>
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
                                {/* Add Actions column header if user has permission */}
                                {(hasEditPermission() || hasDeletePermission()) && (
                                    <TableHead className="text-right">Actions</TableHead>
                                )}
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
                                    {/* Conditionally render action buttons based on user role */}
                                    {(hasEditPermission() || hasDeletePermission()) && (
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                {hasEditPermission() && (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => openEditModal(row)}
                                                        className="h-8 w-8 p-0"
                                                    >
                                                        <Pencil className="h-4 w-4 text-black" />
                                                        <span className="sr-only">Edit</span>
                                                    </Button>
                                                )}
                                                {hasDeletePermission() && (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDelete(row)}
                                                        className="h-8 w-8 p-0"
                                                    >
                                                        <Trash2 className="h-4 w-4 text-red-500" />
                                                        <span className="sr-only">Delete</span>
                                                    </Button>
                                                )}
                                            </div>
                                        </TableCell>
                                    )}
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
            {/* Edit Modal Component */}
            <EditDataModal
                isOpen={isEditModalOpen}
                onClose={() => handleModalClose(true)}
                tableName={name}
                recordData={editingRecord}
                title={decodedTitle}
            />
        </div>
    );
};

export default Page;