import { classNames } from "@/utils";

export const scrollbarClasses = "\
p-0.5 \
bg-primary-300/30 \
hover:bg-primary-500 \
\
data-[orientation=vertical]:w-2.5 \
data-[orientation=horizontal]:h-2.5 \
data-[orientation=horizontal]:flex-col \
\
flex \
transition-colors \
duration-[160ms] ease-out \
select-none \
touch-none";

export const scrollbarThumbClasses = "\
relative \
flex-1 \
bg-primary-700/70 \
rounded-[10px] \
\
before:content-[''] \
before:absolute \
before:top-1/2 \
before:left-1/2 \
before:-translate-x-1/2 \
before:-translate-y-1/2 \
\
before:w-full \
before:h-full \
\
before:min-w-[44px] \
before:min-h-[44px]";

export const focusClasses = "\
focus:ring-primary-600 \
dark:focus:ring-primary-400 \
focus:ring-offset-primary-200 \
dark:focus:ring-offset-primary-800 \
focus:ring-1 \
focus:ring-offset-1 \
focus:outline-none";

export const checkboxClasses = classNames("form-checkbox text-primary-500 bg-primary-400 rounded-sm", focusClasses);
