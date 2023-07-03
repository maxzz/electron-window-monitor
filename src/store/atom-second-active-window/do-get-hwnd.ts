import { atom } from "jotai";
import { invokeMain } from "../ipc-client";
import { GetTargetWindowResult } from "@/electron/app/napi-calls";
import { sawContentAtom, sawContentStrAtom } from ".";
import { clientStateAtom } from "../app-state";

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

export const sawGetDisabledAtom = atom(
    (get) => {
        const secondActiveWindow = get(sawHandleAtom);
        const { buildRunning } = get(clientStateAtom);
        const hwnd = secondActiveWindow?.hwnd;
        const isDisabled = !hwnd || buildRunning;
        return isDisabled;
    }
);
