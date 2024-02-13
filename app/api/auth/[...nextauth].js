import { ApolloClient, InMemoryCache } from "@apollo/client";
import { queries } from "graphql/queries";

import bcrypt from "bcrypt";

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import Auth0Provider from "next-auth/providers/auth0";
import CredentialsProvider from "next-auth/providers/credentials";

// Here you are creating the Apollo Client instance inside the NextAuth configuration
const client = new ApolloClient({
  uri: "https://pertuis.stepzen.net/api/getting-started/__graphql",
  headers: {
    Authorization: `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`,
  },
  cache: new InMemoryCache(),
});

export const authOptions = {
  // Enable debug messages in the console
  debug: true,

  // Session options
  session: {
    // Max age of the session. Controls how often the session updates in the database / in memory if a database is not being used.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // The time until the session cookie expires (in seconds). If not explicitly set, it defaults to the maxAge of the session.
    // The cookie expiration is reset every time the user signs in or accesses the site (if the session is still active).
    // If you want to use "rolling sessions", you can set this to a value lower than maxAge.
    updateAge: 24 * 60 * 60, // 24 hours
  },

  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          // scope: 'https://www.googleapis.com/auth/calendar',
          response_type: "code",
        },
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Sign In",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
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
      authorize: async (credentials) => {
        console.log("Credentials:\n", credentials);
        const { data } = await client
          .query({
            query: queries.GET_USER_BY_EMAIL,
            variables: { email: credentials?.email },
          })
          .catch((error) => {
            console.log("Error during query execution:", error);
            throw error;
          });

        if (data && data.usersByEmail) {
          console.log("User found in the database:", data.usersByEmail);

          // Verify password
          const isValid = await bcrypt.compare(
            credentials.password,
            data.usersByEmail.password
          );
          console.log("Password comparison result:", isValid);

          if (isValid) {
            console.log("Password is valid. User:", {
              id: data.usersByEmail.id,
            });
            return { id: data.usersByEmail.id, email: data.usersByEmail.email };
          } else {
            // If the password is invalid, return null to reject the credentials
            console.log("Invalid password.");
            return Promise.resolve(null);
          }
        } else {
          // If the user was not found, return null to reject the credentials
          console.log("User not found in the database.");
          return Promise.resolve(null);
        }
      },
    }),

    // ...add more providers here
  ],
  pages: {
    signIn: "/login", // Your custom login page
    signOut: false, // Use the default signOut page provided by NextAuth
    error: false, // Use the default error page provided by NextAuth
    verifyRequest: false, // Use the default verifyRequest page provided by NextAuth
    newUser: null, // Disable the newUser page (this will redirect new users to the callback URL)
  },

  // callbacks: {
  //   // This callback is called whenever a JWT is created or updated
  //   async jwt({ token, account }) {
  //     // If the account object exists and has an accessToken, save it in the token
  //     if (account?.accessToken) {
  //       token.accessToken = account.accessToken;
  //       token.refreshToken = account.refreshToken; // Save refreshToken if available
  //     }
  //     return token;
  //   },

  //   // This callback is called whenever a session is checked
  //   async session({ session, token }) {
  //     // Assign the accessToken from the token to the session object
  //     session.accessToken = token.accessToken;
  //     session.refreshToken = token.refreshToken; // Assign refreshToken if available
  //     return session;
  //   },
  // }
};

export default NextAuth(authOptions);
