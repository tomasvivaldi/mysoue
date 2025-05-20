"use client";
import { useSession, signIn } from "next-auth/react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USERS_BY_EMAIL } from "@/graphql/queries";
import { LoginForm } from "@/components/aline_design/auth/LoginForm";
import Head from "next/head";
import { User } from "next-auth";
import { useEffect, useState } from "react";
import { ADD_USERS } from "@/graphql/mutations";
import { useRouter } from "next/navigation";
import LoadingBox from "@/components/LoadingBox";
import Image from "next/image";

interface UserWithProvider extends User {
  provider?: string;
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

  const { data: session } = useSession();
  const user = session?.user as UserWithProvider;
  const [addUsers] = useMutation(ADD_USERS);
  console.log("session", session);
  console.log("session?.user?.email", user?.email);

  const { data: userData, loading: userDataLoading } = useQuery(GET_USERS_BY_EMAIL, {
    variables: { email: user?.email },
    skip: !user?.email,
  });

  useEffect(() => {
    console.log("Effect triggered", {
      session,
      userDataLoading,
      "User Email": user?.email,
    });
    if (session && !userDataLoading) {
      console.log("if session && !userDataLoading triggered");
      // If userData exists, redirect to the homepage
      if (userData?.usersByEmail && userData.usersByEmail.length > 0) {
        console.log("User data found, redirecting...", userData.usersByEmail);
        window.location.href = "/dashboard/my-wishlists";
        return;
      } else {
        console.log("No user data found, creating user...");
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
            console.error("Error adding user:", error);
          }
        };
        createUser();
      }
    }
  }, [session, user, addUsers, userData, userDataLoading, router]);

  const handleLogin = async (provider: string) => {
    await signIn(provider, {});
  };

  const [loginFailed, setLoginFailed] = useState(false);

  const handleEmailLogin = async (email: string, password: string): Promise<void> => {
    setLoginFailed(false);
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (response?.error) {
      setLoginFailed(true);
    }
  };

  const modifiedHandleEmailLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      await handleEmailLogin(email, password);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log("login failed?", loginFailed);

  if (userDataLoading)
    return (
      <LoadingBox
        imageSrc="/Symbol/Logo-Mysoue-Symbol_2.png"
        imageAlt="Loading spinner"
        imageClassName=""
        containerClassName="h-screen"
      />
    );

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
            <LoginForm
              handleLogin={handleLogin}
              handleEmailLogin={modifiedHandleEmailLogin}
              loginFailed={loginFailed}
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