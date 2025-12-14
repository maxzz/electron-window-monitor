import { type MotionNodeAnimationOptions, type Transition } from "motion/react";

export const animationTransition: Transition = {
    // type: "spring",
    // stiffness: 500,
    // damping: 50,
    duration: 0.2,
};

export const animationProps: MotionNodeAnimationOptions = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
};

/**
 * Top big action button classes
 */
export const buttonClasses = "\
px-2 py-1 \
text-sm \
hover:text-primary-700 \
hover:bg-primary-300 \
border-primary-500 \
hover:border-primary-600 \
border \
rounded \
shadow \
active:scale-[.97] \
disabled:scale-100 \
disabled:hover:bg-transparent \
disabled:opacity-20 \
transition-all \
";

/**
 * Utility button classes
 */
export const utilityButtonClasses = "\
p-1 text-xs \
\
hover:bg-primary-300 \
hover:border-primary-600 hover:shadow-sm \
border-primary-500 border \
\
rounded shadow-xs select-none \
active:scale-[.97] transition-transform \
";
