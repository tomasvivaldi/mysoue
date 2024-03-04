import React, { ReactNode, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useFetchUserIdByEmail } from "@/hooks/useFetchUserIdByEmail";
import { UserProvider } from "@/context/UserContext";

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  const { data: session, status: sessionStatus } = useSession();
  const email = session?.user?.email || "";
  const {
    userId,
    loading: userIdLoading,
    error,
  } = useFetchUserIdByEmail(email);

  // State to manage overall loading status, considering both session and userId fetching
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Determine loading state based on session loading and userId loading
    const isLoading = sessionStatus === "loading" || userIdLoading;
    setLoading(isLoading);
  }, [sessionStatus, userIdLoading]);

  if (loading) {
    return <div>Loading user information...</div>;
  }

  if (error) {
    return <div>Error fetching user information: {error.message}</div>;
  }

  if (!userId) {
    return <div>User not found or not logged in</div>;
  }
  console.log("Providing context with userId:", userId);
  return <UserProvider userId={userId}>{children}</UserProvider>;
};

export default UserLayout;
