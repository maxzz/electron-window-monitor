import { useSetAtom, useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { doGetWindowControlsAtom, doMonitoringAtom, sawHandleAtom } from "@/store";
import { napiBuildState } from "@/store/7-napi-atoms";
import { buttonClasses } from "./8-button-classes";

export function ButtonGetContent() {
    const doGetWindowControls = useSetAtom(doGetWindowControlsAtom);
    const setIsMonitoring = useSetAtom(doMonitoringAtom);
    const secondActiveWindow = useAtomValue(sawHandleAtom);
    const { buildRunning } = useSnapshot(napiBuildState);
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
            Controls
        </button>
    );
}
