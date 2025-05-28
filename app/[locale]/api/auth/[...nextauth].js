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
  uri: "https://kinkondongo.us-east-a.ibm.stepzen.net/api/getting-started/graphql",
  headers: {
    Authorization: `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`,
  },
  cache: new InMemoryCache(),
});

export const authOptions = {
  // Enable debug messages in the console
  debug: true, // Enable debug in both development and production

  // Session options
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "online",
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
      name: "Sign In",
      credentials: {
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
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter both email and password');
        }

        try {
          const { data } = await client.query({
            query: queries.GET_USER_BY_EMAIL,
            variables: { email: credentials.email },
          });

          if (!data?.usersByEmail) {
            throw new Error('No user found with this email');
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            data.usersByEmail.password
          );

          if (!isValid) {
            throw new Error('Invalid password');
          }

          return {
            id: data.usersByEmail.id,
            email: data.usersByEmail.email,
            name: data.usersByEmail.username,
          };
        } catch (error) {
          console.error('Authentication error:', error);
          throw new Error(error.message || 'Authentication failed');
        }
      },
    }),

    // ...add more providers here
  ],
  pages: {
    signIn: "/login",
    error: "/login",
    newUser: "/dashboard/my-wishlists",
  },

  callbacks: {
    async jwt({ token, user, account }) {
      console.log("[NextAuth] JWT Callback:", {
        token: token ? "exists" : "null",
        user: user ? "exists" : "null",
        account: account ? "exists" : "null",
        provider: account?.provider,
      });

      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
          },
        };
      }
      return token;
    },

    async session({ session, token }) {
      console.log("[NextAuth] Session Callback:", {
        sessionExists: !!session,
        tokenExists: !!token,
        userEmail: session?.user?.email,
      });

      if (token) {
        session.user = token.user;
        session.accessToken = token.accessToken;
        session.error = token.error;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      console.log("[NextAuth] Redirect Callback:", {
        url,
        baseUrl,
        isRelative: url.startsWith("/"),
        isSameOrigin: new URL(url).origin === baseUrl,
      });

      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },

    async signIn({ user, account, profile }) {
      console.log("[NextAuth] SignIn Callback:", {
        userEmail: user?.email,
        provider: account?.provider,
        profileExists: !!profile,
      });

      if (account?.provider === "google") {
        try {
          // Check if user exists in database
          const { data } = await client.query({
            query: queries.GET_USER_BY_EMAIL,
            variables: { email: user.email },
          });

          console.log("[NextAuth] Database Check:", {
            userExists: !!data?.usersByEmail,
            email: user.email,
          });

          if (!data?.usersByEmail) {
            // User doesn't exist, create new user
            const result = await client.mutate({
              mutation: queries.ADD_USER,
              variables: {
                email: user.email,
                username: user.name,
                oauth_provider: "google",
                password_hash: "",
                profile_picture_url: user.image,
                created_at: new Date().toISOString(),
              },
            });
            console.log("[NextAuth] New User Created:", {
              success: !!result,
              email: user.email,
            });
          }
          return true;
        } catch (error) {
          console.error("[NextAuth] Error during Google sign in:", error);
          return false;
        }
      }
      return true;
    },
  },
};

export default NextAuth(authOptions);
