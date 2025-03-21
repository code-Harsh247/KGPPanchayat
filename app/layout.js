'use client'

import "./globals.css";
import { Toaster } from "@/Components/ui/sonner"
import Navbar from '@/Components/Navbar'
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {

  const pathname = usePathname();
  const hideNavbarOn = ["/login","/signup"]

  return (
    <html lang="en">
      <body>
        <div className="h-screen flex flex-col">
          {!hideNavbarOn.includes(pathname) && <Navbar />}
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
