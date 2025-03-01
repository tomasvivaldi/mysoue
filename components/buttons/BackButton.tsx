"use client";
import React from "react";
import { useRouter } from "next/navigation";

const BackButton: React.FC = () => {
  const router = useRouter();

  return (
    <button
      className="inline-block text-sm font-medium leading-none text-black hover:underline cursor-pointer"
      onClick={() => router.back()}
      role="button"
      aria-label="Go back"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-2 h-4 w-4 inline"
      >
        <path d="m12 19-7-7 7-7"></path>
        <path d="M19 12H5"></path>
      </svg>
      Back
    </button>
  );
};

export default BackButton;
