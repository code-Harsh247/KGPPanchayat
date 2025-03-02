'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReportComp from '@/Components/ReportComp';
import useAuthStore from '@/States/auth';

const Page = () => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const role = useAuthStore((state) => state.role);
  const fetchTables = async () => {
    try {
      const res = await axios.post("/api/fetchTables",{
        userRole: role
      });

      const allowedTables = res.data.tables; // Get filtered tables
      console.log("Tables the user can access:", allowedTables);

      if (Array.isArray(allowedTables) && allowedTables.length > 0) {
        setTables(allowedTables);
      } else {
        setTables([]);
      }
    } catch (error) {
      console.error("Error fetching tables:", error);
      setTables([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(role) fetchTables();
  }, [role]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center p-4 sm:p-6">
      <h1 className="font-NT text-4xl sm:text-5xl md:text-6xl p-4 text-center">Add Data</h1>

      <div className="w-full sm:w-[90%] lg:w-[80%] p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 border-4 border-primary_grey border-t-transparent rounded-full animate-spin"></div>
              <p className="text-primary_orange mt-2 font-Crimson">Loading tables...</p>
            </div>
          </div>
        ) : tables.length > 0 ? (
          tables.map((table, index) => (
            <ReportComp
              key={index}
              title={table.title}
              name={table.name}
              description={table.description || "No description available"} // Use 'description'
            />
          ))
        ) : (
          <p className="text-red-500">No tables found</p>
        )}
      </div>
    </div>
  );
};

export default Page;
