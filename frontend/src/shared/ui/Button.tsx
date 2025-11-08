import type React from "react";
import { cn } from "../lib/utils";

interface Props {
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  type: "submit" | "button";
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button = ({
  children,
  type,
  className,
  disabled = false,
  loading = false,
  onClick,
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        `border-2 border-blue-400 text-black text-center bg-transparent rounded-[15px] px-6 py-2 font-medium transition-all duration-300 drop-shadow-2xl flex items-center justify-center gap-2 ${
          disabled
            ? ""
            : "hover:bg-blue-600 hover:text-white hover:rounded-[55px]"
        }`,
        className,
        disabled || (loading && "cursor-not-allowed opacity-600")
      )}
      disabled={disabled || loading}
    >
      {loading ? <span className="animate-pulse">Yükleniyor..</span> : children}
    </button>
  );
};

export default Button;
