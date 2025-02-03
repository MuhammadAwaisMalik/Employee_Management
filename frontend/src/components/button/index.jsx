import React from "react";

const Button = ({
  type = "button",
  variant = "primary",
  className = "",
  children,
  onClick,
  isLoading = false,
  disabled = false,
  ...props
}) => {
  const baseStyles =
    "w-full py-2.5 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors cursor-pointer";

  const variants = {
    primary: "bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-500",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    outline:
      "border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 focus:ring-gray-400",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
