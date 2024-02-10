import { HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import { monitoringCounterAtom } from "@/store";
import { classNames } from "@/utils";

const counterClasses = "text-center font-mono font-semibold text-transparent [-webkit-text-stroke-width:0.5px] [-webkit-text-stroke-color:#173717]";

export function MonitoringCounter({className, ...rest}: HTMLAttributes<HTMLDivElement>) {
    const monitoringCounter = useAtomValue(monitoringCounterAtom);
    if (monitoringCounter < 0) {
        return null;
    }
    return (
        <div className={classNames(counterClasses, className)} title="Number of calls to check the active window" {...rest}>
            {`${monitoringCounter}`.padStart(2, '0')}
        </div>
    );
}
