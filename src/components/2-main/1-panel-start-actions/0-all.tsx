import { type HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import { a, useSpring } from "@react-spring/web";
import { classNames } from "@/utils";
import { sawGetDisabledAtom } from "@/store";
import { ButtonStartStopMonitor } from "./1-btn-start-stop-monitor";
import { ButtonGetControls } from "./2-btn-get-controls";
import { ButtonGetSawHandle } from "./5-btn-get-saw-handle";
import { ButtonGetIcon } from "./4-btn-get-icon";
import { ButtonGetManifest } from "./3-btn-get-mani";

export function StartActionsPanel({ className, ...rest }: HTMLAttributes<HTMLElement>) {
    return (
        <div className={classNames("grid grid-cols-[auto,auto,1fr,auto] gap-2 select-none", className)} {...rest}>
            <ButtonStartStopMonitor />

            <ActionsGroup_Get />

            <ButtonGetSawHandle className="col-start-1 [@media_(min-width:_480px)]:col-start-4" />
        </div>
    );
}

function ActionsGroup_Get() {

    const isDisabled = useAtomValue(sawGetDisabledAtom);
    const animStyles = useSpring({ opacity: isDisabled ? 0 : 1 });

    return (
        <a.div className={classNames(containerGetClasses)} style={animStyles}>

            <div className={labelGetClasses}>
                Get
            </div>

            <div className="flex items-center gap-x-2">
                <ButtonGetControls />
                <ButtonGetIcon />
                <ButtonGetManifest />
            </div>

        </a.div>
    );
}

const containerGetClasses = "\
relative px-2 py-2 \
border-primary-500/20 border \
rounded shadow-inner \
flex items-center \
";

const labelGetClasses = "absolute -left-[1px] -top-[14px] px-2 pb-[1px] text-[.6rem] bg-primary-200 border-primary-500/20 border rounded-sm";

//text-sm [@media_(min-width:_480px)]:text-base
