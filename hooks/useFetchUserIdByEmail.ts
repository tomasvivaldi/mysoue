import { useQuery } from "@apollo/client";
import { GET_USERS_BY_EMAIL } from "@/graphql/queries";

export function useFetchUserIdByEmail(email: string) {
  const { data, loading, error } = useQuery(GET_USERS_BY_EMAIL, {
    variables: { email },
    skip: !email, // Skip the query if no email is provided
  });

  return {
    userId: data?.usersByEmail?.id || null,
    loading,
    error,
  };
}
