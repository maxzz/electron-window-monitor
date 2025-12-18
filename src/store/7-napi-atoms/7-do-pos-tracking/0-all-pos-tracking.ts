import { type PrimitiveAtom, atom } from "jotai";
import { invokeMainTyped, R2MCalls } from "@/shared/2-gates-in-client-as-atoms";
import { type TlwInfo } from "@/x-electron/xternal-to-renderer/7-napi-calls/pmat-plugin-types";

export type HighlightHwnd = TlwInfo | null | undefined;

export const dndActionInitAtom = atom(
    null,
    async (get, set, hwndAtom: PrimitiveAtom<HighlightHwnd>): Promise<string> => {
        const hwnd = get(hwndAtom);
        if (!hwnd) {
            console.log('hwnd not found');
            return 'no.wnd';
        }

        const data = await invokeMainTyped({ type: 'r2mi:get-window-pos-init', params: { what: 'init', hwnd: hwnd.hwnd } });
        if (data) {
            console.log('failed: dnd.init', data);
        }
        return data;
    }
);

export const dndActionAtom = atom(
    null,
    (get, set, action: 'move' | 'stop'): void => {
        R2MCalls.getWindowPosAction(action);
    }
);
