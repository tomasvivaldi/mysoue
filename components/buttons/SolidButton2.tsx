// components/SolidButton2.tsx
import React from "react";

type SolidButton2Props = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
};

const SolidButton2: React.FC<SolidButton2Props> = ({
  text,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className="whitespace-nowrap font-nunito inline-flex items-center justify-center text-lg transition-colors disabled:pointer-events-none disabled:opacity-50 hover:bg-[#B13B3F] active:bg-[#932125] h-10 bg-[#A5282C] text-white border-2 border-[#A5282C] rounded-full px-6 py-2 font-medium"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default SolidButton2;