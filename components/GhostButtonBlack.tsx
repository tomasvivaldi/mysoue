// components/GhostButtonBlack.tsx
import React from "react";

type GhostButtonBlackProps = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  href?: string; // Optional href prop for linking
};

const GhostButtonBlack: React.FC<GhostButtonBlackProps> = ({
  text,
  onClick,
  disabled = false,
  href,
}) => {
  // Conditionally render as a link or button based on href
  if (href) {
    return (
      <a
        href={href}
        className="font-nunito inline-flex items-center justify-center md:text-lg ring-offset-background 
        transition-colors disabled:pointer-events-none disabled:opacity-50
        hover:bg-white/80 active:bg-stone-100 h-10 bg-transparent text-black border-black border-2 rounded-full px-6 py-2 font-medium"
      >
        {text}
      </a>
    );
  } else {
    return (
      <button
        className="font-nunito inline-flex items-center justify-center md:text-lg ring-offset-background 
        transition-colors disabled:pointer-events-none disabled:opacity-50
        hover:bg-white/80 active:bg-stone-100 h-10 bg-transparent text-black border-black border-2 rounded-full px-6 py-2 font-medium"
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    );
  }
};

export default GhostButtonBlack;
