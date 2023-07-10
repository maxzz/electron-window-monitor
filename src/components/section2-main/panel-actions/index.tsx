import { useAtomValue } from "jotai";
import { monitoringCounterAtom, sawGetDisabledAtom } from "@/store";
import { ButtonRunMonitor } from "./btn-get-window-monitor";
import { ButtonGetContent } from "./btn-get-content";
import { ButtonGetHandle } from "./btn-get-window-manual";
import { ButtonGetIcon } from "./btn-get-icon";
import { ButtonGetManifest } from "./btn-get-mani";
import { classNames } from "@/utils";
import { HTMLAttributes } from "react";
import { a, useSpring } from "@react-spring/web";

export const buttonClasses = "px-3 py-2 border-primary-500 hover:border-primary-600 hover:bg-primary-500 border rounded shadow active:scale-[.97] disabled:scale-100 disabled:hover:bg-transparent disabled:opacity-20 transition-transform";

const counterClasses = "self-center pt-1 text-3xl text-center font-mono font-semibold text-transparent [-webkit-text-stroke-width:0.5px] [-webkit-text-stroke-color:#0da50d]";

export function MonitoringCounter() {
    const monitoringCounter = useAtomValue(monitoringCounterAtom);

    if (monitoringCounter < 0) {
        return null;
    }
    return (
        <div className={counterClasses} title="Number of calls to check the active window">
            {`${monitoringCounter}`.padStart(2, '0')}
        </div>
    );
}

function GetActionsGroup() {
    const isDisabled = useAtomValue(sawGetDisabledAtom);
    const styles = useSpring({ opacity: isDisabled ? 0 : 1 });
    return (
        <a.div style={styles} className={classNames("relative px-2 min-h-[66px] border-primary-500/50 border border-b-0 rounded-t shadow-inner flex items-end")}>
            <div className="absolute left-3 -top-3 px-3 bg-primary-500/50 border-primary-500 border rounded">
                Get
            </div>
            <div className="flex items-center space-x-2">
                <ButtonGetContent />
                <ButtonGetIcon />
                <ButtonGetManifest />
            </div>
        </a.div>
    );
}

export function MainActionsPanel({ className, ...rest }: HTMLAttributes<HTMLElement>) {
    return (
        <div className={classNames("text-sm [@media_(min-width:_480px)]:text-base grid grid-cols-[auto,auto,1fr,auto] gap-2 select-none", className)} {...rest}>
            <ButtonRunMonitor />
            <GetActionsGroup />
            <MonitoringCounter />
            <ButtonGetHandle className="col-start-1 [@media_(min-width:_480px)]:col-start-4" />
        </div>
    );
}
