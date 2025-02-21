import { type ComponentPropsWithoutRef, type HTMLAttributes } from "react";
import { useSetAtom, useAtomValue } from "jotai";
import { AnimatePresence, motion, type Transition } from "motion/react";
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
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={animationTransition}
                    className={classNames(buttonClasses,
                        //isMonitoring && "!opacity-5", 
                        className)}
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
