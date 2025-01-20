import { atom } from "jotai";
import { sendToMain } from "@/shared/ipc-client";
import { type TargetClientRect } from "@/electron/app/napi-calls";
import { sawHandleAtom } from "./1-do-get-hwnd";

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
            sendToMain({ type: 'highlight-rect', hwnd, rect });
        }
    }
);
