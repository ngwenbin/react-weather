import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "secondary";
}

// Controlled button
export const Button = ({
  children,
  className,
  type = "button",
  variant = "default",
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      type={type}
      className={clsx(
        className,
        variant === "default" && "rounded bg-black text-white border",
        "flex items-center  px-3 py-1.5  text-sm h-min whitespace-nowrap",
        "disabled:bg-gray-400 disabled:cursor-not-allowed"
      )}
    >
      {children}
    </button>
  );
};
