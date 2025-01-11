"use client";
import { SocialButton } from "../../buttons/SocialButton";
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
}) => {
  const t = useTranslations("LoginForm");

  return (
    <div className="text-center">
      {/* Login Header */}
      <h1 className="text-3xl font-bold mb-8">LOGIN</h1>

      {/* Login Form */}
      <form
        className="space-y-4"
        onSubmit={async (event) => {
          event.preventDefault();
          const target = event.target as typeof event.target & {
            email: { value: string };
            password: { value: string };
          };
          await handleEmailLogin(target.email.value, target.password.value);
        }}
      >
        {/* Email Input */}
        <input
          id="email"
          type="email"
          name="email"
          required
          placeholder="email"
          className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none"
        />

        {/* Password Input */}
        <input
          id="password"
          type="password"
          name="password"
          required
          placeholder="password"
          className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none"
        />

        {/* Error Message */}
        {loginFailed && (
          <p className="text-red-500 text-sm mt-2">
            {t("loginFailedMessage")}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-full bg-[#D6CBBE] text-white py-2 font-bold hover:bg-[#c5b5a4] transition"
          disabled={loading}
        >
          {loading ? t("processing") : t("logIn")}
        </button>
      </form>

      {/* Forgot Password and Signup Links */}
      <div className="mt-6 text-sm text-[#C6B8A2]">
        <a href="/forgot-password" className="block mb-2 hover:underline">
          FORGOT YOUR PASSWORD?
        </a>
        <a href="/signup" className="font-semibold hover:underline">
          DON’T HAVE AN ACCOUNT? SIGN UP!
        </a>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-2 my-6">
        <div className="flex-grow h-[1px] bg-gray-300"></div>
        <p className="text-sm">{t("or")}</p>
        <div className="flex-grow h-[1px] bg-gray-300"></div>
      </div>

      {/* Google Login */}
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
    </div>
  );
};

export { LoginForm };