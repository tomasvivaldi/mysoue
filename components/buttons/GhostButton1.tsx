// components/GhostButton1.tsx
import React from "react";

type GhostButton1Props = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  href?: string; // Optional href prop for linking
  target?: string; // Optional target prop for links
};

const GhostButton1: React.FC<GhostButton1Props> = ({
  text,
  onClick,
  disabled = false,
  href,
  target,
}) => {
  // Conditionally render as a link or button based on href
  if (href) {
    return (
      <a
        href={href}
        target={target}
        className="whitespace-nowrap font-nunito inline-flex items-center justify-center md:text-lg ring-offset-background 
        transition-colors disabled:pointer-events-none disabled:opacity-50
        hover:bg-[#FFF8E9] active:bg-stone-100 h-10 bg-transparent text-[#C6B8A2] border-[#C6B8A2] border-2 rounded-full px-6 py-2 font-medium"
      >
        {text}
      </a>
    );
  } else {
    return (
      <button
        className="whitespace-nowrap font-nunito inline-flex items-center justify-center md:text-lg ring-offset-background 
        transition-colors disabled:pointer-events-none disabled:opacity-50
        hover:bg-[#FFF8E9] active:bg-stone-100 h-10 bg-transparent text-[#C6B8A2] border-[#C6B8A2] border-2 rounded-full px-6 py-2 font-medium"
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    );
  }
};

export default GhostButton1;