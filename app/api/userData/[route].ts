import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import fetchUserData from "@/lib/fetchUserData";

// Type for the response to ensure type-safety
interface UserDataResponse {
  userData?: any; // Consider defining a more specific type
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserDataResponse>
) {
  if (req.method !== "POST") {
    // If not a POST request, return 405 - Method Not Allowed
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  console.log("Fetching session for user data...");
  const session = await getSession({ req });

  if (session?.user?.email) {
    try {
      console.log(`Fetching user data for email: ${session.user.email}`);
      const userData = await fetchUserData(session.user.email);
      console.log(`User data fetched: `, userData);
      return res.status(200).json({ userData });
    } catch (error) {
      console.error("Error fetching user data:", error);
      return res.status(500).json({ error: "Failed to fetch user data" });
    }
  } else {
    console.log("No session or user email found.");
    return res.status(401).json({ error: "Unauthorized" });
  }
}
