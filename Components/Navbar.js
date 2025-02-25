'use client'

import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // Hamburger icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-screen h-12 flex justify-between items-center px-4 bg-white font-Crimson">
      {/* Logo */}
      <div className="h-3/4">
        <img src="./Images/LogoStar.svg" className="h-full w-full object-contain"/>
      </div>

      {/* Desktop Menu */}
      <div className="hidden h-4/5 md:flex space-x-2">
        <div className="cursor-pointer w-32 flex justify-center items-center  text-lg font-medium border border-transparent hover:border-primary_grey hover:bg-[#F2F2F2] rounded-sm transition-all duration-300 ease-in-out active:scale-90">FAQs</div>
        <div className="cursor-pointer w-32 flex justify-center items-center text-lg font-medium border border-transparent hover:border-primary_grey hover:bg-[#F2F2F2] rounded-sm transition-all duration-300 ease-in-out active:scale-90">View Reports</div>
        <div className="cursor-pointer w-32 flex justify-center items-center text-lg font-medium border border-transparent hover:border-primary_grey hover:bg-[#F2F2F2] rounded-sm transition-all duration-300 ease-in-out active:scale-90">Log In</div>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white flex flex-col items-center md:hidden">
          <div className="cursor-pointer w-full h-12 border flex justify-center items-center text-lg font-medium hover:bg-primary_grey_background">Log in</div>
          <div className="cursor-pointer w-full h-12 border flex justify-center items-center text-lg font-medium hover:bg-primary_grey_background">View Reports</div>
          <div className="cursor-pointer w-full h-12 border flex justify-center items-center text-lg font-medium hover:bg-primary_grey_background">FAQs</div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
