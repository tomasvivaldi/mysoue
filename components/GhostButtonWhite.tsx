// components/GhostButtonWhite.tsx
import React from "react";

type GhostButtonWhiteProps = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  href?: string; // Optional href prop for linking
  className?: string; // Additional classes passed from the parent
};

const GhostButtonWhite: React.FC<GhostButtonWhiteProps> = ({
  text,
  onClick,
  disabled = false,
  href,
  className,
}) => {
  const baseClasses =
    "font-nunito text-shadow inline-flex items-center justify-center text-sm ring-offset-background transition-colors disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-100/10 active:bg-gray-100/20 h-8 sm:h-10 bg-transparent text-white border-white border-2 rounded-full px-6 py-2 font-medium";
  
  if (href) {
    return (
      <a
        href={href}
        className={`${baseClasses} ${className ? className : ""}`}
      >
        {text}
      </a>
    );
  } else {
    return (
      <button
        className={`${baseClasses} ${className ? className : ""}`}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    );
  }
};

export default GhostButtonWhite;