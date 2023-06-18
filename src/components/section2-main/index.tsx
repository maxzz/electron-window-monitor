import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { invokeMain, isMonitoringAtom, sawContentStrAtom, secondActiveWindowAtom } from "@/store";
import { SecondWindowResult, SecondWindowContent } from "./result-displays";

const buttonClasses = "px-3 py-2 border-primary-500 hover:border-primary-600 hover:bg-primary-500 disabled:opacity-20 border rounded shadow active:scale-[.97] transition-transform";

function ButtonGetSecondWindow() {
    const isMonitoring = useAtomValue(isMonitoringAtom);
    const setSecondActiveWindow = useSetAtom(secondActiveWindowAtom);
    async function sendRequest() {
        const res = await invokeMain<string>({ type: 'get-second-window-handle' });
        const obj = JSON.parse(res || '{}');
        console.log('ButtonGetSecondWindow', obj);
        setSecondActiveWindow(obj);
    }
    return (
        <button className={buttonClasses} disabled={isMonitoring} onClick={sendRequest}>
            Get Second Window
        </button>
    );
}

function ButtonGetSecondWindowContent() {
    const setSawContentStr = useSetAtom(sawContentStrAtom);
    const secondActiveWindow = useAtomValue(secondActiveWindowAtom);
    const hwnd = secondActiveWindow?.hwnd;
    async function sendRequest() {
        if (hwnd) {
            const res = await invokeMain<string>({ type: 'get-second-window-content', hwnd });
            const obj = JSON.parse(res || '{}');
            console.log('ButtonGetSecondWindowContent', obj);
            setSawContentStr(res);
        }
    }
    return (
        <button className={buttonClasses} disabled={!hwnd} onClick={sendRequest}>
            Get Content
        </button>
    );
}

function ButtonStartTimer() {
    const [isMonitoring, setIsMonitoring] = useAtom(isMonitoringAtom);
    async function sendRequest() {
        setIsMonitoring((v) => !v);
    }
    return (
        <button className={buttonClasses} onClick={sendRequest}>
            {isMonitoring ? 'Stop Monitor' : 'Start Monitor'}
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
