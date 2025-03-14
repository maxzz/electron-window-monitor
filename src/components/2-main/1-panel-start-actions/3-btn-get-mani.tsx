import { useSetAtom, useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { debugSettings } from "@/store/1-atoms";
import { doGetWindowManiAtom, doMonitoringTimerAtom, napiBuildState, sawHandleAtom } from "@/store";
import { buttonClasses } from "./8-button-classes";

export function ButtonGetManifest() {

    const doIsMonitoring = useSetAtom(doMonitoringTimerAtom);
    const doGetWindowMani = useSetAtom(doGetWindowManiAtom);
    
    const secondActiveWindow = useAtomValue(sawHandleAtom);
    const { buildRunning } = useSnapshot(napiBuildState);
    const { acquireXml } = useSnapshot(debugSettings.uiState);

    const hwnd = secondActiveWindow?.hwnd;
    const isDisabled = !hwnd || buildRunning;
    const title = !hwnd ? 'Get the second active window first' : buildRunning ? 'Build already started' : 'Get the second active window content';

    return (
        <button
            className={classNames(buttonClasses, "")}
            disabled={isDisabled}
            title={title}
            onClick={() => {
                doIsMonitoring({ doStart: false });
                doGetWindowMani({ hwnd: hwnd || '', wantXml: acquireXml, manual: false, passwordChange: false });
            }}
        >
            Manifest
        </button>
    );
}
