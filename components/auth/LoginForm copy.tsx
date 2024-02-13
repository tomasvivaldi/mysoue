// "use client";
// // import toast, { Toaster } from "react-hot-toast";
// // import { Github, Mail } from "lucide-react";
// // import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// import { SocialButton } from "../buttons/SocialButton";
// import { Button2 } from "../buttons/Button2";
// import { Label } from "../form/Label";
// import { FormElement } from "../form/FormElement";
// import Image from "next/image";

// // import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// // import { supabase } from "@/lib/supabase";
// // import { isValidEmail } from "@/lib/utils";
// // import { useNavigation } from "@/hooks/useNavigation";

// const LoginForm = () => {
//   // const router = useRouter(); // Assuming this returns { router } correctly
//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//   });
//   // const [loading, setLoading] = useState(false);
//   // const [error, setError] = useState(undefined);

//   const handleChange = (e: { target: { name: any; value: any } }) => {
//     const { name, value } = e.target;
//     setLoginData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // const login = async (e: { preventDefault: () => void }) => {
//   //   e.preventDefault(); // Prevent the form from causing a page reload
//   //   setLoading(true);
//   //   setError(undefined);

//   //   const { email, password } = loginData; // Use updated state values
//   //   try {
//   //     const { data, error } = await supabase.auth.signInWithPassword({
//   //       email,
//   //       password,
//   //     });

//   //     if (error) {
//   //       console.log("Insert failed:", error);
//   //     } else {
//   //       console.log("Insert successful:", data);
//   //       // Redirect user or perform additional actions
//   //       router.push("/dashboard");
//   //     }
//   //   } catch (error) {
//   //     console.error("Unexpected error during signUp:", error);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // const handleGoogleSignIn = async () => {
//   //   if (loading) return; // Prevent multiple clicks
//   //   setLoading(true);
//   //   try {
//   //     const { error } = await supabase.auth.signInWithOAuth({
//   //       provider: "google",
//   //     });

//   //     if (error) throw error;

//   //     toast.success("Google sign-in successful");
//   //     router.push("/dashboard");
//   //   } catch (error) {
//   //     console.error("Error signing in with Google:", error);
//   //     // setError(error.message);
//   //     toast.error("Google sign-in failed");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // useEffect(() => {
//   //   // Check if there's a current session or user
//   //   const checkSession = async () => {
//   //     const { data: sessionData, error: sessionError } =
//   //       await supabase.auth.getSession();

//   //     if (sessionError) {
//   //       console.error("Error getting session:", sessionError);
//   //       return;
//   //     }

//   //     if (sessionData.session) {
//   //       router.push("/dashboard");
//   //     } else {
//   //       const { data: userData, error: userError } =
//   //         await supabase.auth.getUser();
//   //       if (userError) {
//   //         console.error("Error getting user:", userError);
//   //         return;
//   //       }

//   //       if (userData.user) {
//   //         router.push("/dashboard");
//   //       }
//   //     }
//   //   };

//   //   checkSession();
//   // }, [router]);

//   return (
//     <div className=" flex min-h-screen items-center justify-center bg-primary-100 dark:bg-gray-900">
//       <div className=" w-full max-w-md text-center text-white">
//         <div className="relative mt-5 rounded-2xl dark:border-2 dark:border-blue-200/20 dark:bg-slate-900/80 dark:shadow-slate-200/5 py-7 px-6">
//           {/* Image container */}
//           <div className="absolute top-0 left-0 w-full h-full -z-10 ">
//             <Image
//               src="/auth-bg.png"
//               layout="fill"
//               objectFit="cover"
//               quality={100}
//               alt="Background"
//               className="rounded-2xl"
//             />
//           </div>

//           <span className="heading2">MYSOUE</span>

//           <h1 className="text-xl font-semibold mt-4">
//             Sign in to your account
//           </h1>

