// /app/api/auth/[...nextauth]/route.ts
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { queries } from "@/graphql/queries";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import Auth0Provider from "next-auth/providers/auth0";
import CredentialsProvider from "next-auth/providers/credentials";

const client = new ApolloClient({
  uri: "https://pertuis.stepzen.net/api/getting-started/__graphql",
  headers: {
    Authorization: `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`,
  },
  cache: new InMemoryCache(),
});

const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  session: { maxAge: 30 * 24 * 60 * 60, updateAge: 24 * 60 * 60 },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // FacebookProvider({ clientId: process.env.FACEBOOK_CLIENT_ID, clientSecret: process.env.FACEBOOK_CLIENT_SECRET }),
    // Auth0Provider({ clientId: process.env.AUTH0_CLIENT_ID, clientSecret: process.env.AUTH0_CLIENT_SECRET, issuer: process.env.AUTH0_ISSUER }),
    CredentialsProvider({
      name: "Sign In",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@email.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      //   authorize: async (credentials) => {
      //     console.log("Credentials:\n", credentials);
      //     const { data } = await client
      //       .query({
      //         query: queries.GET_USERS_BY_EMAIL,
      //         variables: { email: credentials?.email },
      //       })
      //       .catch((error) => {
      //         console.log("Error during query execution:", error);
      //         throw error;
      //       });

      //     if (data && data.usersByEmail) {
      //       console.log("User found in the database:", data.usersByEmail);

      //       // Verify password
      //       const isValid = await bcrypt.compare(
      //         credentials?.password!,
      //         data.usersByEmail.password
      //       );
      //       console.log("Password comparison result:", isValid);

      //       if (isValid) {
      //         console.log("Password is valid. User:", {
      //           id: data.usersByEmail.id,
      //         });
      //         return { id: data.usersByEmail.id, email: data.usersByEmail.email };
      //       } else {
      //         // If the password is invalid, return null to reject the credentials
      //         console.log("Invalid password.");
      //         return Promise.resolve(null);
      //       }
      //     } else {
      //       // If the user was not found, return null to reject the credentials
      //       console.log("User not found in the database.");
      //       return Promise.resolve(null);
      //     }
      //   },
      authorize: async (credentials) => {
        // Assuming credentials are not null or undefined.
        const email = credentials?.email ?? "";
        const password = credentials?.password ?? "";

        const { data } = await client.query({
          query: queries.GET_USERS_BY_EMAIL,
          variables: { email },
        });

        if (data && data.usersByEmail.length > 0) {
          const user = data.usersByEmail[0];
          const isValid = await bcrypt.compare(password, user.password_hash);

          if (isValid) {
            return { id: user.id.toString(), email: user.email };
          }
        }

        return null;
      },
    }),
  ],
  pages: { signIn: "/login", signOut: "/" },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
