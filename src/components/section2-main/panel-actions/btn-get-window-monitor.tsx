import { useSetAtom, useAtom } from "jotai";
import { doGetTargetHwndAtom, doMonitoringAtom } from "@/store";
import { IconPlayStop, IconPlayStart } from "@/components/ui/icons";
import { classNames } from "@/utils";
import { buttonClasses } from ".";
import { MonitoringCounter } from "./monitor-counter";

export function ButtonRunMonitor() {
    const doGetTargetHwnd = useSetAtom(doGetTargetHwndAtom);
    const [isMonitoring, setIsMonitoring] = useAtom(doMonitoringAtom);
    async function sendRequest() {
        function callback() {
            doGetTargetHwnd();
        }
        setIsMonitoring({ doStart: !isMonitoring, callback });
    }
    return (
        <button className={classNames("relative", buttonClasses)} onClick={sendRequest}>
            {isMonitoring
                ? <div className="flex items-center gap-1"><IconPlayStop className="w-4 h-4 pt-0.5 fill-red-500 text-red-400" />Stop Monitor</div>
                : <div className="flex items-center gap-1"><IconPlayStart className="w-4 h-4 pt-0.5" />Start Monitor</div>
            }
            <MonitoringCounter className="absolute -top-3 px-2 leading-6 bg-primary-400 border-primary-600 border rounded" />
        </button>
    );
}
