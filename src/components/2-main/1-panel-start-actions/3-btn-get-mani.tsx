import { useSetAtom, useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { doGetWindowManiAtom, doMonitoringAtom, napiBuildState, sawHandleAtom } from "@/store";
import { appSettings } from "@/store/1-app-state";
import { buttonClasses } from "./8-button-classes";

export function ButtonGetManifest() {

    const doIsMonitoring = useSetAtom(doMonitoringAtom);
    const doGetWindowMani = useSetAtom(doGetWindowManiAtom);
    
    const secondActiveWindow = useAtomValue(sawHandleAtom);
    const { buildRunning } = useSnapshot(napiBuildState);
    const { acquireXml } = useSnapshot(appSettings.monitor);

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
