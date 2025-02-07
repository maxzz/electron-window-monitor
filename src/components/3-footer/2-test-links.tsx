import { useAtomValue, useSetAtom } from "jotai";
import { sawHandleAtom, doHighlightRectAtom } from "@/store";

export function TestLinks() {
    return (
        <div className="text-primary-600 flex items-center space-x-1">
            <div>
                Test web logins:
            </div>

            <a className={linkClasses} href="https://tailwindui.com/login" target="_blank">
                tw
            </a>
            <a className={linkClasses} href="https://www.bankofamerica.com" target="_blank">
                bofa
            </a>

            <TestHighlight />
        </div>
    );
}

function TestHighlight() {
    const sawHandle = useAtomValue(sawHandleAtom);
    const doHighlightRect = useSetAtom(doHighlightRectAtom);

    if (!sawHandle?.hwnd) {
        return null;
    }
    
    return (
        <button className={linkClasses} onClick={() => {
            doHighlightRect({ hwnd: sawHandle.hwnd, rect: { left: 0, top: 0, right: 640, bottom: 480, } });
        }}>hi</button>
    );
}

const linkClasses = "px-2 pb-0.5  hover:bg-primary-300 border-primary-500 border border-dotted rounded-sm underline underline-offset-2";
