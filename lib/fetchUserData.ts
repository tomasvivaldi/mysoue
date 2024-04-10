// Updated fetchUserData.ts to directly accept an email

import { createApolloClient } from "./apolloClient";
import { gql } from "@apollo/client";
import { GET_USERS_BY_EMAIL, GET_USERS_BY_ID } from "@/graphql/queries";

async function fetchUserData(email: string) {
  const client = createApolloClient();
  let userDataById = null;

  try {
    const emailResponse = await client.query({
      query: gql`
        ${GET_USERS_BY_EMAIL}
      `,
      variables: { email },
    });

    const userId = emailResponse.data.usersByEmail?.[0]?.id;

    if (userId) {
      const idResponse = await client.query({
        query: gql`
          ${GET_USERS_BY_ID}
        `,
        variables: { id: userId },
      });
      userDataById = idResponse.data.userDataById; // Ensure this matches your actual GraphQL response structure
    }
  } catch (error) {
    console.error("Failed to fetch user data using email:", error);
  }

  return userDataById;
}

export default fetchUserData;
