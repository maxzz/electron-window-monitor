import { useSetAtom, useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { doGetWindowControlsAtom, doMonitoringAtom, sawHandleAtom } from "@/store";
import { clientState } from "@/store/app-state";
import { classNames } from "@/utils";
import { buttonClasses } from ".";

export function ButtonGetContent() {
    const doGetWindowControls = useSetAtom(doGetWindowControlsAtom);
    const setIsMonitoring = useSetAtom(doMonitoringAtom);
    const secondActiveWindow = useAtomValue(sawHandleAtom);
    const { buildRunning } = useSnapshot(clientState);
    const hwnd = secondActiveWindow?.hwnd;
    const isDisabled = !hwnd || buildRunning;
    const title = !hwnd ? 'Get the second active window first' : buildRunning ? 'Build already started' : 'Get the second active window content';
    return (
        <button
            className={classNames(buttonClasses, "")}
            disabled={isDisabled}
            title={title}
            onClick={() => {
                setIsMonitoring({ doStart: false });
                doGetWindowControls(hwnd);
            }}
        >
            Content
        </button>
    );
}
