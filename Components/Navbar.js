"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/States/auth";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  
  // Fix: Use individual selectors instead of returning an object
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const loading = useAuthStore((state) => state.loading);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const role = useAuthStore((state) => state.role);

  // Check if user can add data (has Admin or panchayat_employees role)
  console.log("Role is ",role);
  const canAddData = isAuthenticated && (role === "Admin" || role === "Panchayat_Employee");

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Navigate to login page
  const handleLogin = () => {
    router.push("/login");
  };

  // Navigate to profile page
  const handleLogout = async () => {
    try {
      await axios.post("/api/logout");
      window.location.href = "/"; // Redirect to home page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleFAQs = () => {
    router.push("/faqs");
  };

  const handleViewReports = () => {
    router.push("/viewReports");
  };

  const handleAddData = () => {
    router.push("/selectTable");
  };

  const goToHome = () => {
    router.push("/");
  };

  return (
    <div className="w-screen h-12 flex justify-between items-center px-4 bg-white font-Crimson">
      {/* Logo */}
      <div className="h-3/4">
        <img src="./Images/LogoStar.svg" className="h-full w-full object-contain" onClick={goToHome} />
      </div>

      {/* Desktop Menu */}
      <div className="hidden h-4/5 md:flex space-x-2">
        <div className="cursor-pointer w-32 flex justify-center items-center text-lg font-medium border border-transparent hover:border-primary_grey hover:bg-[#F2F2F2] rounded-sm transition-all duration-300 ease-in-out active:scale-90" onClick={handleFAQs}>
          FAQs
        </div>
        <div className="cursor-pointer w-32 flex justify-center items-center text-lg font-medium border border-transparent hover:border-primary_grey hover:bg-[#F2F2F2] rounded-sm transition-all duration-300 ease-in-out active:scale-90" onClick={handleViewReports}>
          View Reports
        </div>

        {/* Conditionally render Add Data option for Admin or panchayat_employees */}
        {canAddData && (
          <div className="cursor-pointer w-32 flex justify-center items-center text-lg font-medium border border-transparent hover:border-primary_grey hover:bg-[#F2F2F2] rounded-sm transition-all duration-300 ease-in-out active:scale-90" onClick={handleAddData}>
            Add Data
          </div>
        )}

        {/* Show loading spinner before deciding between Log In / Profile */}
        {loading ? (
          <div className="cursor-pointer w-1/2 h-10 flex justify-center items-center text-sm font-mediu">
            <Loader2 className="animate-spin w-1/2 h-1/2 text-primary_orange" />
          </div>
        ) : isAuthenticated ? (
          <div className="cursor-pointer bg-primary_orange w-32 flex justify-center items-center text-lg font-medium border border-transparent hover:border-primary_grey hover:bg-secondary_orange rounded-sm transition-all duration-300 ease-in-out active:scale-90 text-white" onClick={handleLogout}>
            Log Out
          </div>
        ) : (
          <div className="cursor-pointer bg-primary_orange w-32 flex justify-center items-center text-lg font-medium border border-transparent hover:border-primary_grey hover:bg-secondary_orange rounded-sm transition-all duration-300 ease-in-out active:scale-90 text-white" onClick={handleLogin}>
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
          <div className="cursor-pointer w-full h-12 border flex justify-center items-center text-lg font-medium hover:bg-primary_grey_background" onClick={handleFAQs}>
            FAQs
          </div>
          <div className="cursor-pointer w-full h-12 border flex justify-center items-center text-lg font-medium hover:bg-primary_grey_background" onClick={handleViewReports}>
            View Reports
          </div>
          
          {/* Conditionally render Add Data option for Admin or panchayat_employees */}
          {canAddData && (
            <div className="cursor-pointer w-full h-12 border flex justify-center items-center text-lg font-medium hover:bg-primary_grey_background" onClick={handleAddData}>
              Add Data
            </div>
          )}
          
          {/* Show loading spinner before deciding between Log In / Profile */}
          {loading ? (
            <div className="cursor-pointer w-full h-12 border flex justify-center items-center text-lg font-medium hover:bg-primary_grey_background">
              <Loader2 className="animate-spin w-6 h-6 text-primary_orange" />
            </div>
          ) : isAuthenticated ? (
            <div className="cursor-pointer w-full h-12 border flex justify-center items-center text-lg font-medium hover:bg-primary_grey_background" onClick={handleLogout}>
              Log Out
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