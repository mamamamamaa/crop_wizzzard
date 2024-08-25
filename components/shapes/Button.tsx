import { FC, PropsWithChildren } from "react";

import { cn } from "@/helpers";

interface ButtonProps extends PropsWithChildren {
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Button: FC<ButtonProps> = ({
  active,
  onClick,
  children,
  className,
}) => {
  return (
    <button
      className={cn(
        "bg-transparent relative hover:bg-gray-700 text-gray-300",
        {
          "bg-blue-400 hover:bg-blue-500 text-gray-800": active,
        },
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
