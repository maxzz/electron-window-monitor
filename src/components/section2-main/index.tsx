import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { doGetSawHandleAtom, doGetSawContentAtom, doMonitoringAtom, sawHandleAtom } from "@/store";
import { SawContentPanel } from "./panel-window-content";
import { SawHandlePanel } from "./panel-window-handle";
import { MonitoringCounter } from "./panel-monitor";
import { IconPlayStart, IconPlayStop } from "../ui/icons";
import { classNames } from "@/utils";

const buttonClasses = "px-3 py-2 border-primary-500 hover:border-primary-600 hover:bg-primary-500 disabled:opacity-20 border rounded shadow active:scale-[.97] transition-transform";

function ButtonGetSecondWindow() {
    const doGetSawHandle = useSetAtom(doGetSawHandleAtom);
    const isMonitoring = useAtomValue(doMonitoringAtom);
    return (
        <button className={buttonClasses} disabled={isMonitoring} onClick={doGetSawHandle}>
            Get Second Window
        </button>
    );
}

function ButtonGetSecondWindowContent() {
    const doGetWindowContent = useSetAtom(doGetSawContentAtom);
    const isMonitoring = useAtomValue(doMonitoringAtom);
    const secondActiveWindow = useAtomValue(sawHandleAtom);
    const hwnd = secondActiveWindow?.hwnd;
    return (
        <button className={buttonClasses} disabled={!hwnd || isMonitoring} onClick={() => doGetWindowContent(hwnd)}>
            Get Content
        </button>
    );
}

function ButtonStartTimer() {
    const doGetSawHandle = useSetAtom(doGetSawHandleAtom);
    const [isMonitoring, setIsMonitoring] = useAtom(doMonitoringAtom);
    async function sendRequest() {
        function callback() {
            doGetSawHandle();
        }
        setIsMonitoring({ doStart: !isMonitoring, callback });
    }
    return (
        <button className={classNames("", buttonClasses)} onClick={sendRequest}>
            {isMonitoring
                ? <div className="flex items-center gap-1"><IconPlayStop className="w-4 h-4 pt-0.5" />Stop Monitor</div>
                : <div className="flex items-center gap-1"><IconPlayStart className="w-4 h-4 pt-0.5" />Start Monitor</div>
            }
        </button>
    );
}

export function Section2Main() {
    return (
        <div className="relative m-4 text-primary-900">
            <div className="flex flex-wrap gap-2">
                <ButtonGetSecondWindow />
                <ButtonGetSecondWindowContent />
                <ButtonStartTimer />
            </div>
            <SawHandlePanel />
            <SawContentPanel />
            <MonitoringCounter />
        </div>
    );
}
