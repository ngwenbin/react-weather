import clsx from "clsx";
import { ButtonHTMLAttributes, InputHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export const Button = ({
  id,
  children,
  className,
  type = "button",
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      id={id}
      type={type}
      className={clsx(
        className,
        "border px-3 py-1.5 rounded bg-black text-white text-sm h-min whitespace-nowrap"
      )}
    >
      {children}
    </button>
  );
};
