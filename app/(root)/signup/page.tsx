"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SignUpForm } from "@/components/auth/SignUpForm";
import Head from "next/head";
// import toast, { Toaster } from "react-hot-toast";

import bcrypt from "bcryptjs";
import { signIn } from "next-auth/react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_USERS } from "@/graphql/mutations";
import { GET_USERS_BY_EMAIL } from "@/graphql/queries";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const router = useRouter();

  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");

  const router = useRouter();
  const [addUsers] = useMutation(ADD_USERS);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { data: userData, loading: userDataLoading } = useQuery(
    GET_USERS_BY_EMAIL,
    {
      variables: { email: userEmail },
      skip: !userEmail,
    }
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // This useEffect will be executed whenever errorMessage state changes
  useEffect(() => {
    console.log("Error message:", errorMessage);
  }, [errorMessage]);

  useEffect(() => {
    if (!userDataLoading && userData?.user) {
      window.location.href = "/dashboard/my-wishlists";
    }
    if (errorMessage) {
      console.log("Error message:", errorMessage);
    }
  }, [userDataLoading, userData, router, errorMessage]);

  const handleSignUp = async (
    username: string,
    email: string,
    password: string
  ) => {
    if (loading) return;
    setLoading(true);
    setErrorMessage(null);

    // Ensure we have the latest user data before proceeding
    // await refetchUserByEmail(email);

    const recorded_at = new Date().toISOString();
    const provider = "local";
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    // const isActive = true

    // set the email for useQuery
    setUserEmail(email);

    // Wait for the user data to be fetched
    await new Promise((resolve) => {
      const intervalId = setInterval(() => {
        if (!userDataLoading) {
          clearInterval(intervalId);
          resolve(null);
        }
      }, 100);
    });
    //     /////////Sent email through Sendgrip example code
    //     //     try {
    //     //       const response = await fetch(
    //     //         "https://app.80kview.com/api/sendgrid/welcomeEmail",
    //     //         {
    //     //           method: "POST",
    //     //           headers: {
    //     //             "Content-Type": "application/json",
    //     //           },
    //     //           body: JSON.stringify({
    //     //             email: `${email}`,
    //     //             username: `${username}`,
    //     //           }),
    //     //         }
    //     //       );

    //     //       if (!response.ok) {
    //     //         throw new Error("Network response was not ok " + response.statusText);
    //     //       }
    //     //     } catch (error) {
    //     //       console.error("There was a problem with the fetch operation:", error);
    //     //     }
    //     //   }
    //   }
    // };

    // Check if user data exists and attempt to log them in
    if (userData?.usersByEmail?.length > 0) {
      console.log(
        "User already exists, attempting to log in:",
        userData?.usersByEmail
      );
      try {
        const signInResult = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
        if (signInResult?.error) {
          // Handle cases where login fails (e.g., wrong password)
          setErrorMessage(signInResult.error);
        } else {
          // Redirect to dashboard upon successful login
          router.push("/dashboard/my-wishlists");
        }
      } catch (error) {
        console.error("Error during user login:", error);
        setErrorMessage("Failed to log in. Please try again.");
      } finally {
        setLoading(false);
      }
      return;
    }

    // User does not exist, proceed with sign up
    try {
      const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      const result = await addUsers({
        variables: {
          created_at: new Date().toISOString(),
          email: email,
          oauth_provider: "local",
          password_hash: hashedPassword,
          username: username,
          profile_picture_url: "", // Consider providing a default or allowing users to add this later
        },
      });
      console.log("User added:", result);

      // Attempt to sign in after successful sign up
      await signIn("credentials", { email, password, redirect: false });
      router.push("/dashboard/my-wishlists");
    } catch (error) {
      console.error("Error during user sign-up:", error);
      setErrorMessage("There was an error during sign up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative text-gray-900 dark:text-slate-200 antialiased">
      {/* <Toaster position="top-center" /> */}
      <Head>
        <title>Sign Up</title>
      </Head>
      <div className="my-12">
        <SignUpForm
          email={email}
          setEmail={setEmail}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleSignUp={handleSignUp}
          loading={loading}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
};

export default SignUp;
