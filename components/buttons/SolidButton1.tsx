import React from "react";

type SolidButton1Props = {
  text?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  href?: string; 
  className?: string; 
  type?: "button" | "submit" | "reset";
};

const SolidButton1: React.FC<SolidButton1Props> = ({
  text,
  children,
  onClick,
  disabled = false,
  href,
  className = "",
  type = "button",
}) => {
  const baseClasses =
    "whitespace-nowrap font-nunito inline-flex items-center justify-center text-lg transition-colors disabled:pointer-events-none disabled:opacity-50 hover:bg-white hover:text-[#C6B8A2] active:bg-[#9B8F7B] h-10 bg-[#C6B8A2] text-white border-2 border-[#C6B8A2] rounded-full px-6 py-2 font-medium";
  const buttonClasses = `${baseClasses} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={buttonClasses}>
        {children ? children : text}
      </a>
    );
  } else {
    return (
      <button className={buttonClasses} onClick={onClick} disabled={disabled} type={type}>
        {children ? children : text}
      </button>
    );
  }
};

export default SolidButton1;