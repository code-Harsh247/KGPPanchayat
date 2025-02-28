
'use client'
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"




const page = () => {
    const { title } = useParams();
    const decodedTitle = title ? decodeURIComponent(title) : "";

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [limit] = useState(25); // Adjust page size
    const [sortColumn, setSortColumn] = useState("invoice"); // Default sort column
    const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'
    const [filterState, setFilterState] = useState(0); //flip between 0 and 1;

    const invoices = [
        {
          invoice: "INV001",
          paymentStatus: "Paid",
          totalAmount: "$250.00",
          paymentMethod: "Credit Card",
        },
        {
          invoice: "INV002",
          paymentStatus: "Pending",
          totalAmount: "$150.00",
          paymentMethod: "PayPal",
        },
        {
          invoice: "INV003",
          paymentStatus: "Unpaid",
          totalAmount: "$350.00",
          paymentMethod: "Bank Transfer",
        },
        {
          invoice: "INV004",
          paymentStatus: "Paid",
          totalAmount: "$450.00",
          paymentMethod: "Credit Card",
        },
        {
          invoice: "INV005",
          paymentStatus: "Paid",
          totalAmount: "$550.00",
          paymentMethod: "PayPal",
        },
        {
          invoice: "INV006",
          paymentStatus: "Pending",
          totalAmount: "$200.00",
          paymentMethod: "Bank Transfer",
        },
        {
          invoice: "INV007",
          paymentStatus: "Unpaid",
          totalAmount: "$300.00",
          paymentMethod: "Credit Card",
        },
      ]

    useEffect(() => {
        const fetchFilteredData = async () => {
            setLoading(true);
            try {

            }
            catch (err) {

            }
            setLoading(false);
        };
        fetchFilteredData();
    }, [filterState]);

    return (
        <div className="w-full flex flex-col items-center font-Crimson">
            <h1 className="text-4xl sm:text-5xl md:text-6xl p-4 text-center">{decodedTitle}</h1>

            {/* Filter Section (Placeholder) */}
            <div className="w-[80%] h-20 border border-gray-300 flex justify-between items-center p-4">
                <span>Filters Coming Soon...</span>
            </div>

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
                                <TableHead onClick={() => setSortColumn("invoice")}>Invoice</TableHead>
                                <TableHead onClick={() => setSortColumn("paymentStatus")}>Status</TableHead>
                                <TableHead onClick={() => setSortColumn("paymentMethod")}>Method</TableHead>
                                <TableHead className="text-right" onClick={() => setSortColumn("totalAmount")}>Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices.map((item) => (
                                <TableRow key={item.invoice}>
                                    <TableCell className="font-medium">{item.invoice}</TableCell>
                                    <TableCell>{item.paymentStatus}</TableCell>
                                    <TableCell>{item.paymentMethod}</TableCell>
                                    <TableCell className="text-right">{item.totalAmount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}

                {/* Pagination Controls */}
                <div className="flex justify-between mt-4">
                    <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        className="px-4 py-2 bg-gray-300 rounded"
                        disabled={page === 1}
                    >
                        Previous
                    </button>
                    <span>Page {page}</span>
                    <button
                        onClick={() => setPage((prev) => prev + 1)}
                        className="px-4 py-2 bg-gray-300 rounded"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default page;