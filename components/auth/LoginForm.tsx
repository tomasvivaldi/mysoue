"use client";
import { useEffect, useState } from "react";
import { SocialButton } from "../buttons/SocialButton";
import { Button2 } from "../buttons/Button2";
import { Label } from "../form/Label";
import { FormElement } from "../form/FormElement";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface LoginFormProps {
  handleLogin: (provider: string) => Promise<void>;
  handleEmailLogin: (email: string, password: string) => void;
  loginFailed: boolean;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}
const LoginForm: React.FC<LoginFormProps> = ({
  handleLogin,
  handleEmailLogin,
  loginFailed,
  loading,
  setLoading,
}) => {
  const t = useTranslations("LoginForm");

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary-100 dark:bg-gray-900">
      <div className="w-full max-w-md text-center text-white">
        <div className="relative mt-5 rounded-2xl dark:border-2 dark:border-blue-200/20 dark:bg-slate-900/80 dark:shadow-slate-200/5 py-7 px-6">
          {/* Image container */}
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
          <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-10">
            <Image
              src="/effect.jpg"
              layout="fill"
              objectFit="cover"
              quality={100}
              alt="Background"
              className="rounded-2xl"
            />
          </div>

          {/* Using Simple Michael font for the heading */}
          <span className="heading2 font-simple-michael text-4xl">MYSOUE</span>

          {/* Using Nunito font for text */}
          <h1 className="text-xl font-semibold mt-4 font-nunito">
            {t("signInHeading")}
          </h1>

          <div className="mt-1 font-nunito">
            <div className="text-left">
              <form
                className="grid gap-y-2 mb-4"
                onSubmit={async (event) => {
                  event.preventDefault();
                  const target = event.target as typeof event.target & {
                    email: { value: string };
                    password: { value: string };
                  };
                  await handleEmailLogin(
                    target.email.value,
                    target.password.value
                  );
                }}
              >
                <Label htmlFor="email">{t("emailLabel")}</Label>
                <FormElement>
                  <input
                    id="email"
                    type="text"
                    name="email"
                    required
                    className="w-full bg-transparent ring-white ring-1 rounded-md p-2"
                  />
                </FormElement>

                <Label htmlFor="password">{t("passwordLabel")}</Label>
                <FormElement>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    required
                    className="w-full bg-transparent ring-white ring-1 rounded-md p-2"
                  />
                </FormElement>

                {loginFailed && (
                  <p className="text-red-500 text-shadow font-semibold">
                    {t("loginFailedMessage")}
                  </p>
                )}

                <div className="mt-3">
                  <Button2 type="submit" full disabled={loading}>
                    {loading ? t("processing") : t("logIn")}
                  </Button2>
                </div>
              </form>
              <div className="flex flex-row justify-center items-center gap-2">
                <div className="w-full h-[1px] bg-slate-200 mt-1" />
                <p>{t("or")}</p>
                <div className="w-full h-[1px] bg-slate-200 mt-1" />
              </div>
              <div className="mt-5 space-y-4">
                <SocialButton
                  type="submit"
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                      <defs>
                        <path
                          id="a"
                          d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                        />
                      </defs>
                      <clipPath id="b">
                        <use xlinkHref="#a" overflow="visible" />
                      </clipPath>
                      <path
                        clipPath="url(#b)"
                        fill="#FBBC05"
                        d="M0 37V11l17 13z"
                      />
                      <path
                        clipPath="url(#b)"
                        fill="#EA4335"
                        d="M0 11l17 13 7-6.1L48 14V0H0z"
                      />
                      <path
                        clipPath="url(#b)"
                        fill="#34A853"
                        d="M0 37l30-23 7.9 1L48 0v48H0z"
                      />
                      <path
                        clipPath="url(#b)"
                        fill="#4285F4"
                        d="M48 48L17 24l-4-3 35-10z"
                      />
                    </svg>
                  }
                  onClick={() => handleLogin("google")}
                >
                  {t("signInWithGoogle")}
                </SocialButton>

                <div className="font-nunito mt-5 text-center text-xs">
                  {t("noAccount")}{" "}
                  <a
                    href="/signup"
                    className="text-primary-500 font-semibold hover:text-primary-600 hover:underline"
                  >
                    {t("signUpNow")}
                  </a>
                  .
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { LoginForm };
