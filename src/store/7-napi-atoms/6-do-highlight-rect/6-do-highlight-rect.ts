import { atom } from "jotai";
import { sendToMain } from "@/shared/2-gates-in-client-as-atoms";
import { type TargetClientRect } from "@/x-electron/xternal-to-renderer/7-napi-calls";
import { sawHandleAtom } from "../1-do-get-hwnd";

export const doHighlightRectAtom = atom(
    null,
    (get, set, { hwnd, rect }: { hwnd?: string, rect: TargetClientRect | undefined; }) => {
        if (!rect) {
            return;
        }
        if (hwnd === undefined) {
            const sawHandle = get(sawHandleAtom);
            hwnd = sawHandle?.hwnd;
        }
        if (hwnd) {
            sendToMain({ type: 'r2m:highlight-rect', hwnd, rect });
        }
    }
);
