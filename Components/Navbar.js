"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/States/auth";
import axios from "axios";
import { toast } from "sonner";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Using individual selectors
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const loading = useAuthStore((state) => state.loading);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const role = useAuthStore((state) => state.role);
  const logout = useAuthStore((state) => state.logout);

  // Check if user can add data (Admin or Panchayat Employee)
  const canAddData = isAuthenticated && (role === "Admin" || role === "Panchayat_Employee");

  useEffect(() => {
    checkAuth();
    console.log("Role is ", role);
  }, []);

  // Navigate to login page
  const handleLogin = () => {
    router.push("/login");
  };

  // Logout and redirect
  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/"; // Redirect to home page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleFAQs = () => router.push("/faqs");
  const handleViewReports = () => {
    if(role){
      router.push("/viewReports");
    }
    else {
      toast.error('User role not found. Try Logging in again');
    }
    
  }
  const handleAddData = () => router.push("/selectTable");
  const goToHome = () => router.push("/");

  const getAccountType = () => {
    switch (role) {
      case "Admin":
        return "Admin";
      case "Panchayat_Employee":
        return "Panchayat Employee";
      case "Citizen":
        return "Citizen";
      case "Government_monitor":
        return "Government Monitor";
      default:
        return "";
    }
  };

  return (
    <div className="w-screen h-12 flex justify-between items-center px-4 bg-white font-Crimson">
      {/* Logo */}
      <div className="h-full flex gap-4 items-center">
        <div className="h-3/4 cursor-pointer" onClick={goToHome}>
          <img src="/Images/LogoStar.svg" className="h-full w-full object-contain" alt="Logo" />
        </div>
        <h1 className="font-Crimson text-xl font-medium">{getAccountType()}</h1>
      </div>

      {/* Desktop Menu */}
      <div className="hidden h-4/5 md:flex space-x-2">
        <div className="cursor-pointer w-32 flex justify-center items-center text-lg font-medium border border-transparent hover:border-primary_grey hover:bg-[#F2F2F2] rounded-sm transition-all duration-300 ease-in-out active:scale-90" onClick={handleFAQs}>
          FAQs
        </div>
        <div className="cursor-pointer w-32 flex justify-center items-center text-lg font-medium border border-transparent hover:border-primary_grey hover:bg-[#F2F2F2] rounded-sm transition-all duration-300 ease-in-out active:scale-90" onClick={handleViewReports}>
          View Reports
        </div>

        {/* Conditionally render Add Data option */}
        {canAddData && (
          <div className="cursor-pointer w-32 flex justify-center items-center text-lg font-medium border border-transparent hover:border-primary_grey hover:bg-[#F2F2F2] rounded-sm transition-all duration-300 ease-in-out active:scale-90" onClick={handleAddData}>
            Add Data
          </div>
        )}

        {/* Show loading spinner before deciding between Log In / Log Out */}
        {loading ? (
          <div className="w-10 h-10 flex justify-center items-center">
            <Loader2 className="animate-spin w-6 h-6 text-primary_orange" />
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
        <div className="absolute top-12 left-0 z-10 w-full bg-white flex flex-col items-center md:hidden">
          <div className="cursor-pointer w-full h-12 border flex justify-center items-center text-lg font-medium hover:bg-primary_grey_background" onClick={handleFAQs}>
            FAQs
          </div>
          <div className="cursor-pointer w-full h-12 border flex justify-center items-center text-lg font-medium hover:bg-primary_grey_background" onClick={handleViewReports}>
            View Reports
          </div>

          {/* Conditionally render Add Data option */}
          {canAddData && (
            <div className="cursor-pointer w-full h-12 border flex justify-center items-center text-lg font-medium hover:bg-primary_grey_background" onClick={handleAddData}>
              Add Data
            </div>
          )}

          {/* Show loading spinner before deciding between Log In / Log Out */}
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
