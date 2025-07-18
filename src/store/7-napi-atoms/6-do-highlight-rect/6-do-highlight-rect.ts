import { atom } from "jotai";
import { R2MCalls } from "@/shared/2-gates-in-client-as-atoms";
import { type Rect4 } from "@/x-electron/xternal-to-renderer/7-napi-calls";
import { sawHandleAtom } from "../1-do-get-hwnd";

export const doHighlightRectAtom = atom(
    null,
    (get, set, { hwnd, rect }: { hwnd?: string, rect: Rect4 | undefined; }) => {
        if (!rect) {
            return;
        }

        if (hwnd === undefined) {
            const sawHandle = get(sawHandleAtom);
            hwnd = sawHandle?.hwnd;
        }
        
        if (hwnd) {
            R2MCalls.highlightRect({ hwnd, rect });
        }
    }
);
