"use client";
import type { ReactNode } from "react";

type ISocialButtonProps = {
  type?: "button" | "submit" | "reset";
  icon: ReactNode;
  children: ReactNode;
  onClick?: () => void; // Add onClick prop
};

const SocialButton = ({
  type = "button",
  icon,
  children,
  onClick,
}: ISocialButtonProps) => (
  <button
    type={type}
    className="font-nunito inline-flex items-center justify-center w-full rounded-full border-2 border-[#C6B8A2] bg-transparent py-2 px-5 text-[#C6B8A2] hover:border-primary-400 hover:bg-[#C6B8A2]/20 transition-colors duration-300"
    onClick={onClick} // Use the onClick prop
  >
    <div className="w-6 h-6">{icon}</div>
    <span className="ml-2 text-lg font-base font-nunito">{children}</span>
  </button>
);

export { SocialButton };
