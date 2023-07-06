import { TargetClientRect } from "@/electron/app/napi-calls";
import { atom } from "jotai";
import { sendToMain } from "..";

export const doHighlightRectAtom = atom(
    null,
    (get, set, { hwnd, rect }: { hwnd: string, rect: TargetClientRect; }) => {
        sendToMain({ type: 'highlight-rect', hwnd, rect });
    }
);
