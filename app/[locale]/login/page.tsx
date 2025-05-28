"use client";
import { useSession, signIn } from "next-auth/react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USERS_BY_EMAIL } from "@/graphql/queries";
import { LoginForm } from "@/components/aline_design/auth/LoginForm";
import Head from "next/head";
import { User, Session } from "next-auth";
import { useEffect, useState } from "react";
import { ADD_USERS } from "@/graphql/mutations";
import { useRouter } from "next/navigation";
import LoadingBox from "@/components/LoadingBox";
import Image from "next/image";

interface UserWithProvider extends User {
  provider?: string;
}

interface ExtendedSession extends Session {
  error?: string;
}

type UserData = {
  id: number;
  username: string;
  email: string;
  password: string;
  provider: string;
  created_at: string;
};

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: session, status } = useSession();
  const user = session?.user as UserWithProvider;
  const extendedSession = session as ExtendedSession;
  const [addUsers] = useMutation(ADD_USERS);
  console.log("session", session);
  console.log("session?.user?.email", user?.email);

  const { data: userData, loading: userDataLoading } = useQuery(GET_USERS_BY_EMAIL, {
    variables: { email: user?.email },
    skip: !user?.email,
  });

  useEffect(() => {
    // Handle session status
    if (status === "authenticated" && extendedSession?.error) {
      setError(extendedSession.error);
      return;
    }

    const handleUserFlow = async () => {
      if (!session || userDataLoading) return;

      try {
        // If userData exists, redirect to the homepage
        if (userData?.usersByEmail && userData.usersByEmail.length > 0) {
          console.log("User data found, redirecting...", userData.usersByEmail);
          router.push("/dashboard/my-wishlists");
          return;
        }

        // No user data found, create user
        console.log("No user data found, creating user...");
        const { data } = await addUsers({
          variables: {
            created_at: new Date().toISOString(),
            email: user?.email,
            oauth_provider: user?.provider || "google",
            password_hash: "",
            username: user?.name,
            profile_picture_url: user?.image,
          },
        });
        console.log("User added:", data);

        // Send welcome email
        await fetch('/api/sendEmail', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            emailType: 'welcome',
            to: user?.email,
            name: user?.name,
          }),
        });

        router.push("/dashboard/my-wishlists");
      } catch (error) {
        console.error("Error in user flow:", error);
        setError("Failed to create user account. Please try again.");
        setLoading(false);
      }
    };

    handleUserFlow();
  }, [session, status, user, addUsers, userData, userDataLoading, router]);

  const handleLogin = async (provider: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await signIn(provider, {
        redirect: false,
      });
      
      if (result?.error) {
        setError(result.error);
        setLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login. Please try again.");
      setLoading(false);
    }
  };

  const handleEmailLogin = async (email: string, password: string): Promise<void> => {
    setError(null);
    setLoading(true);
    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      
      if (response?.error) {
        setError(response.error);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading || userDataLoading || status === "loading") {
    return (
      <LoadingBox
        imageSrc="/Symbol/Logo-Mysoue-Symbol_2.png"
        imageAlt="Loading spinner"
        imageClassName=""
        containerClassName="h-screen"
      />
    );
  }

  // In case you need to call createUser separately later:
  const createUser = async () => {
    console.log("createUser triggered:");
    try {
      console.log("try triggered:");
      const { data } = await addUsers({
        variables: {
          created_at: new Date().toISOString(),
          email: user?.email,
          oauth_provider: user?.provider || "google",
          password_hash: "",
          username: user?.name,
          profile_picture_url: user?.image,
        },
      });
      console.log("User added:", data);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex flex-col md:flex-row h-screen">
        {/* Left Section: Only visible on medium screens and up */}
        <div className="hidden md:block md:w-1/2 relative">
          <Image 
            src="/Login/bg1.jpg" 
            alt="Login Image" 
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Section: Login form */}
        <div className="my-auto sm:my-0 w-full md:w-1/2 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            {error && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}
            <LoginForm
              handleLogin={handleLogin}
              handleEmailLogin={handleEmailLogin}
              loginFailed={!!error}
              loading={loading}
              setLoading={setLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;