'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PromptBar from '@/Components/PromptBar';
import ReportComp from '@/Components/ReportComp';
import { formatTableName } from '@/lib/utils';

const Page = () => {
  const [tables, setTables] = React.useState([]);
  const [loading, setLoading] = React.useState(true); // Track loading state  

  const fetchTables = async () => {
    try {
      const res = await axios.post("/api/fetchTables");

      console.log("API Response:", res.data);

      if (Array.isArray(res.data.results)) {
        setTables(res.data.results);
      } else {
        setTables([]);
      }
    } catch (error) {
      setTables([]);
    } finally {
      setLoading(false); // Mark loading as done
    }
  };

  React.useEffect(() => {
    fetchTables();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center p-4 sm:p-6">
      <h1 className="font-NT text-4xl sm:text-5xl md:text-6xl p-4 text-center">Data and Reports</h1>

      <div className="w-full sm:w-3/4 lg:w-1/2 rounded-sm bg-white border border-primary_grey p-3 shadow-sm mb-4">
        <PromptBar />
      </div>

      <div className="w-full sm:w-[90%] lg:w-[80%] h-32 p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 border-4 border-primary_grey border-t-transparent rounded-full animate-spin"></div>
              <p className="text-primary_orange mt-2 font-Crimson">Loading tables...</p>
            </div>
          </div>
          // Show loading message
        ) : tables.length > 0 ? (
          tables.map((table, index) => (
            <ReportComp
              key={index}
              title={formatTableName(table.table_name)}
              description={`Records from ${table.table_name}`}
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