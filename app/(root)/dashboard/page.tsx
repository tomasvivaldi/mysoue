// dashboard/index.jsx or dashboard.jsx depending on your file structure
import React from "react";
import { UserProvider } from "@/context/UserContext";
import { useUser } from "@/context/UserContext";

const Dashboard = () => {
  // Use useUser hook here just for testing
  const { userData, loading, error } = useUser();

  return (
    <UserProvider userId="test-user-id">
      {" "}
      {/* Use a dummy userId for testing */}
      {/* Your dashboard content here */}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {userData && <div>{/* Render userData content */}</div>}
    </UserProvider>
  );
};

export default Dashboard;
