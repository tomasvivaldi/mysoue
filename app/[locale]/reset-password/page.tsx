"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { LockIcon, CheckCircleIcon, AlertCircleIcon } from "lucide-react";
import SolidButton1 from "@/components/buttons/SolidButton1";
import LoadingBox from "@/components/LoadingBox";

type Status = "idle" | "success" | "error" | "validating";

export default function ResetPasswordPage() {
  const t = useTranslations("ResetPassword");
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<Status>("validating");
  const [errorMessage, setErrorMessage] = useState("");
  const [isTokenValid, setIsTokenValid] = useState(false);

  // Password restrictions state
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [hasMinLength, setHasMinLength] = useState(false);

  const isValidPassword =
    hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && hasMinLength;

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  useEffect(() => {
    const validateToken = async () => {
      if (!token || !email) {
        setStatus("error");
        setErrorMessage(t("invalidLink"));
        return;
      }

      try {
        const response = await fetch('/api/auth/validate-reset-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, email }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || t("invalidLink"));
        }

        setIsTokenValid(true);
        setStatus("idle");
      } catch (error) {
        setStatus("error");
        setErrorMessage(error instanceof Error ? error.message : t("invalidLink"));
        setIsTokenValid(false);
      }
    };

    validateToken();
  }, [token, email, t]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setHasUpperCase(/[A-Z]/.test(newPassword));
    setHasLowerCase(/[a-z]/.test(newPassword));
    setHasNumber(/[0-9]/.test(newPassword));
    setHasSpecialChar(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(newPassword));
    setHasMinLength(newPassword.length >= 8);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage(t("passwordsDontMatch"));
      setStatus("error");
      return;
    }

    if (!isValidPassword) {
      setErrorMessage(t("passwordRequirementsNotMet"));
      setStatus("error");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          email,
          newPassword: password
        }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || t("errorOccurred"));
      }
      
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : t("errorOccurred"));
      console.error("Error resetting password:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "validating") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <LoadingBox
          imageSrc="/Symbol/Logo-Mysoue-Symbol_2.png"
          imageAlt="Loading spinner"
          imageClassName=""
          containerClassName="h-[10vh]"
        />
      </div>
    );
  }

  if (!isTokenValid || status === "error") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg w-full max-w-md">
          <div className="px-6 py-4 border-b">
            <h2 className="text-2xl font-bold">{t("invalidLinkHeading")}</h2>
            <p className="mt-1 text-gray-600 text-sm">{t("invalidLinkDescription")}</p>
          </div>
          <div className="px-6 py-4 border-t flex justify-center">
            <a
              href="/forgot-password"
              className="text-[#C6B8A2] underline hover:text-[#C6B8A2] transition duration-150"
            >
              {t("requestNewLink")}
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg w-full max-w-md">
        {/* Card Header */}
        <div className="px-6 py-4 border-b">
          <h2 className="text-2xl font-bold">{t("resetYourPassword")}</h2>
          <p className="mt-1 text-gray-600 text-sm">{t("resetSubheading")}</p>
        </div>

        {/* Card Content */}
        <div className="px-6 py-4">
          {status === "success" ? (
            <div className="flex items-center gap-2 border border-green-200 bg-green-50 text-green-800 rounded p-2">
              <CheckCircleIcon className="h-4 w-4" />
              <span>{t("resetSuccessMessage")}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="flex items-center gap-2 border border-red-200 bg-red-50 text-red-800 rounded p-2">
                  <AlertCircleIcon className="h-4 w-4" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="space-y-2">
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    placeholder={t("newPasswordPlaceholder")}
                    value={password}
                    onChange={handlePasswordChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#C6B8A2]"
                    required
                  />
                  <LockIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                </div>
                {/* Password Restrictions Feedback */}
                <div className="text-left text-sm mt-2 space-y-1">
                  <p className={hasMinLength ? "text-green-500" : "text-gray-500"}>
                    {t("minLength")}
                  </p>
                  <p className={hasUpperCase ? "text-green-500" : "text-gray-500"}>
                    {t("upperCase")}
                  </p>
                  <p className={hasLowerCase ? "text-green-500" : "text-gray-500"}>
                    {t("lowerCase")}
                  </p>
                  <p className={hasNumber ? "text-green-500" : "text-gray-500"}>
                    {t("number")}
                  </p>
                  <p className={hasSpecialChar ? "text-green-500" : "text-gray-500"}>
                    {t("specialChar")}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <input
                    id="confirm-password"
                    type="password"
                    placeholder={t("confirmNewPasswordPlaceholder")}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#C6B8A2]"
                    required
                  />
                  <LockIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <SolidButton1
                type="submit"
                disabled={isSubmitting || !password || !confirmPassword}
                className="w-full bg-[#C6B8A2] text-white py-2 rounded flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    {t("resetting")}
                  </span>
                ) : (
                  t("resetPassword")
                )}
              </SolidButton1>
            </form>
          )}
        </div>

        {/* Card Footer */}
        {status === "success" && (
          <div className="px-6 py-4 border-t flex justify-center">
            <a
              href="/login"
              className="text-[#C6B8A2] underline hover:text-[#C6B8A2]/80 transition duration-150"
            >
              {t("goToLogin")}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}