// components/SolidButtonBlack.tsx
import React from "react";

type SolidButtonBlackProps = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
};

const SolidButtonBlack: React.FC<SolidButtonBlackProps> = ({
  text,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className="font-nunito inline-flex items-center justify-center text-lg 
      transition-colors disabled:pointer-events-none disabled:opacity-50
      hover:bg-gray-700 active:bg-gray-800 h-10 bg-black text-white border-2 border-black rounded-full px-6 py-2 font-medium"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default SolidButtonBlack;
