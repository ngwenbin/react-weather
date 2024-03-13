import clsx from "clsx";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  labelClassName?: string;
  containerClassName?: string;
  className?: string;
}

export const Input = ({
  id,
  label,
  labelClassName,
  containerClassName,
  className,
  ...props
}: InputProps) => {
  return (
    <div className={containerClassName}>
      {label && (
        <label htmlFor={id} className={clsx(labelClassName, "text-sm")}>
          {label}
        </label>
      )}
      <input
        {...props}
        id={id}
        className={clsx(className, "border px-3 py-1.5 rounded text-sm")}
      />
    </div>
  );
};
