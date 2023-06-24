import { atom } from "jotai";
import { invokeMain } from "../ipc-client";
import { clientState } from "../app-state";
import { getSubError } from "@/utils";

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

export const sawContentStrAtom = atom<string | undefined>('');
export const sawContentAtom = atom<SawContentReply | null>(null);

export const doGetSawContentAtom = atom(
    null,
    async (get, set, hwnd: string | undefined): Promise<void> => {
        try {
            if (!hwnd) {
                throw new Error('No hwnd');
            }

            clientState.clearBuildResults();
            clientState.buildFailedBody = '';

            const res = await invokeMain<string>({ type: 'get-second-window-content', hwnd });
            
            const prev = get(sawContentStrAtom);
            if (prev === res) {
                clientState.clearBuildResults();
                return;
            }
            set(sawContentStrAtom, res);

            const reply = JSON.parse(res || '{}') as SawContentReply;
            const final = reply.pool && reply.controls?.length ? reply : null;
            set(sawContentAtom, final);

            clientState.clearBuildResults();

            console.log('doGetWindowContentAtom.set', JSON.stringify(reply, null, 4));
        } catch (error) {
            set(sawContentStrAtom, '');
            set(sawContentAtom, null);

            clientState.buildCounter = 0;
            clientState.buildError = getSubError(error);

            console.error(`'get-saw-content' ${error instanceof Error ? error.message : `${error}`}`);
        }
    }
);

//TODO: cancel build request if app is closed by user
