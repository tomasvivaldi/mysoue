// fetchUserData.server.ts
"use server";

import fetchUserData from "@/lib/fetchUserData";

export async function getUserData(email: string) {
  // This function could now be used directly with the `use` hook in your components,
  // assuming you have the user's email available in the server component's context.
  return await fetchUserData(email);
}
