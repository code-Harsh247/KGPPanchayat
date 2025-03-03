'use client'

import React, { useEffect, useState } from 'react'
import useSQLStore from '@/States/sqlStore'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Button } from '@/Components/ui/btn';
import axios from 'axios'
import { convertJsonToCsv, downloadCsv } from "@/lib/utils";

const page = () => {
    const sqlQuery = useSQLStore(state => state.sqlGenQuery)

    console.log("SQL Query in Generated Page:", sqlQuery);

    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [limit] = useState(25);
    const [downloadData, setDownloadData] = useState([]);
    const [downloadLoading, setDownloadLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            console.log("Query Passing : ", sqlQuery);
            const response = await axios.post("/api/executeSQL", {
                sql: sqlQuery,
                page,
                limit
            });

            setColumns(response.data.columns);
            setData(response.data.records);
            const csvData = convertJsonToCsv(response.data.records);
            setDownloadData(csvData);
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Failed to fetch data");
        }

        setLoading(false);
    };
    useEffect(() => {
        fetchData();
    }, [page, limit, sqlQuery]);

    const handleDownload = () => {
        setDownloadLoading(true);
        downloadCsv(downloadData, "query-result.csv");
        setDownloadData([]);
        setTimeout(() => {
            setDownloadLoading(false);
        }, 1000);
    }



    return (
        <div className="w-full flex flex-col items-center font-Crimson">
            <h1 className="text-4xl sm:text-5xl md:text-6xl p-4 text-center">Query Result</h1>

            <div className="w-[80%] p-6 mt-4 border ">
                <div className="w-full text-xl mb-4 flex justify-between">
                    <div className="flex gap-2">
                        <p>Available Records:</p>
                    </div>
                    <div className="flex gap-2">
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
                {loading ? (
                    <p className="text-center text-gray-500">Loading data...</p>
                ) : error ? (
                    <p className="text-center text-red-500">Error: {error}</p>
                ) : (
                    <Table>
                        <TableCaption>Data related to Generated Query</TableCaption>
                        <TableHeader>
                            <TableRow>
                                {columns.map((col) => (
                                    <TableHead key={col}>{col}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((row, index) => (
                                <TableRow key={index}>
                                    {columns.map((col) => (
                                        <TableCell key={col}>{row[col]}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}

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
}
export default page;