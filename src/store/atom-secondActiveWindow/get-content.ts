import { atom } from "jotai";

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
