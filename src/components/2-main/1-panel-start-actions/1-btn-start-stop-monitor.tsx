import { type HTMLAttributes } from "react";
import { useSetAtom, useAtom, useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { doGetTargetHwndAtom, doMonitoringAtom, monitorCounterAtom } from "@/store";
import { IconPlayStop, IconPlayStart } from "@/components/ui";
import { buttonClasses } from "./8-button-classes";

export function ButtonStartStopMonitor() {
    const [isMonitoring, setIsMonitoring] = useAtom(doMonitoringAtom);
    const doGetTargetHwnd = useSetAtom(doGetTargetHwndAtom);

    async function sendRequest() {
        function callback() {
            doGetTargetHwnd();
        }
        setIsMonitoring({ doStart: !isMonitoring, callback });
    }

    return (
        <button className={classNames("relative", buttonClasses)} onClick={sendRequest}>
            <MonitorButtonText isMonitoring={isMonitoring} />
            <MonitorCounter className="absolute -top-3 px-2 leading-6 bg-primary-400 border-primary-600 border rounded" />
        </button>
    );
}

function MonitorButtonText({ isMonitoring }: { isMonitoring: boolean; }) {
    return (
        isMonitoring
            ? (
                <div className="flex items-center gap-1">
                    <IconPlayStop className="pt-0.5 size-4 fill-red-500 text-red-400" />
                    Stop Monitor
                </div>
            )
            : (
                <div className="flex items-center gap-1">
                    <IconPlayStart className="pt-0.5 size-4" />
                    Start Monitor
                </div>
            )
    );
}

function MonitorCounter({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {

    const monitorCounter = useAtomValue(monitorCounterAtom);
    if (monitorCounter < 0) {
        return null;
    }

    return (
        <div className={classNames(counterClasses, className)} title="Number of calls to check the active window" {...rest}>
            {`${monitorCounter}`.padStart(2, '0')}
        </div>
    );
}

const counterClasses = "text-center font-mono font-semibold text-transparent [-webkit-text-stroke-width:0.5px] [-webkit-text-stroke-color:#173717]";
