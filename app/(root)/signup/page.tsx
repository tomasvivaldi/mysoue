"use client";
import { useState } from "react";
// import { useRouter } from "next/navigation"; // Assuming this is correct for your project setup
import { SignUpForm } from "@/components/auth/SignUpForm";
import Head from "next/head";
// import { supabase } from "@/lib/supabase";
// import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const router = useRouter(); // Ensure this is the correct way you're using useRouter in your project

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // const signUp = async (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  //   if (loading) return; // Prevent multiple submissions
  //   setLoading(true);
  //   const loadingToast = toast.loading("Signing up...");

  //   try {
  //     const { data, error: signUpError } = await supabase.auth.signUp({
  //       email,
  //       password,
  //     });

  //     if (signUpError) {
  //       setError(signUpError.message);
  //       toast.error(signUpError.message, { id: loadingToast });
  //     } else {
  //       toast.success("Signed up successfully!", { id: loadingToast });
  //       // Redirect user or perform additional actions
  //       router.push("/dashboard"); // Adjust according to your routing setup
  //     }
  //   } catch (error) {
  //     console.error("Unexpected error during signUp:", error);
  //     setError("An unexpected error occurred.");
  //     toast.error("An unexpected error occurred.", { id: loadingToast });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
          password={password}
          setPassword={setPassword}
          // handleSignUp={signUp}
          loading={loading} // Pass loading state to disable the form's submit button
        />
      </div>
    </div>
  );
};

export default SignUp;
