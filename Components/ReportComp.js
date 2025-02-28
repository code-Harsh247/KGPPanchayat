// ReportComp.js
import React from 'react';
import { useRouter } from 'next/navigation';

const ReportComp = ({ title,name,description }) => {
    const router = useRouter();
    const handleClick = () => {
        router.push(`/viewData?name=${encodeURIComponent(name)}&title=${encodeURIComponent(title)}`);
    };
    
    
  return (
    <div className="w-full sm:w-full h-auto border rounded-md bg-[#FAEDE9] text-primary_orange flex flex-col justify-center items-start p-4 hover:bg-[#f4e2dc] transition duration-300"
    onClick={handleClick}>
      <h1 className="text-xl sm:text-2xl font-Crimson">{title}</h1>
      <p className="font-Crimson text-[#717171] text-sm sm:text-base">{description}</p>
    </div>
  );
};

export default ReportComp;