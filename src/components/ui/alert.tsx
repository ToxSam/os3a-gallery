import * as React from "react";
import { cn } from "../../lib/utils";

const Alert = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { type?: "success" | "error" | "warning" | "info" }>(
  ({ className, type = "info", ...props }, ref) => {
    const baseStyles = "rounded-lg p-4 flex items-start gap-3";
    const typeStyles = {
      success: "bg-green-100 text-green-800 border-green-200",
      error: "bg-red-100 text-red-800 border-red-200",
      warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
      info: "bg-blue-100 text-blue-800 border-blue-200",
    };

    return (
      <div
        className={cn(baseStyles, typeStyles[type], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Alert.displayName = "Alert";

const AlertIcon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn("flex-shrink-0 w-6 h-6", className)}
        ref={ref}
        {...props}
      />
    );
  }
);
AlertIcon.displayName = "AlertIcon";

const AlertTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        className={cn("font-bold text-lg leading-tight", className)}
        ref={ref}
        {...props}
      />
    );
  }
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <p
        className={cn("text-sm text-gray-700", className)}
        ref={ref}
        {...props}
      />
    );
  }
);
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertIcon, AlertTitle, AlertDescription };
