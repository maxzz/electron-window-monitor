import { type HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import { a, useSpring } from "@react-spring/web";
import { classNames } from "@/utils";
import { monitoringCounterAtom, sawGetDisabledAtom } from "@/store";
import { ButtonRunMonitor } from "./1-btn-get-window-monitor";
import { ButtonGetContent } from "./2-btn-get-content";
import { ButtonGetSawHandle } from "./5-btn-get-saw-handle";
import { ButtonGetIcon } from "./4-btn-get-icon";
import { ButtonGetManifest } from "./3-btn-get-mani";

export function MainActionsPanel({ className, ...rest }: HTMLAttributes<HTMLElement>) {
    return (
        <div className={classNames("grid grid-cols-[auto,auto,1fr,auto] gap-2 select-none", className)} {...rest}>
            <ButtonRunMonitor />

            <GetActionsGroup />

            <ButtonGetSawHandle className="col-start-1 [@media_(min-width:_480px)]:col-start-4" />
        </div>
    );
}

function GetActionsGroup() {

    const isDisabled = useAtomValue(sawGetDisabledAtom);
    const animStyles = useSpring({ opacity: isDisabled ? 0 : 1 });

    return (
        <a.div style={animStyles} className={classNames(getClasses)}>

            <div className="absolute left-2.5 -top-2 px-3 text-[.65rem] bg-primary-200 border-primary-500/50 border rounded">
                Get
            </div>

            <div className="flex items-center gap-x-2">
                <ButtonGetContent />
                <ButtonGetIcon />
                <ButtonGetManifest />
            </div>

        </a.div>
    );
}

const getClasses = "\
relative px-2 min-h-[66px] \
border-primary-500/50 border \
rounded shadow-inner \
flex items-center \
";

//text-sm [@media_(min-width:_480px)]:text-base
