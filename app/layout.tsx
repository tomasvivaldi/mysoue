import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Soue",
  description: "Make your sharable wishlist today!",
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
