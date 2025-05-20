"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SignUpForm } from "@/components/aline_design/auth/SignUpForm";
import Head from "next/head";
import bcrypt from "bcryptjs";
import { signIn } from "next-auth/react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_USERS } from "@/graphql/mutations";
import { GET_USERS_BY_EMAIL } from "@/graphql/queries";
import Image from "next/image";

const SignUp = () => {
  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const [addUsers] = useMutation(ADD_USERS);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { data: userData, loading: userDataLoading } = useQuery(GET_USERS_BY_EMAIL, {
    variables: { email: userEmail },
    skip: !userEmail,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    birthdate: string,
    gender: string
  ) => {
    if (loading) return;
    setLoading(true);
    setErrorMessage(null);

    // Set the email for useQuery
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

    // Check if user data exists and attempt to log them in
    if (userData?.usersByEmail?.length > 0) {
      console.log("User already exists, attempting to log in:", userData?.usersByEmail);
      try {
        const signInResult = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
        if (signInResult?.error) {
          setErrorMessage(signInResult.error);
        } else {
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
          first_name: firstName,
          last_name: lastName,
          birthdate: birthdate,
          gender: gender,
          profile_picture_url: "", // Optionally add a default profile picture
        },
      });
      console.log("User added:", result);

      // Send welcome email
      await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emailType: 'welcome',
          to: email,
          name: `${firstName} ${lastName}`,
        }),
      });
      console.log("email sent (maybe)")

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
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <div className="flex flex-col md:flex-row min-h-screen">
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

        {/* Right Section: SignUp form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <SignUpForm
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              birthdate={birthdate}
              setBirthdate={setBirthdate}
              gender={gender}
              setGender={setGender}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleSignUp={handleSignUp}
              loading={loading}
              errorMessage={errorMessage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;