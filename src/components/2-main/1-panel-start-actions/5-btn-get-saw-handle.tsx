import { type ComponentPropsWithoutRef } from "react";
import { useSetAtom, useAtomValue } from "jotai";
import { AnimatePresence, type AnimationProps, motion, type Transition } from "motion/react";
import { classNames } from "@/utils";
import { buttonClasses } from "./8-button-classes";
import { doGetTargetHwndAtom, doMonitoringAtom } from "@/store";

export function ButtonGetSawHandle({ className, ...rest }: ComponentPropsWithoutRef<typeof motion.button>) {

    const isMonitoring = useAtomValue(doMonitoringAtom);
    const doGetTargetHwnd = useSetAtom(doGetTargetHwndAtom);

    return (
        <AnimatePresence>
            {!isMonitoring && (
                <motion.button
                    {...animationProps}
                    transition={animationTransition}
                    className={classNames(buttonClasses, className)}
                    disabled={isMonitoring}
                    onClick={doGetTargetHwnd}
                    {...rest}
                >
                    Get Second Window
                </motion.button>
            )}
        </AnimatePresence>
    );
}

const animationTransition: Transition = {
    // type: "spring",
    // stiffness: 500,
    // damping: 50,
    duration: 0.2,
};

const animationProps: AnimationProps = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
};