"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// Styled native select
export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  className?: string;
};
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => (
    <select
      ref={ref}
      className={cn("border rounded-md px-3 py-2 text-sm", className)}
      {...props}
    />
  )
);
Select.displayName = "Select";

export type SelectItemProps = React.OptionHTMLAttributes<HTMLOptionElement> & {
  className?: string;
  children?: React.ReactNode;
};
export const SelectItem = React.forwardRef<HTMLOptionElement, SelectItemProps>(
  ({ className, children, ...props }, ref) => (
    <option ref={ref} className={cn("px-3 py-2 text-sm", className)} {...props}>
      {children}
    </option>
  )
);
SelectItem.displayName = "SelectItem";
