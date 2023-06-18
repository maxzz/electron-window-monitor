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

export const sawContentStrAtom = atom<string | null>(null);
export const sawContentAtom = atom<SawContentReply | null>(null);

export const doGetWindowContentAtom = atom(
    null,
    async (get, set, hwnd: string | undefined): Promise<void> => {
        if (!hwnd) {
            throw new Error('No hwnd');
        }

        const res = await invokeMain<string>({ type: 'get-second-window-content', hwnd });
        set(sawContentStrAtom, res);

        const obj = JSON.parse(res || '{}');
        console.log('doGetWindowContentAtom.set', obj);
    }
);
