"use client";
import className from "classnames";

type IButton2Props = {
  type?: "button" | "submit" | "reset";
  xs?: boolean;
  sm?: boolean;
  xl?: boolean;
  secondary?: boolean;
  full?: boolean;
  children: React.ReactNode; // Changed to React.ReactNode to allow any valid JSX.
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button2 = ({ type = "button", onClick, ...props }: IButton2Props) => {
  const btnClass = className(
    "font-nunito inline-block rounded-full text-center border transition-colors duration-300 hover:border-primary-400 hover:bg-[#fbf9f4]/10", // Added transition classes for smooth color changes.
    {
      "text-lg font-semibold py-2 px-4": !props.xl,
      "font-extrabold text-xl py-4 px-6": props.xl,
      "text-sm py-2 px-2": props.xs,
      "text-base font-medium py-2 px-3": props.sm,
      // Adjusted for transparent bg with white text, hover effect for feedback
      "text-white bg-transparent border-white ":
        !props.secondary && !props.disabled,
      // Adjusted for light transparent bg with white text, hover effect for feedback
      "bg-[#fbf9f4]/10 text-white border-gray-200 dark:border-white ":
        props.secondary && !props.disabled,
      "w-full": props.full,
      "bg-gray-300/50 text-gray-500 cursor-not-allowed": props.disabled, // Adjusted for disabled state with semi-transparent bg
    }
  );

  return (
    <button
      type={type}
      className={btnClass}
      disabled={props.disabled}
      onClick={onClick}
    >
      {props.children}
    </button>
  ); // Changed to button tag to support disabled attribute
};

export { Button2 };
