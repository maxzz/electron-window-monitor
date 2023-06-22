import { doGetSawHandleAtom, doMonitoringAtom, doGetSawContentAtom, sawHandleAtom } from "@/store";
import { classNames } from "@/utils";
import { useSetAtom, useAtomValue, useAtom } from "jotai";
import { IconPlayStop, IconPlayStart } from "../../ui/icons";
import { HTMLAttributes } from "react";

const buttonClasses = "px-3 py-2 border-primary-500 hover:border-primary-600 hover:bg-primary-500 disabled:opacity-20 border rounded shadow active:scale-[.97] transition-transform";

function ButtonRunMonitor() {
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

function ButtonGetContent() {
    const doGetWindowContent = useSetAtom(doGetSawContentAtom);
    const setIsMonitoring = useSetAtom(doMonitoringAtom);
    const secondActiveWindow = useAtomValue(sawHandleAtom);
    const hwnd = secondActiveWindow?.hwnd;
    return (
        <button
            className={buttonClasses} disabled={!hwnd}
            onClick={() => {
                setIsMonitoring({ doStart: false });
                doGetWindowContent(hwnd);
            }}
        >
            Get Content
        </button>
    );
}

function ButtonGetHandle({ className, ...rest }: HTMLAttributes<HTMLButtonElement>) {
    const doGetSawHandle = useSetAtom(doGetSawHandleAtom);
    const isMonitoring = useAtomValue(doMonitoringAtom);
    return (
        <button className={classNames(buttonClasses, className)} disabled={isMonitoring} onClick={doGetSawHandle} {...rest}>
            Get Second Window
        </button>
    );
}

export function MainActionsPanel() {
    return (
        <div className="w-full max-w-xl text-sm [@media_(min-width:_480px)]:text-base grid grid-cols-[auto,auto,1fr,auto] gap-2">
            <ButtonRunMonitor />
            <ButtonGetContent />
            <ButtonGetHandle className="col-start-1 [@media_(min-width:_480px)]:col-start-4" />
        </div>
    );
}
