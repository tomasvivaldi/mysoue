// components/GhostButtonWhite.tsx
import React from "react";

type GhostButtonWhiteProps = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
};

const GhostButtonWhite: React.FC<GhostButtonWhiteProps> = ({
  text,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className="inline-flex items-center justify-center text-sm ring-offset-background 
      transition-colors disabled:pointer-events-none disabled:opacity-50
       hover:bg-gray-100/10 active:bg-gray-100/20 h-10 bg-transparent text-white border-white border-2 b rounded-full px-6 py-2 font-medium"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default GhostButtonWhite;
