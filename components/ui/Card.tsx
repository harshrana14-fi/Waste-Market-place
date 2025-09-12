import { ReactNode, forwardRef } from "react";

interface CardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "outlined" | "filled";
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
  onClick?: () => void;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    title, 
    subtitle, 
    children, 
    className = "", 
    variant = "default",
    padding = "md",
    hover = false,
    onClick,
    ...rest 
  }, ref) => {
    const baseStyles = "rounded-lg transition-all duration-200";
    
    const variants = {
      default: "bg-white border border-gray-200 shadow-sm",
      elevated: "bg-white shadow-lg border border-gray-100",
      outlined: "bg-white border-2 border-gray-200",
      filled: "bg-gray-50 border border-gray-200"
    };
    
    const paddings = {
      none: "",
      sm: "p-4",
      md: "p-6", 
      lg: "p-8"
    };
    
    const hoverStyles = hover ? "hover:shadow-md hover:scale-105 cursor-pointer" : "";
    const clickStyles = onClick ? "cursor-pointer" : "";
    
    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${clickStyles} ${className}`}
        onClick={onClick}
        {...rest}
      >
        {(title || subtitle) && (
          <div className="px-6 py-4 border-b border-gray-200">
            {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
          </div>
        )}
        <div className={paddings[padding]}>
          {children}
        </div>
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;