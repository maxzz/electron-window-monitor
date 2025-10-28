import * as React from "react";
import { cn } from "@/utils/index";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
    ({ className, type, ...props }, ref) => {
        return (
            <input ref={ref} type={type} className={cn(inputClasses, className)} {...props} />
        );
    }
);
Input.displayName = "Input";

export { Input };

const inputClasses = "\
px-3 \
1py-1 \
w-full \
h-9 \
text-base \
md:text-sm \
border-input \
bg-transparent \
placeholder:text-muted-foreground \
\
file:border-0 \
file:bg-transparent \
file:text-sm \
file:font-medium \
file:text-foreground \
\
focus-visible:outline-none \
focus-visible:ring-1 \
focus-visible:ring-ring \
disabled:cursor-not-allowed \
disabled:opacity-50 \
\
border \
rounded-md \
shadow-sm \
transition-colors \
flex \
";
