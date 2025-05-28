// /app/api/auth/[...nextauth]/route.ts
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { queries } from "@/graphql/queries";
import { mutations } from "@/graphql/mutations";
import bcrypt from "bcrypt";
import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import Auth0Provider from "next-auth/providers/auth0";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

// Extend the built-in session types
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      name?: string | null;
    } & DefaultSession["user"];
    accessToken?: string;
    error?: string;
  }
}

const client = new ApolloClient({
  uri: "https://kinkondongo.us-east-a.ibm.stepzen.net/api/getting-started/graphql",
  headers: {
    Authorization: `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`,
  },
  cache: new InMemoryCache(),
});

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "online",
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
            query: queries.GET_USERS_BY_EMAIL,
            variables: { email: credentials.email },
          });

          if (!data?.usersByEmail?.length) {
            throw new Error('No user found with this email');
          }

          const user = data.usersByEmail[0];
          const isValid = await bcrypt.compare(credentials.password, user.password_hash);

          if (!isValid) {
            throw new Error('Invalid password');
          }

          return {
            id: user.id.toString(),
            email: user.email,
            name: user.username,
          };
        } catch (error: unknown) {
          console.error('Authentication error:', error);
          if (error instanceof Error) {
            throw new Error(error.message || 'Authentication failed');
          }
          throw new Error('Authentication failed');
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
    error: "/login",
    newUser: "/dashboard/my-wishlists",
  },

  callbacks: {
    async jwt({ token, user, account }: { token: JWT; user: any; account: any }) {
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

    async session({ session, token }: { session: any; token: JWT }) {
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

    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      console.log("[NextAuth] Redirect Callback:", {
        url,
        baseUrl,
        isRelative: url.startsWith("/"),
        isSameOrigin: new URL(url).origin === baseUrl,
      });

      // Always allow relative URLs
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      // Allow URLs from the same origin
      else if (new URL(url).origin === baseUrl) {
        return url;
      }
      // Default to baseUrl
      return baseUrl;
    },

    async signIn({ user, account, profile }: { 
      user: any; 
      account: any; 
      profile?: any;
    }) {
      console.log("[NextAuth] SignIn Callback:", {
        userEmail: user?.email,
        provider: account?.provider,
        profileExists: !!profile,
      });

      if (account?.provider === "google") {
        try {
          // Check if user exists in database
          const { data } = await client.query({
            query: queries.GET_USERS_BY_EMAIL,
            variables: { email: user.email },
          });

          console.log("[NextAuth] Database Check:", {
            userExists: !!data?.usersByEmail?.length,
            email: user.email,
          });

          if (!data?.usersByEmail?.length) {
            // User doesn't exist, create new user
            const result = await client.mutate({
              mutation: mutations.ADD_USERS,
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
