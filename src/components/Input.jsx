import React from "react";

const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  required = false,
  disabled = false,
  error,
  touched,
  maxLength,
  minLength,
  min,
  max,
  step,
  accept,
  multiple = false,
  rows,
  className = "",
  inputClassName = "",
  labelClassName = "",
  errorClassName = "",
  showCharCount = false,
  icon,
  iconPosition = "left",
  ...props
}) => {
  const baseInputClasses = `
    w-full px-3 py-2 border rounded-md shadow-sm 
    focus:outline-none focus:ring-2 transition-colors
    disabled:cursor-not-allowed disabled:bg-gray-100
  `;

  const errorClasses =
    error && touched
      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
      : "border-gray-300 focus:ring-primary-500 focus:border-primary-500";

  const inputClasses = `${baseInputClasses} ${errorClasses} ${inputClassName}`;

  const renderInput = () => {
    const inputProps = {
      type,
      name,
      value,
      onChange,
      onFocus,
      onBlur,
      placeholder,
      required,
      disabled,
      maxLength,
      minLength,
      min,
      max,
      step,
      accept,
      multiple,
      className: icon
        ? (iconPosition === "left" ? "pl-10" : "pr-10") + ` ${inputClasses}`
        : inputClasses,
      ...props,
    };

    if (type === "textarea") {
      return <textarea {...inputProps} rows={rows || 4} type={undefined} />;
    }

    return <input {...inputProps} />;
  };

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className={`block text-sm font-medium text-gray-700 mb-2 ${labelClassName}`}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && iconPosition === "left" && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className={`${icon} text-gray-400`}></i>
          </div>
        )}

        {renderInput()}

        {icon && iconPosition === "right" && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <i className={`${icon} text-gray-400`}></i>
          </div>
        )}
      </div>

      {error && touched && (
        <p className={`text-sm mt-1 text-red-600 ${errorClassName}`}>{error}</p>
      )}

      {showCharCount && maxLength && (
        <p className="text-sm mt-1 text-gray-500">
          {value?.length || 0}/{maxLength} characters
        </p>
      )}
    </div>
  );
};

export default Input;
