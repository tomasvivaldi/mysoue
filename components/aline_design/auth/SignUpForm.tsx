"use client";
import { useState } from "react";
import { Button2 } from "../../buttons/Button2";
import { useTranslations } from "next-intl";
import Button3 from "../Button3";

  interface SignUpFormProps {
    email: string;
    setEmail: (email: string) => void;
    // username: string;
    // setUsername: (username: string) => void;
    password: string;
    setPassword: (password: string) => void;
    firstName: string;
    setFirstName: (firstName: string) => void;
    lastName: string;
    setLastName: (lastName: string) => void;
    dateOfBirth: string;
    setDateOfBirth: (dateOfBirth: string) => void;
    gender: string;
    setGender: (gender: string) => void;
    handleSignUp: (
      email: string,
      password: string,
      firstName: string,
      lastName: string,
      dateOfBirth: string,
      gender: string
    ) => Promise<void>;
    loading: boolean;
    errorMessage: string | null;
  }
  
  const SignUpForm = ({
    email,
    setEmail,
    // username,
    // setUsername,
    password,
    setPassword,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    dateOfBirth,
    setDateOfBirth,
    gender,
    setGender,
    handleSignUp,
    loading,
    errorMessage,
  }: SignUpFormProps) => {
  const t = useTranslations("SignUpForm");

  // Password validation states
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [hasMinLength, setHasMinLength] = useState(false);
  const [passwordFailed, setPasswordFailed] = useState(false);

  const isValidPassword =
    hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && hasMinLength;

  // Handle password validation
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setHasUpperCase(/[A-Z]/.test(newPassword));
    setHasLowerCase(/[a-z]/.test(newPassword));
    setHasNumber(/[0-9]/.test(newPassword));
    setHasSpecialChar(
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(newPassword)
    );
    setHasMinLength(newPassword.length >= 8);
    setPasswordFailed(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidPassword) {
      setPasswordFailed(true);
      return;
    }
    handleSignUp( email, password, firstName, lastName, dateOfBirth, gender);
  };

  return (
    <div className="flex min-h-screen pt-20 items-center justify-center">
      <div className="w-full  text-center">
        <h1 className="text-3xl font-bold mb-8">SIGN UP</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
  {/* First Name and Last Name */}
  <div className="flex gap-4">
    <input
      type="text"
      placeholder="First Name"
      className="w-1/2 border rounded-full px-4 py-2 border-black bg-[#FFF9E8] placeholder:text-[#C6B8A2]"
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
      required
    />
    <input
      type="text"
      placeholder="Last Name"
      className="w-1/2 border rounded-full px-4 py-2 border-black bg-[#FFF9E8] placeholder:text-[#C6B8A2]"
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
      required
    />
  </div>

  {/* Date of Birth and Gender */}
  <div className="flex gap-4">
    <input
      type="date"
      className="w-1/2 border rounded-full px-4 py-2 border-black bg-[#FFF9E8] placeholder:text-[#C6B8A2]"
      value={dateOfBirth}
      onChange={(e) => setDateOfBirth(e.target.value)}
      required
    />
    <select
      className="w-1/2 border rounded-full px-4 py-2 border-black bg-[#FFF9E8] placeholder:text-[#C6B8A2]"
      value={gender}
      onChange={(e) => setGender(e.target.value)}
      required
    >
      <option value="" disabled>
        Gender
      </option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </select>
  </div>

  {/* Email */}
  <input
    type="email"
    placeholder="Email"
    className={`w-full border rounded-full px-4 py-2 border-black bg-[#FFF9E8] placeholder:text-[#C6B8A2] ${
      errorMessage ? "border-red-500" : ""
    }`}
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />

  {/* Password */}
  <input
    type="password"
    placeholder="Password"
    className={`w-full border rounded-full px-4 py-2 border-black bg-[#FFF9E8] placeholder:text-[#C6B8A2] 
    ${
      !isValidPassword ? "" : "border-green-500"
    }
    ${
      errorMessage ? "border-red-500" : ""
    }`}
    value={password}
    onChange={handlePasswordChange}
    required
  />

          {/* Password Validation Feedback */}
          <div className="text-left text-sm mt-2">
            <p
              className={`${
                password.length >= 8 ? "text-green-500" : "text-gray-500"
              }`}
            >
              {t("minLength")}
            </p>
            <p
              className={`${
                /[A-Z]/.test(password) ? "text-green-500" : "text-gray-500"
              }`}
            >
              {t("upperCase")}
            </p>
            <p
              className={`${
                /[a-z]/.test(password) ? "text-green-500" : "text-gray-500"
              }`}
            >
              {t("lowerCase")}
            </p>
            <p
              className={`${
                /[0-9]/.test(password) ? "text-green-500" : "text-gray-500"
              }`}
            >
              {t("number")}
            </p>
            <p
              className={`${
                /[!@#$%^&*()_+\-=$begin:math:display$$end:math:display${};':"\\|,.<>\/?]+/.test(password)
                  ? "text-green-500"
                  : "text-gray-500"
              }`}
            >
              {t("specialChar")}
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          {/* Submit Button */}
          <Button3 type="submit" disabled={loading}>
            {loading ? t("processing") : "REGISTER"}
          </Button3>
        </form>

        {/* Sign In Link */}
        <p className="mt-3 text-sm">
          ALREADY HAVE AN ACCOUNT?{" "}
          <a
            href="/login"
            className="text-[#D6CBBE] font-semibold hover:underline"
          >
            SIGN IN
          </a>
        </p>
      </div>
    </div>
  );
};

export { SignUpForm };