import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "whatsapp";
  size?: "sm" | "md" | "lg" | "xl";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary: "bg-gradient-to-r from-brand-turquoise to-brand-cyan text-white shadow-lg shadow-brand-turquoise/20 hover:scale-105 active:scale-95 transition-all duration-300",
      secondary: "bg-brand-gold text-brand-navy shadow-lg shadow-brand-gold/20 hover:scale-105 active:scale-95 transition-all duration-300",
      outline: "border-2 border-brand-turquoise text-brand-turquoise bg-transparent hover:bg-brand-turquoise/10 transition-all duration-300",
      ghost: "text-brand-navy hover:bg-brand-turquoise/10 transition-all duration-300",
      whatsapp: "bg-[#25D366] text-white shadow-lg shadow-[#25D366]/20 hover:scale-105 active:scale-95 transition-all duration-300",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm rounded-md",
      md: "px-6 py-3 text-base rounded-lg font-semibold",
      lg: "px-8 py-4 text-lg rounded-xl font-bold uppercase tracking-wider",
      xl: "px-10 py-5 text-xl rounded-2xl font-extrabold uppercase tracking-widest",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-turquoise focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
