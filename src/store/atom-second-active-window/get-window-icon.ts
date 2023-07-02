import { atom } from "jotai";
import { invokeMain } from "../ipc-client";
import { clientState } from "../app-state";
import { getSubError } from "@/utils";

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

export const sawContentStrAtom = atom<string | undefined>('');
export const sawContentAtom = atom<SawContentReply | null>(null);

export const doGetSawIconAtom = atom(
    null,
    async (get, set, hwnd: string | undefined): Promise<void> => {
        try {
            if (!hwnd) {
                throw new Error('No hwnd');
            }

            const res = await invokeMain<string>({ type: 'get-second-window-icon', hwnd });

            set(sawContentStrAtom, res);

            const reply = JSON.parse(res || '{}') as SawContentReply;
            const final = reply.pool && reply.controls?.length ? reply : null;
            set(sawContentAtom, final);

            clientState.buildRunning = false;
            clientState.buildCounter = 0;
            clientState.buildError = '';

            console.log('doGetWindowContentAtom.set', JSON.stringify(reply, null, 4));
        } catch (error) {
            set(sawContentStrAtom, '');
            set(sawContentAtom, null);

            clientState.buildRunning = false;
            clientState.buildCounter = 0;
            clientState.buildError = getSubError(error);

            console.error(`'get-saw-content' ${error instanceof Error ? error.message : `${error}`}`);
        }
    }
);

//TODO: cancel build request if app is closed by user
