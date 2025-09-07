import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Need for Speed - Ultimate Racing Experience",
  description: "Experience the thrill of high-speed racing in the ultimate street racing game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} bg-black text-white overflow-x-hidden`}>
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900/20">
          <Navigation />
          <main className="relative">
            {children}
          </main>
        </div>
        
        {/* Racing Sound Effects Simulation */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-blue-500/5 animate-pulse"></div>
        </div>
      </body>
    </html>
  );
}