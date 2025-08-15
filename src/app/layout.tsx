// app/layout.tsx
import "../styles/global.css"; // Import Tailwind global styles
import React from "react";
import type { Metadata } from "next";

// Metadata for the whole app (optional, but good for SEO)
export const metadata: Metadata = {
  title: "Sales Dashboard",
  description: "A Next.js sales dashboard with atomic design components",
};

// RootLayout wraps every page in the app
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-lightGray text-charcoalGray font-sans">
        {/* Site Header */}
        <header className="bg-red-700 text-white p-4 shadow-md">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Sales Dashboard</h1>
          </div>
        </header>

        {/* Main page content */}
        <main className="max-w-6xl mx-auto p-6">{children}</main>

        {/* Site Footer */}
        <footer className="bg-charcoalGray text-pureWhite p-4 text-center mt-10">
          © {new Date().getFullYear()} Sales Dashboard. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
