import { type ComponentPropsWithoutRef } from "react";
import { useSetAtom, useAtomValue } from "jotai";
import { AnimatePresence, motion } from "motion/react";
import { classNames } from "@/utils";
import { animationProps, animationTransition, buttonClasses } from "./8-button-classes";
import { doGetTargetHwndAtom, doMonitoringTimerAtom } from "@/store";

export function ButtonGetSawHandle({ className, ...rest }: ComponentPropsWithoutRef<typeof motion.button>) {

    const isMonitoring = useAtomValue(doMonitoringTimerAtom);
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
