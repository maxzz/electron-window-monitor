import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { doGetSawHandleAtom, doGetWindowContentAtom, doMonitoringAtom, sawHandleAtom } from "@/store";
import { SawHandlePanel, SawContentPanel, MonitoringCounter } from "./result-displays";
import { useState } from "react";

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
    const doGetWindowContent = useSetAtom(doGetWindowContentAtom);
    const secondActiveWindow = useAtomValue(sawHandleAtom);
    const hwnd = secondActiveWindow?.hwnd;
    return (
        <button className={buttonClasses} disabled={!hwnd} onClick={() => doGetWindowContent(hwnd)}>
            Get Content
        </button>
    );
}

function ButtonStartTimer() {
    const doGetSawHandle = useSetAtom(doGetSawHandleAtom);
    const [isMonitoring, setIsMonitoring] = useAtom(doMonitoringAtom);
    async function sendRequest() {
        function callback() {
            console.log('callback');
            doGetSawHandle();
        }
        setIsMonitoring({ doStart: !isMonitoring, callback });
    }
    return (
        <button className={buttonClasses} onClick={sendRequest}>
            {isMonitoring ? `Stop Monitor` : 'Start Monitor'}
        </button>
    );
}

export function Section2Main() {
    return (
        <div className="relative m-4 text-primary-900 space-x-2">
            <ButtonGetSecondWindow />
            <ButtonGetSecondWindowContent />
            <ButtonStartTimer />
            <SawHandlePanel />
            <SawContentPanel />
            <MonitoringCounter />
        </div>
    );
}
