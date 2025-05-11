import React from "react";

export const Button = ({
  children,
  className = "",
  size = "md",
  variant = "primary",
  fullWidth = false,
  disabled = false,
  type = "button",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-semibold rounded-lg transition focus:outline-none";
  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };
  const variantClasses = {
    primary: `bg-blue-500 text-white hover:bg-blue-600 ${
      disabled && "bg-blue-300 cursor-not-allowed"
    }`,
    secondary: `bg-gray-300 text-gray-700 hover:bg-gray-400 ${
      disabled && "bg-gray-200 text-gray-400 cursor-not-allowed"
    }`,
    ghost: `bg-transparent text-blue-500 hover:bg-blue-100 ${
      disabled && "text-blue-300 cursor-not-allowed"
    }`,
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
