export const barClasses = "\
p-0.5 \
bg-primary-500/50 \
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
touch-none \
";

export const thumbClasses = "\
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
before:min-h-[44px] \
";
