import * as React from "react";
// Adjust the import path to match your project structure
import { cn } from "../../lib/utils";

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <label
        className={cn(
          "block text-sm font-medium text-primary-foreground", // Adjust classes as needed
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </label>
    );
  }
);

Label.displayName = "Label";

export { Label };
