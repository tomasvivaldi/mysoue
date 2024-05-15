"use client";
// import { Button } from '@/button/Button';
// import { FormElement } from '@/form/FormElement';
// import { Label } from '@/form/Label';
// import { FullCenterSection } from '@/layout/FullCenterSection';
import { useState } from "react";

interface SignUpFormProps {
  email: string;
  setEmail: (email: string) => void;
  username: string;
  setUsername: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  handleSignUp: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  loading: boolean;
  errorMessage: string | null;
}
import React from "react";
import Image from "next/image";
import { Button2 } from "../buttons/Button2";
import { Label } from "../form/Label";
import { FormElement } from "../form/FormElement";
import { useTranslations } from "next-intl";

const SignUpForm = ({
  email,
  setEmail,
  username,
  setUsername,
  password,
  setPassword,
  handleSignUp,
  loading,
  errorMessage,
}: SignUpFormProps) => {
  const t = useTranslations("SignUpForm");

  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [hasMinLength, setHasMinLength] = useState(false);
  const [passwordFailed, setPasswordFailed] = useState(false); // New state

  const isValidPassword =
    hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && hasMinLength;

  const handlePasswordChange = (event: { target: { value: any } }) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setHasUpperCase(/[A-Z]/.test(newPassword));
    setHasLowerCase(/[a-z]/.test(newPassword));
    setHasNumber(/[0-9]/.test(newPassword));
    setHasSpecialChar(
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(newPassword)
    );
    setHasMinLength(newPassword.length >= 8);
    setPasswordFailed(false); // Reset passwordFailed whenever the user types something
  };

  const handleSubmit = (event: { preventDefault: () => void; target: any }) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      username: { value: string };
      email: { value: string };
      password: { value: string };
    };

    if (!isValidPassword) {
      setPasswordFailed(true);
      return;
    }

    handleSignUp(
      target.username.value,
      target.email.value,
      target.password.value
    );
  };

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
              alt={t("backgroundAlt")}
              className="rounded-2xl"
            />
          </div>

          <span className="heading2">MYSOUE</span>

          <h1 className="text-xl font-semibold mt-4">{t("heading")}</h1>
          <p className="mt-2">{t("subheading")}</p>

          <form className="grid gap-y-2 mb-4" onSubmit={handleSubmit}>
            <Label htmlFor="email">{t("emailLabel")}</Label>
            <FormElement>
              <input
                id="email"
                type="email"
                required
                className={`w-full bg-transparent ring-white ring-1 rounded-md p-2 ${
                  errorMessage ? " ring-red-500 ring-2" : ""
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormElement>

            <Label htmlFor="username">{t("usernameLabel")}</Label>
            <FormElement>
              <input
                id="username"
                type="username"
                required
                className={`w-full bg-transparent ring-white ring-1 rounded-md p-2 
                  
                  `}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormElement>

            <Label htmlFor="password">{t("passwordLabel")}</Label>
            <FormElement>
              <input
                id="password"
                type="password"
                required
                className={`w-full bg-transparent ring-white ring-1 rounded-md p-2 mb-3 ${
                  passwordFailed ? " ring-red-500 ring-2" : ""
                }`}
                value={password}
                onChange={handlePasswordChange}
              />
              <div className="-mt-1 ml-1 font-semibold">
                <div
                  className={
                    hasMinLength
                      ? "text-green-400 text-sm "
                      : "text-gray-100 text-sm"
                  }
                >
                  {hasMinLength ? null : null}
                  {t("minLength")}
                </div>
                <div
                  className={
                    hasUpperCase
                      ? "text-green-400 text-sm"
                      : "text-gray-100 text-sm"
                  }
                >
                  {hasUpperCase ? null : null}
                  {t("upperCase")}
                </div>
                <div
                  className={
                    hasLowerCase
                      ? "text-green-400 text-sm"
                      : "text-gray-100 text-sm"
                  }
                >
                  {hasLowerCase ? null : null}
                  {t("lowerCase")}
                </div>
                <div
                  className={
                    hasNumber
                      ? "text-green-400 text-sm"
                      : "text-gray-100 text-sm"
                  }
                >
                  {hasNumber ? null : null}
                  {t("number")}
                </div>
                <div
                  className={
                    hasSpecialChar
                      ? "text-green-400 text-sm"
                      : "text-gray-100 text-sm"
                  }
                >
                  {hasSpecialChar ? null : null}
                  {t("specialChar")}
                </div>
              </div>
            </FormElement>

            <div className="mt-3">
              <Button2 type="submit" full disabled={loading}>
                {loading ? t("processing") : t("signUp")}
              </Button2>
            </div>
          </form>
          <div className="flex flex-row justify-center items-center gap-2">
            <div className="w-full h-[1px] bg-slate-200 mt-1" />
            <p>or</p>
            <div className="w-full h-[1px] bg-slate-200 mt-1" />
          </div>
          <div className="mt-5 text-center text-xs">
            {t("footerText")}{" "}
            <a
              href="/login"
              className="text-primary-500 font-semibold hover:text-primary-600 hover:underline"
            >
              {t("logInLinkText")}
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
};

export { SignUpForm };
