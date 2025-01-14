import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";

// export function createApolloClient() {
//   return new ApolloClient({
//     link: new HttpLink({
//       uri: "https://kinkondongo.us-east-a.ibm.stepzen.net/api/getting-started/graphql",
//     }),
//     cache: new InMemoryCache(),
//   });
// }

import { setContext } from "@apollo/client/link/context";

const httpLink = new HttpLink({
  uri: "https://kinkondongo.us-east-a.ibm.stepzen.net/api/getting-started/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = process.env.NEXT_PUBLIC_STEPZEN_API_KEY;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Apikey ${token}` : "",
    },
  };
});

export function createApolloClient() {
  return new ApolloClient({
    link: from([authLink, httpLink]),
    cache: new InMemoryCache(),
  });
}
