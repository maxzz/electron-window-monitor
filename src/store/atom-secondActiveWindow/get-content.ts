import { atom } from "jotai";
import { invokeMain } from "../ipc-renderer";

/* order sent by napi plugin
export type EngineControl = {
    type: string;
    memid: number;
    topurl: string;
    parenturl: string;
    formname: string;
    path: string;
    dispname: string;
    memvalue: string;
    choosevalues: string[];
    orderid: number;
    hintfromengineuseit: boolean;
    mfillin_useunicode: boolean;
    mfillin_wrapkeystate: boolean;
};
*/

export type EngineControl = {
    type: string;
    dispname: string;
    formname: string;
    path: string;
    memvalue: string;
    choosevalues: string[];

    memid: number;
    orderid: number;

    topurl: string;
    parenturl: string;

    hintfromengineuseit: boolean;
    mfillin_useunicode: boolean;
    mfillin_wrapkeystate: boolean;
};

export type SawContentReply = {
    pool: string;
    controls: EngineControl[];
};

export const sawContentStrAtom = atom('');
export const sawContentAtom = atom<SawContentReply | null>(null);

export const doGetSawContentAtom = atom(
    null,
    async (get, set, hwnd: string | undefined): Promise<void> => {
        try {
            if (!hwnd) {
                throw new Error('No hwnd');
            }

            const res = await invokeMain<string>({ type: 'get-second-window-content', hwnd });
            const prev = get(sawContentStrAtom);
            if (prev === res) {
                return;
            }

            set(sawContentStrAtom, res);

            const obj = JSON.parse(res || '{}') as SawContentReply;

            console.log('doGetWindowContentAtom.set', JSON.stringify(obj, null, 4));

            const final = obj.pool && obj.controls?.length ? obj : null;
            set(sawContentAtom, final);
        } catch (error) {
            set(sawContentStrAtom, '');
            set(sawContentAtom, null);
            console.error(`call 'get-second-window-content' failed`);
        }
    }
);
