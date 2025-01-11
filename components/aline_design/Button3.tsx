"use client";

import React from "react";

type Button3Props = {
  type?: "button" | "submit" | "reset";
  size?: "xs" | "sm" | "base" | "xl"; // Size options
  variant?: "primary" | "secondary" | "disabled"; // Button3 styles
  fullWidth?: boolean; // If true, the button3 spans the full width
  children: React.ReactNode; // Button3 content
  onClick?: React.MouseEventHandler<HTMLButtonElement>; // Click handler
  disabled?: boolean; // Disabled state
};

const Button3 = ({
  type = "button",
  size = "base",
  variant = "primary",
  fullWidth = false,
  children,
  onClick,
  disabled = false,
}: Button3Props) => {
  // Base styles for the button3
  let baseStyles =
    "inline-block rounded-full text-center transition-colors duration-300 border font-nunito  ";

  // Size-specific styles
  let sizeStyles = "";
  switch (size) {
    case "xs":
      sizeStyles = "text-sm py-2 px-2";
      break;
    case "sm":
      sizeStyles = "text-base py-2 px-3";
      break;
    case "base":
      sizeStyles = "text-lg font-semibold py-2 px-4";
      break;
    case "xl":
      sizeStyles = "font-extrabold text-xl py-4 px-6";
      break;
  }

  // Variant-specific styles
  let variantStyles = "";
  if (disabled) {
    variantStyles = "bg-gray-300/50 text-gray-500 cursor-not-allowed";
  } else {
    switch (variant) {
      case "primary":
        variantStyles =
          "bg-transparent hover:shadow-lg border border-[#C6B8A2] text-[#C6B8A2] hover:border-primary-400 hover:bg-[#fbf9f4]/10";
        break;
      case "secondary":
        variantStyles =
          "bg-[#fbf9f4]/10 border border-[#C6B8A2] text-[#C6B8A2] dark:border-white hover:bg-gray-100 ";
        break;
    }
  }

  // Full-width style
  const fullWidthStyles = fullWidth ? "w-full" : "";

  // Combine all styles
  const button3ClassName = `${baseStyles} ${sizeStyles} ${variantStyles} ${fullWidthStyles}`;

  return (
    <button
      type={type}
      className={button3ClassName}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button3;