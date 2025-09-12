import { InputHTMLAttributes, forwardRef, useState } from "react";
import { Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: "default" | "filled" | "outlined";
  size?: "sm" | "md" | "lg";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    error, 
    success,
    helperText,
    leftIcon,
    rightIcon,
    variant = "default",
    size = "md",
    className = "", 
    type = "text",
    ...rest 
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;
    
    const baseStyles = "w-full transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
      default: `border border-gray-300 bg-white focus:border-green-500 focus:ring-1 focus:ring-green-500 ${
        error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
      } ${success ? 'border-green-500 focus:border-green-500 focus:ring-green-500' : ''}`,
      filled: `border-0 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-green-500 ${
        error ? 'bg-red-50 focus:bg-white focus:ring-red-500' : ''
      } ${success ? 'bg-green-50 focus:bg-white focus:ring-green-500' : ''}`,
      outlined: `border-2 border-gray-300 bg-transparent focus:border-green-500 ${
        error ? 'border-red-500 focus:border-red-500' : ''
      } ${success ? 'border-green-500 focus:border-green-500' : ''}`
    };
    
    const sizes = {
      sm: "px-3 py-1.5 text-sm rounded-md",
      md: "px-4 py-2 text-sm rounded-lg",
      lg: "px-4 py-3 text-base rounded-lg"
    };
    
    const iconSizes = {
      sm: "w-4 h-4",
      md: "w-5 h-5", 
      lg: "w-5 h-5"
    };
    
    const paddingLeft = leftIcon ? (size === "sm" ? "pl-10" : size === "md" ? "pl-11" : "pl-12") : "";
    const paddingRight = (rightIcon || isPassword) ? (size === "sm" ? "pr-10" : size === "md" ? "pr-11" : "pr-12") : "";
    
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div className={`text-gray-400 ${iconSizes[size]}`}>
                {leftIcon}
              </div>
            </div>
          )}
          
          <input
            ref={ref}
            type={inputType}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${paddingLeft} ${paddingRight} ${className}`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...rest}
          />
          
          {(rightIcon || isPassword) && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {isPassword ? (
                <button
                  type="button"
                  className={`text-gray-400 hover:text-gray-600 ${iconSizes[size]}`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              ) : (
                <div className={`text-gray-400 ${iconSizes[size]}`}>
                  {rightIcon}
                </div>
              )}
            </div>
          )}
          
          {(error || success) && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {error ? (
                <AlertCircle className={`text-red-500 ${iconSizes[size]}`} />
              ) : success ? (
                <CheckCircle className={`text-green-500 ${iconSizes[size]}`} />
              ) : null}
            </div>
          )}
        </div>
        
        {(error || success || helperText) && (
          <div className="mt-2">
            {error && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {error}
              </p>
            )}
            {success && (
              <p className="text-sm text-green-600 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                {success}
              </p>
            )}
            {helperText && !error && !success && (
              <p className="text-sm text-gray-500">{helperText}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;