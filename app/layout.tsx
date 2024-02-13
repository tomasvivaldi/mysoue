import "./globals.css";
import type { Metadata } from "next";
import { ApolloWrapper } from "../lib/apolloWrapper";
import AuthProvider from "../context/AuthProvider";

export const metadata: Metadata = {
  title: "My Soue",
  description: "Make your sharable wishlist today!",
};

interface RootLayoutProps {
  children: React.ReactNode;
  session: any; // Same note on typing as above
}

const RootLayout: React.FC<RootLayoutProps> = ({ children, session }) => {
  return (
    <ApolloWrapper>
      <AuthProvider session={session}>
        <html lang="en">
          <body className="min-h-screen bg-white font-poppins ">
            {children}
          </body>
        </html>
      </AuthProvider>
    </ApolloWrapper>
  );
};

export default RootLayout;
