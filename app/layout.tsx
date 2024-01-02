import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "World Scan Project - Jikai",
  description: "World Scan Project's Jikai Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white font-poppins ">{children}</body>
    </html>
  );
}
