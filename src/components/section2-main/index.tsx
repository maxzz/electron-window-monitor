import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { doGetSawHandleAtom, doGetWindowContentAtom, doMonitoringAtom, invokeMain, sawHandleAtom } from "@/store";
import { SecondWindowResult, SecondWindowContent } from "./result-displays";
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
    const [time, setTime] = useState(0);
    const [isMonitoring, setIsMonitoring] = useAtom(doMonitoringAtom);
    async function sendRequest() {
        function callback() {
            console.log('callback');
            setTime((v) => ++v);
        }
        setIsMonitoring({ doStart: !isMonitoring, callback });
    }
    return (
        <button className={buttonClasses} onClick={sendRequest}>
            {isMonitoring ? `Stop Monitor ${time}` : 'Start Monitor'}
        </button>
    );
}

export function Section2Main() {
    return (
        <div className="m-4 text-primary-900 space-x-2">
            <ButtonGetSecondWindow />
            <ButtonGetSecondWindowContent />
            <ButtonStartTimer />
            <SecondWindowResult />
            <SecondWindowContent />
        </div>
    );
}
