import { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = "primary", 
    size = "md", 
    className = "", 
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...rest 
  }, ref) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";
    
    const variants = {
      primary: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-sm hover:shadow-md",
      secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 shadow-sm hover:shadow-md",
      outline: "border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:ring-gray-500",
      ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
      destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm hover:shadow-md"
    };
    
    const sizes = {
      sm: "px-3 py-1.5 text-sm rounded-md",
      md: "px-4 py-2 text-sm rounded-lg",
      lg: "px-6 py-3 text-base rounded-lg",
      xl: "px-8 py-4 text-lg rounded-xl"
    };
    
    const isDisabled = disabled || loading;
    
    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={isDisabled}
        {...rest}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {!loading && leftIcon && leftIcon}
        {children}
        {!loading && rightIcon && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;