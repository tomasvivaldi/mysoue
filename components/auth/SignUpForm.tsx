"use client";
// import { Button } from '@/button/Button';
// import { FormElement } from '@/form/FormElement';
// import { Label } from '@/form/Label';
// import { FullCenterSection } from '@/layout/FullCenterSection';
// import { useState } from 'react';

// interface SignUpFormProps {
//   handleSignUp: (username: string, email: string, password: string) => Promise<void>;
//   errorMessage: string | null;
// }

// const SignUpForm: React.FC<SignUpFormProps> = ({ handleSignUp, errorMessage })=> {
//   const [_password, setPassword] = useState("");
//   const [hasUpperCase, setHasUpperCase] = useState(false);
//   const [hasLowerCase, setHasLowerCase] = useState(false);
//   const [hasNumber, setHasNumber] = useState(false);
//   const [hasSpecialChar, setHasSpecialChar] = useState(false);
//   const [hasMinLength, setHasMinLength] = useState(false);
//   const [passwordFailed, setPasswordFailed] = useState(false); // New state

//   const isValidPassword = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && hasMinLength;

//   const handlePasswordChange = (event: { target: { value: any; }; }) => {
//     const newPassword = event.target.value;
//     setPassword(newPassword);
//     setHasUpperCase(/[A-Z]/.test(newPassword));
//     setHasLowerCase(/[a-z]/.test(newPassword));
//     setHasNumber(/[0-9]/.test(newPassword));
//     setHasSpecialChar(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(newPassword));
//     setHasMinLength(newPassword.length >= 8);
//     setPasswordFailed(false);  // Reset passwordFailed whenever the user types something
//   }

//   const handleSubmit = (event: { preventDefault: () => void; target: any; }) => {
//     event.preventDefault();
//     const target = event.target as typeof event.target & {
//       username: { value: string };
//       email: { value: string };
//       password: { value: string };
//     };

//     if (!isValidPassword) {
//       setPasswordFailed(true);
//       return;
//     }

//     handleSignUp(target.username.value, target.email.value, target.password.value);
//   }

//   return(
//   <FullCenterSection
//     title="Create your account"
//     description="Sign up with your email address and password."
//   >
//     {/* {errorMessage && <div className="text-red-500">{errorMessage}</div>} */}
//     <form className="grid gap-y-2" onSubmit={handleSubmit}>
//       <Label htmlFor="username">Username</Label>
//       <FormElement>
//         <input
//         id="username"
//         type="text"
//         required
//         className='dark:bg-slate-800'
//         />
//       </FormElement>
//       <Label htmlFor="email">Email</Label>
//       <FormElement>
//         <input
//         id="email"
//         type="email"
//         required
//         className={`dark:bg-slate-800 ${errorMessage ? ' ring-red-500 ring-2' : ''}`}
//         />
//       </FormElement>
//       {errorMessage && <p className="text-red-500">Email already in use</p>}

//       <Label htmlFor="password">Password</Label>
//       <FormElement>
//         <input
//           id="password"
//           type="password"
//           required
//           className={`dark:bg-slate-800 ${passwordFailed ? ' ring-red-500 ring-2' : ''}`}
//           onChange={handlePasswordChange}
//         />
//       </FormElement>

//       {passwordFailed && <p className="text-red-500">Password does not meet the requirements</p>}

//       <FormElement>
//   <div className="-mt-1 ml-1">
//     <div className={hasMinLength ? "text-green-500 text-sm" : "text-gray-500 text-sm"}>
//       {hasMinLength ? null : null}
//       Your password must be at least 8 characters.
//     </div>
//     <div className={hasUpperCase ? "text-green-500 text-sm" : "text-gray-500 text-sm"}>
//       {hasUpperCase ? null : null}
//       Your password must contain at least 1 upper case character.
//     </div>
//     <div className={hasLowerCase ? "text-green-500 text-sm" : "text-gray-500 text-sm"}>
//       {hasLowerCase ? null : null}
//       Your password must contain at least 1 lower case character.
//     </div>
//     <div className={hasNumber ? "text-green-500 text-sm" : "text-gray-500 text-sm"}>
//       {hasNumber ? null : null}
//       Your password must contain at least 1 number.
//     </div>
//     <div className={hasSpecialChar ? "text-green-500 text-sm" : "text-gray-500 text-sm"}>
//       {hasSpecialChar ? null : null}
//       Your password must contain at least 1 special character.
//     </div>
//   </div>
// </FormElement>

//       <div className="mt-3">
//         <button type="submit" className="w-full">
//           <Button full>Sign up</Button>
//         </button>
//       </div>
//     </form>

//     <div className="mt-5 text-center text-xs">
//       Already have an account?{' '}
//         <a href="/login" className="text-primary-500 hover:text-primary-600">
//           Log in now
//         </a>
//       .
//     </div>
//   </FullCenterSection>
// );
// };

// export { SignUpForm };

interface SignUpFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  handleSignUp: (e: React.FormEvent) => Promise<void>;
  loading: boolean;
}
import React from "react";
import Image from "next/image";
import { Button2 } from "../buttons/Button2";
import { Label } from "../form/Label";
import { FormElement } from "../form/FormElement";

const SignUpForm = ({
  email,
  setEmail,
  password,
  setPassword,
  handleSignUp,
  loading,
}: SignUpFormProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-primary-100 dark:bg-gray-900">
      <div className="w-full max-w-md text-center text-white">
        <div className="relative mt-5 rounded-2xl dark:border-2 dark:border-blue-200/20 dark:bg-slate-900/80 dark:shadow-slate-200/5 py-7 px-6">
          {/* Background image container */}
          <div className="absolute top-0 left-0 w-full h-full -z-10">
            <Image
              src="/auth-bg.png"
              layout="fill"
              objectFit="cover"
              quality={100}
              alt="Background"
              className="rounded-2xl"
            />
          </div>

          <span className="heading2">MYSOUE</span>

          <h1 className="text-xl font-semibold mt-4">Create Your Account</h1>
          <p className="mt-2">Sign up with your email address and password.</p>

          <form className="grid gap-y-2 mb-4" onSubmit={handleSignUp}>
            <Label htmlFor="email">Email Address</Label>
            <FormElement>
              <input
                id="email"
                type="email"
                required
                className="w-full bg-transparent ring-white ring-1 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormElement>

            <Label htmlFor="password">Password</Label>
            <FormElement>
              <input
                id="password"
                type="password"
                required
                className="w-full bg-transparent ring-white ring-1 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormElement>

            <div className="mt-3">
              <Button2 type="submit" full disabled={loading}>
                {loading ? "Processing..." : "Sign Up"}
              </Button2>
            </div>
          </form>
          <div className="flex flex-row justify-center items-center gap-2">
            <div className="w-full h-[1px] bg-slate-200 mt-1" />
            <p>or</p>
            <div className="w-full h-[1px] bg-slate-200 mt-1" />
          </div>
          <div className="mt-5 text-center text-xs">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-primary-500 font-semibold hover:text-primary-600 hover:underline"
            >
              Log In instead.
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
};

export { SignUpForm };
