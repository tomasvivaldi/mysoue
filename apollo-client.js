import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://kinkondongo.us-east-a.ibm.stepzen.net/api/getting-started/graphql",
  headers: {
    Authorization: `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`,
  },
  cache: new InMemoryCache(),
});

export default client;
