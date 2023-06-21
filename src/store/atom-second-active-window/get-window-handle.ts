import { atom } from "jotai";
import { invokeMain } from "../ipc-client";

export type SawHandle = {   // SAW - Second Active Window
    hwnd: string;           // "000000000014103E",
    caption: string;        // "ipc-invoke.ts - electron-window-monitor - Visual Studio Code",
    classname: string;      // "Chrome_WidgetWin_1",
    process: string;        // "C:\\Program Files\\Microsoft VS Code\\Code.exe"
};

export const sawHandleAtom = atom<SawHandle | null>(null);
export const sawHandleStrAtom = atom<string | undefined>('');

export const doClearSawHandleAtom = atom(
    null,
    (get, set) => {
        set(sawHandleAtom, null);
        set(sawHandleStrAtom, '');
    }
);

export const doGetSawHandleAtom = atom(
    null,
    async (get, set): Promise<void> => {
        try {
            const res = await invokeMain<string>({ type: 'get-second-window-handle' });
            const prev = get(sawHandleStrAtom);
            if (prev === res) {
                return;
            }

            set(sawHandleStrAtom, res);

            const obj = JSON.parse(res || '{}');
            set(sawHandleAtom, obj);

            console.log('doGetSawHandleAtom.set', JSON.stringify(obj, null, 4));
        } catch (error) {
            set(sawHandleStrAtom, '');
            set(sawHandleAtom, null);
            console.error(`'get-saw-handle' ${error instanceof Error ? error.message : `${error}`}`);
        }
    }
);
