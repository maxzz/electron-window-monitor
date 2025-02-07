import { useSetAtom, useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { doGetWindowManiAtom, doMonitoringAtom, napiBuildState, sawHandleAtom } from "@/store";
import { appUi } from "@/store/1-app-state";
import { buttonClasses } from "./8-button-classes";
import { classNames } from "@/utils";

export function ButtonGetManifest() {
    const doGetWindowMani = useSetAtom(doGetWindowManiAtom);
    const doIsMonitoring = useSetAtom(doMonitoringAtom);
    
    const secondActiveWindow = useAtomValue(sawHandleAtom);
    const { buildRunning } = useSnapshot(napiBuildState);
    const { acquireXml } = useSnapshot(appUi.uiState);

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
                doGetWindowMani({ hwnd, wantXml: acquireXml });
            }}
        >
            Manifest
        </button>
    );
}
