import { useAtomValue, useSetAtom } from "jotai";
import { invokeMain, secondActiveWindowAtom } from "@/store";

const buttonClasses = "px-4 py-3 border-primary-500 hover:border-primary-600 hover:bg-primary-500 border rounded shadow active:scale-[.97] transition-transform";

function ButtonGetSecondWindow() {
    const setSecondActiveWindow = useSetAtom(secondActiveWindowAtom);
    async function sendRequest() {
        const res = await invokeMain({ type: 'get-second-window-handle' });
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
    const setSecondActiveWindow = useSetAtom(secondActiveWindowAtom);
    async function sendRequest() {
        const res = await invokeMain({ type: 'get-second-window-handle' });
        const obj = JSON.parse(res || '{}');
        console.log('ButtonGetSecondWindowContent', obj);
        setSecondActiveWindow(obj);
    }
    return (
        <button className={buttonClasses} onClick={sendRequest}>
            Get Second Window Content
        </button>
    );
}

function Row({ name, value }: { name: string; value: string; }) {
    return (<>
        <div className="">{name}</div>
        <div className="">{value}</div>
    </>);
}

function SecondWindowResult() {
    const secondActiveWindow = useAtomValue(secondActiveWindowAtom);
    return (
        <div className="my-4">
            <div className="py-4 font-semibold">Window</div>
            <div className="text-sm grid grid-cols-[auto_1fr] gap-x-2">
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
