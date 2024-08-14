"use client";
import { useSession, signIn } from "next-auth/react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USERS_BY_EMAIL } from "@/graphql/queries";

import { LoginForm } from "@/components/auth/LoginForm";
import Head from "next/head";

import { User } from "next-auth";
import { useEffect, useState } from "react";
// import LoadingBox from "@/template/LoadingBox";
import { ADD_USERS } from "@/graphql/mutations";
import { useRouter } from "next/navigation";
import LoadingBox from "@/components/LoadingBox";

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

  const { data: userData, loading: userDataLoading } = useQuery(
    GET_USERS_BY_EMAIL,
    {
      variables: { email: user?.email },
      skip: !user?.email,
    }
  );

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
                // Include `profile_picture_url` and `updated_at` if your backend expects them
              },
            });
            console.log("User added:", data);
            router.push("/dashboard/my-wishlists");
          } catch (error) {
            console.error("Error adding user:", error);
          }
        };
        //   // try {
        //   //   const response = await fetch('https://app.80kview.com/api/sendgrid/welcomeEmail', {
        //   //     method: 'POST',
        //   //     headers: {
        //   //       'Content-Type': 'application/json'
        //   //     },
        //   //     body: JSON.stringify({
        //   //       email: `${email}`,
        //   //       username: `${user?.name}`
        //   //     })
        //   //   });

        //   //   if (!response.ok) {
        //   //     throw new Error('Network response was not ok ' + response.statusText);
        //   //   }
        //   // } catch (error) {
        //   //   console.error('There was a problem with the fetch operation:', error);
        //   // }
        // };
        createUser();
        // router.push("/dashboard/my-wishlists");
      }
    }
  }, [session, user, addUsers, userData, userDataLoading, router]);

  const handleLogin = async (provider: string) => {
    await signIn(provider, {});
  };

  // define state
  const [loginFailed, setLoginFailed] = useState(false);

  const handleEmailLogin = async (
    email: string,
    password: string
  ): Promise<void> => {
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
    setLoading(true); // Start loading
    try {
      await handleEmailLogin(email, password); // Your existing login logic
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  console.log("login failed?", loginFailed);

  // use userDataLoading to handle loading state
  if (userDataLoading)
    return (
      // <div>Loading...</div>
      <LoadingBox
        imageSrc="/Symbol/Logo-Mysoue-Symbol_2.png" // Path to your loading image
        imageAlt="Loading spinner"
        imageClassName="" // Optional: Add any Tailwind classes for styling
        containerClassName="h-screen" // Optional: Center the loading box in the full screen height
      />
    );

  ///// // use userData to show some user information, assuming `GET_USERS_BY_EMAIL` query returns user's data directly
  ///// if (userData) return

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
          // Include `profile_picture_url` and `updated_at` if your backend expects them
        },
      });
      console.log("User added:", data);
      // router.push("/dashboard");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="text-gray-900 dark:text-[#FFF8E9] antialiased max-w-[90%] mx-auto">
        <LoginForm
          handleLogin={handleLogin}
          handleEmailLogin={modifiedHandleEmailLogin}
          loginFailed={loginFailed}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
    </>
  );
};

export default Login;
