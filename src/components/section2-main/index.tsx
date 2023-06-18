import { useAtomValue, useSetAtom } from "jotai";
import { invokeMain, secondActiveContentAtom, secondActiveWindowAtom } from "@/store";

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
            Get Second Window Content
        </button>
    );
}

function Row({ name, value }: { name: string; value: string; }) {
    return (<>
        <div className="py-1.5 px-2 h-full border-primary-500 border-b text-xs ">{name}</div>
        <div className="py-1 border-primary-500 border-l border-b px-2">{value}</div>
    </>);
}

function SecondWindowResult() {
    const secondActiveWindow = useAtomValue(secondActiveWindowAtom);
    return (
        <div className="my-4">
            <div className="py-4 font-semibold">
                Window
            </div>

            <div className="max-w-[max-content] text-xs border-primary-500 border rounded grid grid-cols-[auto_1fr]">
                {secondActiveWindow && (<>
                    <Row name="hwnd"      /**/ value={secondActiveWindow.hwnd} />
                    <Row name="caption"   /**/ value={secondActiveWindow.caption} />
                    <Row name="classname" /**/ value={secondActiveWindow.classname} />
                    <Row name="process"   /**/ value={secondActiveWindow.process} />
                </>)}
            </div>
        </div>
    );
}

function SecondWindowContent() {
    return (
        <div className="my-4">
            <div className="py-4 font-semibold">Content</div>
            <div className="text-sm grid grid-cols-[auto_1fr] gap-x-2">
                Not now
            </div>
        </div>
    );
}

export function Section2Main() {
    return (
        <div className="m-4 text-primary-900 space-x-2">
            <ButtonGetSecondWindow />
            <ButtonGetSecondWindowContent />
            <SecondWindowResult />
            <SecondWindowContent />
        </div>
    );
}
