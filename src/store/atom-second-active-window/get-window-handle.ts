import { atom } from "jotai";
import { invokeMain } from "../ipc-client";
import { sawContentAtom, sawContentStrAtom } from ".";
import { GetTargetWindowResult } from "@/electron/app/windows-napi-calls/pmat-plugin-types";
import { clientState } from "../app-state";
import { snapshot, useSnapshot } from "valtio";
import { atomWithProxy } from "jotai-valtio";

export const sawHandleAtom = atom<GetTargetWindowResult | null>(null);
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

            set(sawContentStrAtom, undefined);
            set(sawContentAtom, null);

            const obj = JSON.parse(res || '{}');
            set(sawHandleAtom, obj);

            //console.log('doGetSawHandleAtom.set', JSON.stringify(obj, null, 4));
        } catch (error) {
            set(sawHandleStrAtom, '');
            set(sawHandleAtom, null);
            console.error(`'get-saw-handle' ${error instanceof Error ? error.message : `${error}`}`);
        }
    }
);

const clientStateAtom = atomWithProxy(clientState);

export const sawGetDisabledAtom = atom(
    (get) => {
        const secondActiveWindow = get(sawHandleAtom);
        const { buildRunning } = get(clientStateAtom);
        console.log('secondActiveWindow', secondActiveWindow, 'buildRunning', buildRunning);
        const hwnd = secondActiveWindow?.hwnd;
        const isDisabled = !hwnd || buildRunning;
        return isDisabled;
    }
);
// export const sawGetDisabledAtom = atom(
//     (get) => {
//         const secondActiveWindow = get(sawHandleAtom);
//         const { buildRunning } = snapshot(clientState);
//         //const { buildRunning } = useSnapshot(clientState);
//         console.log('secondActiveWindow', secondActiveWindow, 'buildRunning', buildRunning);
//         const hwnd = secondActiveWindow?.hwnd;
//         const isDisabled = !hwnd || buildRunning;
//         return isDisabled;
//     }
// );
