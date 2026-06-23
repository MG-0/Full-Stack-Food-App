import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col space-y-1">
        {label && (
          <label htmlFor={id} className="text-sm font-semibold text-gray-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={`w-full px-4 py-2 border rounded-lg text-sm bg-white text-gray-900 placeholder-gray-400 transition duration-200 outline-none
            ${error ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"}
            ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
