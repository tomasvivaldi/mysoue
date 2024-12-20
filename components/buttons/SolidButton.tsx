// components/SolidButton.tsx
import React from "react";

type SolidButtonProps = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  href?: string; // Optional href prop for linking
  className?: string; // Optional className prop for additional styling
};

const SolidButton: React.FC<SolidButtonProps> = ({
  text,
  onClick,
  disabled = false,
  href,
  className = "", // Default is an empty string
}) => {
  const baseClasses =
    "font-nunito inline-flex items-center justify-center text-sm ring-offset-background transition-colors disabled:pointer-events-none disabled:opacity-50 h-10 rounded-full px-6 py-2 font-medium ";

  const buttonClasses = `${baseClasses} ${className}`.trim();

  // Render as a link or a button based on the presence of href
  if (href) {
    return (
      <a href={href} className={buttonClasses}>
        {text}
      </a>
    );
  } else {
    return (
      <button className={buttonClasses} onClick={onClick} disabled={disabled}>
        {text}
      </button>
    );
  }
};

export default SolidButton;