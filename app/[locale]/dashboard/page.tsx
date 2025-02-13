"use client";
import React, { ReactElement, useEffect, useState } from "react";
import { fetchUserData } from "@/hooks/fetchUserData"; // Adjust the import to your actual data-fetching function
import { GET_USERS_BY_EMAIL, GET_USERS_BY_ID } from "@/graphql/queries";
import client from "@/apollo-client";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import LoadingBox from "@/components/LoadingBox";

interface ChildComponentProps {
  userData: UserById | null;
}

// interface RootDashboardProps {
//   children:
//     | ReactElement<ChildComponentProps>[]
//     | ReactElement<ChildComponentProps>;
// }

interface WishlistItem {
  added_at: string;
  additional_description?: string;
  product_id: string;
  quantity: number;
  updated_at: string;
  wishlist_id: string;
  id: string;
}

interface Wishlist {
  address?: string;
  created_at: string;
  description?: string;
  due_date?: string;
  require_address: boolean;
  title: string;
  type: string;
  updated_at: string;
  user_id: string;
  id: string;
  Wishlist_items: WishlistItem[];
}

interface UserById {
  created_at: string;
  email: string;
  id: string;
  oauth_provider: string;
  password_hash: string;
  profile_picture_url: string;
  updated_at: string;
  username: string;
  wishlists: Wishlist[];
}

// The response structure for the GET_USERS_BY_ID query
interface UsersByIdResponse {
  usersById: UserById[];
}
interface UserWithProvider extends User {
  provider?: string;
}

const Dashboard: React.FC<any> = ({ children }) => {
  const [userData, setUserData] = useState<UserById | null>(null);
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();
  const user = session?.user as UserWithProvider;
  console.log("session", session);
  console.log("session?.user?.email", user?.email);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const userEmail = user?.email;

        if (userEmail) {
          const emailResponse = await client.query({
            query: GET_USERS_BY_EMAIL,
            variables: { email: userEmail },
          });
          const userId = emailResponse.data.usersByEmail?.[0]?.id;
          console.log("userId", userId);

          if (userId) {
            const idResponse = await client.query({
              query: GET_USERS_BY_ID,
              variables: { id: userId },
            });
            // Adjust this part to match the actual response structure
            const userDataById = idResponse.data.userDataById;
            if (userDataById) {
              setUserData(userDataById);
              console.log("userData set to: ", userDataById);
            } else {
              console.error("User data not found for ID:", userId);
            }
          }
        } else {
          console.log("No user email found, skipping data fetch.");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user?.email]);

  if (loading) {
    // Optional: Render a loading indicator
    return       
      <LoadingBox
        imageSrc="/Symbol/Logo-Mysoue-Symbol_2.png"
        imageAlt="Loading spinner"
        imageClassName=""
        containerClassName="h-[80vh]"
      />;
  }

  return React.Children.map(children, (child) => {
    if (React.isValidElement<ChildComponentProps>(child)) {
      return React.cloneElement(child, { userData });
    }
    return child;
  });
};

export default Dashboard;
