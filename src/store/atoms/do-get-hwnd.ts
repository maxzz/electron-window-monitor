import { atom } from "jotai";
import { invokeMain } from "../../shared/ipc-client";
import { GetTargetWindowResult } from "@/electron/app/napi-calls";
import { doGetWindowIconAtom, sawContentAtom, sawContentStrAtom } from ".";
import { appUi, clientStateAtom } from "../app-state";

export const sawHandleStrAtom = atom<string | undefined>('');
export const sawHandleAtom = atom<GetTargetWindowResult | null>(null);
export const lastBuildProgressAtom = atom(0); // last number of build progress or 0

export const doClearSawHandleAtom = atom(
    null,
    (get, set) => {
        set(sawHandleAtom, null);
        set(sawHandleStrAtom, '');
    }
);

export const doGetTargetHwndAtom = atom(
    null,
    async (get, set): Promise<void> => {
        try {
            const res = await invokeMain<string>({ type: 'get-target-hwnd' });

            const prev = get(sawHandleStrAtom);
            if (prev === res) {
                return;
            }
            set(sawHandleStrAtom, res);

            set(sawContentStrAtom, undefined);
            set(sawContentAtom, null);

            const obj = JSON.parse(res || '{}') as GetTargetWindowResult;
            set(sawHandleAtom, obj);

            if (appUi.uiState.iconAutoUpdate) {
                if (obj.hwnd) {
                    set(doGetWindowIconAtom, obj.hwnd);
                }
            }

            //console.log('doGetSawHandleAtom.set', JSON.stringify(obj, null, 4));
        } catch (error) {
            set(sawHandleStrAtom, '');
            set(sawHandleAtom, null);
            console.error(`'doGetTargetHwndAtom' ${error instanceof Error ? error.message : `${error}`}`);
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
