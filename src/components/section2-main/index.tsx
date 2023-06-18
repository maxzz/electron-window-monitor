import { useAtomValue, useSetAtom } from "jotai";
import { invokeMain, secondActiveContentAtom, secondActiveWindowAtom } from "@/store";
import { SecondWindowResult, SecondWindowContent } from "./result-displays";

const buttonClasses = "px-4 py-3 border-primary-500 hover:border-primary-600 hover:bg-primary-500 disabled:opacity-20 border rounded shadow active:scale-[.97] transition-transform";

function ButtonGetSecondWindow() {
    const setSecondActiveWindow = useSetAtom(secondActiveWindowAtom);
    async function sendRequest() {
        const res = await invokeMain<string>({ type: 'get-second-window-handle' });
        const obj = JSON.parse(res || '{}');
        console.log('ButtonGetSecondWindow', obj);
        setSecondActiveWindow(obj);
    }
    return (
        <button className={buttonClasses} onClick={sendRequest}>
            Get Second Window
        </button>
    );
}

function ButtonGetSecondWindowContent() {
    const setSecondActiveContent = useSetAtom(secondActiveContentAtom);
    const secondActiveWindow = useAtomValue(secondActiveWindowAtom);
    const hwnd = secondActiveWindow?.hwnd;
    async function sendRequest() {
        if (hwnd) {
            const res = await invokeMain<string>({ type: 'get-second-window-content', hwnd });
            const obj = JSON.parse(res || '{}');
            console.log('ButtonGetSecondWindowContent', obj);
            setSecondActiveContent(res);
        }
    }
    return (
        <button className={buttonClasses} disabled={!hwnd} onClick={sendRequest}>
            Get Content
        </button>
    );
}

function ButtonStartTimer() {
    async function sendRequest() {
    }
    return (
        <button className={buttonClasses} onClick={sendRequest}>
            Start Monitor
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
