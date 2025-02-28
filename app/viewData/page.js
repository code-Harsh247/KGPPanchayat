import React from 'react';
import PromptBar from '@/Components/PromptBar';
import ReportComp from '@/Components/ReportComp';

const Page = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center p-4 sm:p-6">
      <h1 className="font-NT text-4xl sm:text-5xl md:text-6xl p-4 text-center">Data and Reports</h1>
      
      <div className="w-full sm:w-3/4 lg:w-1/2 rounded-sm bg-white border border-primary_grey p-3 shadow-sm mb-4">
        <PromptBar />
      </div>
      
      <div className="w-full sm:w-[90%] lg:w-[80%] h-32 p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ReportComp title="Citizen Data" description="Public records of the citizens" />
        <ReportComp title="Agriculture Reports" description="Statistics on farming and crops" />
        <ReportComp title="Health Records" description="Healthcare data and reports" />
      </div>
    </div>
  );
};

export default Page;