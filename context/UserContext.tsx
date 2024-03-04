import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS_BY_ID } from "@/graphql/queries";

// Define a type for Wishlist items
interface WishlistItemType {
  added_at: string;
  additional_description?: string; // Assuming it can be nullable
  product_id: string;
  quantity: number;
  updated_at: string;
  wishlist_id: string;
  id: string;
}

// Define a type for Wishlists
interface WishlistType {
  address?: string; // Assuming it can be nullable
  created_at: string;
  description?: string; // Assuming it can be nullable
  due_date?: string; // Assuming it can be nullable
  require_address: boolean;
  title: string;
  type?: string; // Assuming it can be nullable
  updated_at: string;
  user_id: string;
  id: string;
  Wishlist_items: WishlistItemType[];
}

// Define the UserType based on your GraphQL query
interface UserType {
  created_at: string;
  email: string;
  id: string;
  oauth_provider?: string; // Assuming it can be nullable
  password_hash?: string; // Assuming it can be nullable and you have access to this sensitive information
  profile_picture_url?: string; // Assuming it can be nullable
  updated_at: string;
  username: string;
  wishlists: WishlistType[];
}

// Update the UserContextType to use the new UserType
interface UserContextType {
  userData: UserType | null;
  loading: boolean;
  error: any; // Consider using ApolloError type if available from @apollo/client for better type safety
}

// Define the context type
interface UserContextType {
  userData: UserType | null;
  loading: boolean;
  error: any;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
interface UserProviderProps {
  userId: string;
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({
  userId,
  children,
}) => {
  const { loading, error, data } = useQuery(GET_USERS_BY_ID, {
    variables: { id: userId },
  });

  // Here, transform or directly pass the data as needed
  const userData = data?.usersById || null;

  return (
    <UserContext.Provider value={{ userData, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use the context
export const useUser = () => {
  const context = useContext(UserContext);
  console.log("Context:", context); // Debugging line
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