//           <div className="mt-1">
//             <div className="text-left">
//               <form className="grid gap-y-2 mb-4">
//                 <Label htmlFor="email">Email</Label>
//                 <FormElement>
//                   <input
//                     id="email"
//                     type="text"
//                     name="email"
//                     required
//                     className="w-full bg-transparent ring-white ring-1 rounded-md"
//                     onChange={handleChange}
//                   />
//                 </FormElement>

//                 <Label htmlFor="password">Password</Label>
//                 <FormElement>
//                   <input
//                     id="password"
//                     type="password"
//                     name="password"
//                     required
//                     className="w-full bg-transparent ring-white ring-1 rounded-md"
//                     onChange={handleChange}
//                   />
//                 </FormElement>

//                 {/* {loginFailed && (
//           <p className="text-red-500">Invalid email or password</p>
//         )} */}

//                 <div className="mt-3">
//                   <Button2
//                     type="submit"
//                     full
//                     // onClick={login}
//                   >
//                     Log in
//                   </Button2>
//                 </div>
//               </form>
//               <div className="flex flex-row justify-center items-center gap-2">
//                 <div className="w-full h-[1px] bg-slate-200 mt-1" />
//                 <p>or</p>
//                 <div className="w-full h-[1px] bg-slate-200 mt-1" />
//               </div>
//               <div className="mt-5 space-y-4">
//                 <SocialButton
//                   type="submit"
//                   icon={
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
//                       <defs>
//                         <path
//                           id="a"
//                           d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
//                         />
//                       </defs>
//                       <clipPath id="b">
//                         <use xlinkHref="#a" overflow="visible" />
//                       </clipPath>
//                       <path
//                         clipPath="url(#b)"
//                         fill="#FBBC05"
//                         d="M0 37V11l17 13z"
//                       />
//                       <path
//                         clipPath="url(#b)"
//                         fill="#EA4335"
//                         d="M0 11l17 13 7-6.1L48 14V0H0z"
//                       />
//                       <path
//                         clipPath="url(#b)"
//                         fill="#34A853"
//                         d="M0 37l30-23 7.9 1L48 0v48H0z"
//                       />
//                       <path
//                         clipPath="url(#b)"
//                         fill="#4285F4"
//                         d="M48 48L17 24l-4-3 35-10z"
//                       />
//                     </svg>
//                   }
//                   // onClick={handleGoogleSignIn}
//                 >
//                   Sign in with Google
//                 </SocialButton>
//                 {/* <button className="w-full" type="button" onClick={() => handleLogin('facebook')}>
// <SocialButton
//   icon={
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14222 14222">
//       <circle cx="7111" cy="7112" r="7111" fill="#1977f3" />
//       <path
//         d="M9879 9168l315-2056H8222V5778c0-562 275-1111 1159-1111h897V2917s-814-139-1592-139c-1624 0-2686 984-2686 2767v1567H4194v2056h1806v4969c362 57 733 86 1111 86s749-30 1111-86V9168z"
//         fill="#fff"
//       />
//     </svg>
//   }
// >
//   Sign in with Facebook
// </SocialButton>
// </button>
// <button className="w-full" type="button" onClick={() => handleLogin('auth0')}>
// <SocialButton
//   icon={
//     <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Auth0</title><path d="M21.98 7.448L19.62 0H4.347L2.02 7.448c-1.352 4.312.03 9.206 3.815 12.015L12.007 24l6.157-4.552c3.755-2.81 5.182-7.688 3.815-12.015l-6.16 4.58 2.343 7.45-6.157-4.597-6.158 4.58 2.358-7.433-6.188-4.55 7.63-.045L12.008 0l2.356 7.404 7.615.044z"/></svg>
//   }
// >
//   Sign in with Auth0
// </SocialButton>
// </button> */}
//                 <div className="mt-5 text-center text-xs">
//                   Don't have an account?{" "}
//                   <a
//                     href="/signup"
//                     className="text-primary-500 font-semibold hover:text-primary-600 hover:underline"
//                   >
//                     Sign up now
//                   </a>
//                   .
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export { LoginForm };
