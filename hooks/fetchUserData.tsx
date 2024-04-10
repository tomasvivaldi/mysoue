import { GET_USERS_BY_EMAIL, GET_USERS_BY_ID } from "@/graphql/queries";
import { useQuery, gql, useApolloClient } from "@apollo/client";

// Assuming you have Apollo Client set up and a way to get the user's email
export const fetchUserData = async (email: string) => {
  const apolloClient = useApolloClient(); // Get your ApolloClient instance

  // First, get the user ID by email
  const { data: emailData } = await apolloClient.query({
    query: GET_USERS_BY_EMAIL,
    variables: { email },
  });

  if (
    !emailData ||
    !emailData.usersByEmail ||
    emailData.usersByEmail.length === 0
  ) {
    throw new Error("User not found");
  }

  const userId = emailData.usersByEmail[0].id;

  // Then, use the user ID to get detailed user data
  const { data: userData } = await apolloClient.query({
    query: GET_USERS_BY_ID,
    variables: { id: userId },
  });

  return userData.usersById;
};
