import { atom } from "jotai";
import { type PerformCommandParams } from "@/x-electron/xternal-to-renderer/7-napi-calls/pmat-plugin-types";
import { invokeMainTyped } from "@/shared/2-gates-in-client-as-atoms";

export const doPerformCommandAtom = atom(
    null,
    async (get, set, params: PerformCommandParams): Promise<string> => {
        const data = await invokeMainTyped({ type: 'r2mi:perform-command', params }) || '';
        if (data) {
            console.log('failed: perform.command', data);
        }
        return data;
    }
);
