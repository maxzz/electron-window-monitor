import { atom } from "jotai";
import { invokeMainTyped } from "@/shared/2-gates-in-client-as-atoms";

export const doGetGeneralInfoAtom = atom(
    null,
    async (get, set): Promise<string> => {
        const data = await invokeMainTyped({ type: 'r2mi:get-general-info' }) || '';
        if (data) {
            console.log('failed: general.info', data);
        }
        return data;
    }
);
