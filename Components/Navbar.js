"use client";

import React, { useState, useEffect, use } from "react";
import { Menu, X } from "lucide-react"; // Hamburger icons
import { useRouter } from "next/navigation";
import useAuthStore from "@/States/auth";
import { Loader2 } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const loading = useAuthStore((state) => state.loading);
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, []);

  // Navigate to login page
  const handleLogin = () => {
    router.push("/login");
  };

  // Navigate to profile page
  const handleProfile = () => {
    router.push("/profile"); // Change this to your actual profile page route
  };

  const handleViewReports = () => {
    router.push("/viewReports");
  }

  return (
    <div className="w-screen h-12 flex justify-between items-center px-4 bg-white font-Crimson">
      {/* Logo */}
      <div className="h-3/4">
        <img src="./Images/LogoStar.svg" className="h-full w-full object-contain" />
      </div>

      {/* Desktop Menu */}
      <div className="hidden h-4/5 md:flex space-x-2">
        <div className="cursor-pointer w-32 flex justify-center items-center text-lg font-medium border border-transparent hover:border-primary_grey hover:bg-[#F2F2F2] rounded-sm transition-all duration-300 ease-in-out active:scale-90">
          FAQs
        </div>
        <div className="cursor-pointer w-32 flex justify-center items-center text-lg font-medium border border-transparent hover:border-primary_grey hover:bg-[#F2F2F2] rounded-sm transition-all duration-300 ease-in-out active:scale-90" onClick={handleViewReports}>
          View Reports
        </div>

        {/* Show loading spinner before deciding between Log In / Profile */}
        {loading ? (
          <div className="cursor-pointer w-1/2 h-10 flex justify-center items-center text-sm font-mediu">
            <Loader2 className="animate-spin w-1/2 h-1/2 text-primary_orange" />
          </div>
        ) : isAuthenticated ? (
          <div className="cursor-pointer w-32 flex justify-center items-center text-lg font-medium border border-transparent hover:border-primary_grey hover:bg-[#F2F2F2] rounded-sm transition-all duration-300 ease-in-out active:scale-90" onClick={handleProfile}>
            Profile
          </div>
        ) : (
          <div className="cursor-pointer w-32 flex justify-center items-center text-lg font-medium border border-transparent hover:border-primary_grey hover:bg-[#F2F2F2] rounded-sm transition-all duration-300 ease-in-out active:scale-90" onClick={handleLogin}>
            Log In
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white flex flex-col items-center md:hidden">
          <div className="cursor-pointer w-full h-12 border flex justify-center items-center text-lg font-medium hover:bg-primary_grey_background">
            FAQs
          </div>
          <div className="cursor-pointer w-full h-12 border flex justify-center items-center text-lg font-medium hover:bg-primary_grey_background" onClick={handleViewReports}>
            View Reports
          </div>
          {/* Show loading spinner before deciding between Log In / Profile */}
          {loading ? (
            <div className="cursor-pointer w-full h-12 border flex justify-center items-center text-lg font-medium hover:bg-primary_grey_background">
              <Loader2 className="animate-spin w-6 h-6 text-primary_orange" />
            </div>
          ) : isAuthenticated ? (
            <div className="cursor-pointer w-full h-12 border flex justify-center items-center text-lg font-medium hover:bg-primary_grey_background" onClick={handleProfile}>
              Profile
            </div>
          ) : (
            <div className="cursor-pointer w-full h-12 border flex justify-center items-center text-lg font-medium hover:bg-primary_grey_background" onClick={handleLogin}>
              Log In
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
