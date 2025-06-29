import React from "react";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  onClick,
  className = "",
  icon,
  iconPosition = "left",
  fullWidth = false,
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-md 
    focus:outline-none focus:ring-2 focus:ring-offset-2 
    transition-all duration-300 cursor-pointer
    disabled:cursor-not-allowed disabled:opacity-50
  `;

  const variantClasses = {
    primary:
      "bg-primary-600 text-white border border-transparent hover:bg-primary-700 focus:ring-primary-500",
    secondary:
      "bg-gray-300 text-gray-700 border border-transparent hover:bg-gray-400 focus:ring-gray-500",
    outline:
      "bg-transparent text-primary-600 border border-primary-600 hover:bg-primary-50 focus:ring-primary-500",
    danger:
      "bg-red-600 text-white border border-transparent hover:bg-red-700 focus:ring-red-500",
    success:
      "bg-green-600 text-white border border-transparent hover:bg-green-700 focus:ring-green-500",
    ghost:
      "bg-transparent text-gray-600 border border-transparent hover:bg-gray-100 focus:ring-gray-500",
  };

  const sizeClasses = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg",
  };

  const widthClasses = fullWidth ? "w-full" : "";

  const buttonClasses = `
    ${baseClasses} 
    ${variantClasses[variant]}
    ${sizeClasses[size]} 
    ${widthClasses}
    ${className}
  `;

  const renderIcon = (position) => {
    if (!icon || iconPosition !== position) return null;

    const iconClasses = `
      ${loading ? "animate-spin" : ""} 
      ${children && iconPosition === "left" ? "mr-2" : ""} 
      ${children && iconPosition === "right" ? "ml-2" : ""}
    `;

    if (loading && iconPosition === position) {
      return (
        <svg
          className={`w-4 h-4 ${iconClasses}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      );
    }

    return <i className={`${icon} ${iconClasses}`}></i>;
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={buttonClasses}
      {...props}
    >
      {renderIcon("left")}
      {loading && !icon ? (
        <span className="flex items-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {children}
        </span>
      ) : (
        children
      )}
      {renderIcon("right")}
    </button>
  );
};

export default Button;
