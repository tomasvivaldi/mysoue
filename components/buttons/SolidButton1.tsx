// components/SolidButton1.tsx
import React from "react";

type SolidButton1Props = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
};

const SolidButton1: React.FC<SolidButton1Props> = ({
  text,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className="whitespace-nowrap font-nunito inline-flex items-center justify-center text-lg transition-colors disabled:pointer-events-none disabled:opacity-50 hover:bg-[#B0A28E] active:bg-[#9B8F7B] h-10 bg-[#C6B8A2] text-white border-2 border-[#C6B8A2] rounded-full px-6 py-2 font-medium"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default SolidButton1;