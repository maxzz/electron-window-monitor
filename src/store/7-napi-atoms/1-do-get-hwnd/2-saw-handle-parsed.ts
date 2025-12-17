import { atom } from "jotai";
import { type GetTargetWindowResult } from "@/x-electron/xternal-to-renderer/7-napi-calls";
import { sawHandleStrAtom } from "./1-do-get-hwnd";

export type SawHandleParsedData = {
    raw: string;
    parsed: GetTargetWindowResult | null;
    displayContent: string;
};

export const sawHandleParsedAtom = atom<SawHandleParsedData>(
    (get) => {
        const raw = get(sawHandleStrAtom) || '';

        let parsed: GetTargetWindowResult | null = null;
        let displayContent: string;

        try {
            parsed = JSON.parse(raw);
            displayContent = JSON.stringify(parsed, null, 2);
        } catch (e) {
            displayContent = `Error parsing JSON: ${e}\n\n${raw}`;
        }

        return {
            raw,
            parsed,
            displayContent,
        };
    }
);
