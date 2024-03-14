import clsx from "clsx";
import { ButtonHTMLAttributes, InputHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

export const Button = ({
  children,
  className,
  type = "button",
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      type={type}
      className={clsx(
        className,
        "flex items-center border px-3 py-1.5 rounded bg-black text-white text-sm h-min whitespace-nowrap",
        "disabled:bg-gray-400 disabled:cursor-not-allowed"
      )}
    >
      {children}
    </button>
  );
};
