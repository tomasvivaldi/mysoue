// components/GhostButtonBlack.tsx
import React from "react";

type GhostButtonBlackProps = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
};

const GhostButtonBlack: React.FC<GhostButtonBlackProps> = ({
  text,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className="inline-flex items-center justify-center md:text-lg ring-offset-background 
      transition-colors disabled:pointer-events-none disabled:opacity-50
       hover:bg-gray-100 active:bg-gray-200 h-10 bg-transparent text-black border-black border-2 b rounded-full px-6 py-2 font-medium"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default GhostButtonBlack;
