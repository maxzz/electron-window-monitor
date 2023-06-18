import { atom } from "jotai";
import { invokeMain } from "../ipc-renderer";

export type SawHandle = {   // SAW - Second Active Window
    hwnd: string;           // "000000000014103E",
    caption: string;        // "ipc-invoke.ts - electron-window-monitor - Visual Studio Code",
    classname: string;      // "Chrome_WidgetWin_1",
    process: string;        // "C:\\Program Files\\Microsoft VS Code\\Code.exe"
};

export const sawHandleAtom = atom<SawHandle | null>(null);

export const doGetSawHandleAtom = atom(
    null,
    async (get, set): Promise<void> => {
        const res = await invokeMain<string>({ type: 'get-second-window-handle' });
        const obj = JSON.parse(res || '{}');
        set(sawHandleAtom, obj);

        console.log('doGetSawHandleAtom.set', obj);
    }
);
