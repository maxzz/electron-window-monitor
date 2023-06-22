import { doGetSawHandleAtom, doMonitoringAtom, doGetSawContentAtom, sawHandleAtom } from "@/store";
import { classNames } from "@/utils";
import { useSetAtom, useAtomValue, useAtom } from "jotai";
import { IconPlayStop, IconPlayStart } from "../../ui/icons";

const buttonClasses = "px-3 py-2 border-primary-500 hover:border-primary-600 hover:bg-primary-500 disabled:opacity-20 border rounded shadow active:scale-[.97] transition-transform";

function ButtonGetWindowHandle() {
    const doGetSawHandle = useSetAtom(doGetSawHandleAtom);
    const isMonitoring = useAtomValue(doMonitoringAtom);
    return (
        <button className={buttonClasses} disabled={isMonitoring} onClick={doGetSawHandle}>
            Get Second Window
        </button>
    );
}

function ButtonGetWindowContent() {
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

export function MainActionsPanel() {
    return (
        <div className="flex flex-wrap gap-2">
            <ButtonGetWindowHandle />
            <ButtonGetWindowContent />
            <ButtonStartTimer />
        </div>
    );
}
