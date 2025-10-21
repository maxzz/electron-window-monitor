import { type HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import { motion, AnimatePresence } from "motion/react";
import { classNames } from "@/utils";
import { sawGetDisabledAtom } from "@/store";
import { ButtonStartStopMonitor } from "./1-btn-start-stop-monitor";
import { ButtonGetControls } from "./2-btn-get-controls";
import { ButtonGetSawHandle } from "./5-btn-get-saw-handle";
import { ButtonGetIcon } from "./4-btn-get-icon";
import { ButtonGetManifest } from "./3-btn-get-mani";

export function StartActionsPanel({ className, ...rest }: HTMLAttributes<HTMLElement>) {
    return (
        <div className={classNames("grid grid-cols-[auto_auto_1fr_auto] gap-2 select-none", className)} {...rest}>
            <ButtonStartStopMonitor />

            <ActionsGroup_Get />

            <ButtonGetSawHandle className="col-start-1 [@media_(min-width:_480px)]:col-start-4" />
        </div>
    );
}

function ActionsGroup_Get() {
    const isDisabled = useAtomValue(sawGetDisabledAtom);
    
    return (
        <AnimatePresence>
            <motion.div 
                className={classNames(containerGetClasses)}
                initial={{ opacity: 0 }}
                animate={{ opacity: isDisabled ? 0 : 1 }}
                transition={{ duration: 0.2 }}
            >

                <div className={labelGetClasses}>
                    Get
                </div>

                <div className="flex items-center gap-x-2">
                    <ButtonGetControls />
                    <ButtonGetIcon />
                    <ButtonGetManifest />
                </div>

            </motion.div>
        </AnimatePresence>
    );
}

const containerGetClasses = "\
relative px-2 py-2 \
border-primary-500/20 border \
rounded shadow-inner \
flex items-center \
";

const labelGetClasses = "absolute -left-px -top-[14px] px-2 pb-px text-[.6rem] bg-primary-200 border-primary-500/20 border rounded-xs";

//text-sm [@media_(min-width:_480px)]:text-base
