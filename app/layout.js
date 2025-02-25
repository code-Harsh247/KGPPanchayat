import "./globals.css";
import Navbar from '@/Components/Navbar'
import PromptBar from "@/Components/PromptBar";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="h-screen flex flex-col">
          <Navbar />
          {children}
          
        </div>
      </body>
    </html>
  );
}
