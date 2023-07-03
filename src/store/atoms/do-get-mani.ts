import { atom } from "jotai";
import { invokeMain } from "../ipc-client";
import { buildState, clientState } from "../app-state";
import { EngineControl } from "@/electron/app/napi-calls";
import { getSubError } from "@/utils";

type SawContentReply = {
    pool: string;
    controls: EngineControl[];
};

export const sawManiStrAtom = atom<string | undefined>('');
export const sawManiAtom = atom<SawContentReply | null>(null);

export const doGetWindowManiAtom = atom(
    null,
    async (get, set, {hwnd, wantXml}: {hwnd: string | undefined; wantXml: boolean}): Promise<void> => {
        try {
            if (!hwnd) {
                throw new Error('No hwnd');
            }

            if (clientState.buildRunning) {
                return;
            }

            clientState.buildRunning = true;
            buildState.buildCounter = 0;
            clientState.buildError = '';
            clientState.buildFailedBody = '';

            const res = await invokeMain<string>({ type: 'get-window-mani', hwnd, wantXml });

            const prev = get(sawManiStrAtom);
            if (prev === res) {
                clientState.buildRunning = false;
                buildState.buildCounter = 0;
                clientState.buildError = '';
                return;
            }
            set(sawManiStrAtom, res);

            const reply = JSON.parse(res || '{}') as SawContentReply;
            const final = reply.pool && reply.controls?.length ? reply : null;
            set(sawManiAtom, final);

            clientState.buildRunning = false;
            buildState.buildCounter = 0;
            clientState.buildError = '';

            console.log('doGetWindowManiAtom.set', JSON.stringify(reply, null, 4));
        } catch (error) {
            set(sawManiStrAtom, '');
            set(sawManiAtom, null);

            clientState.buildRunning = false;
            buildState.buildCounter = 0;
            clientState.buildError = getSubError(error);

            console.error(`'doGetWindowManiAtom' ${error instanceof Error ? error.message : `${error}`}`);
        }
    }
);

//TODO: cancel build request if app is closed by user
