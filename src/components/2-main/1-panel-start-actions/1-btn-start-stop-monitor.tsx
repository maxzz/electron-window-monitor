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
            {isMonitoring
                ? (
                    <div className="flex items-center gap-1"><IconPlayStop className="w-4 h-4 pt-0.5 fill-red-500 text-red-400" />
                        Stop Monitor
                    </div>
                )
                : (
                    <div className="flex items-center gap-1"><IconPlayStart className="w-4 h-4 pt-0.5" />
                        Start Monitor
                    </div>
                )
            }
            <MonitoringCounter className="absolute -top-3 px-2 leading-6 bg-primary-400 border-primary-600 border rounded" />
        </button>
    );
}

function MonitoringCounter({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {

    const monitoringCounter = useAtomValue(monitorCounterAtom);
    if (monitoringCounter < 0) {
        return null;
    }
    
    return (
        <div className={classNames(counterClasses, className)} title="Number of calls to check the active window" {...rest}>
            {`${monitoringCounter}`.padStart(2, '0')}
        </div>
    );
}

const counterClasses = "text-center font-mono font-semibold text-transparent [-webkit-text-stroke-width:0.5px] [-webkit-text-stroke-color:#173717]";
