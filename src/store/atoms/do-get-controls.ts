import { atom } from "jotai";
import { buildState, clientState } from "../app-state";
import { invokeMain } from "../ipc-client";
import { getSubError } from "@/utils";
import { WindowControlsCollectFinalAfterParse } from "@/electron/app/napi-calls";
import { lastBuildProgressAtom } from ".";

export const sawContentStrAtom = atom<string | undefined>('');
export const sawContentAtom = atom<WindowControlsCollectFinalAfterParse | null>(null);

export const doGetWindowControlsAtom = atom(
    null,
    async (get, set, hwnd: string | undefined): Promise<void> => {
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

            const res = await invokeMain<string>({ type: 'get-window-controls', hwnd });

            const prev = get(sawContentStrAtom);
            if (prev === res) {
                clientState.buildRunning = false;
                buildState.buildCounter = 0;
                clientState.buildError = '';
                return;
            }
            set(sawContentStrAtom, res);

            const reply = JSON.parse(res || '{}') as WindowControlsCollectFinalAfterParse;
            const final = reply.pool && reply.controls?.length ? reply : null;
            set(sawContentAtom, final);

            set(lastBuildProgressAtom, buildState.buildCounter);
            clientState.buildRunning = false;
            buildState.buildCounter = 0;
            clientState.buildError = '';

            console.log('doGetWindowControlsAtom.set', JSON.stringify(reply, null, 4));
        } catch (error) {
            set(sawContentStrAtom, '');
            set(sawContentAtom, null);

            clientState.buildRunning = false;
            buildState.buildCounter = 0;
            clientState.buildError = getSubError(error);

            set(lastBuildProgressAtom, buildState.buildCounter);

            console.error(`'doGetWindowControlsAtom' ${error instanceof Error ? error.message : `${error}`}`);
        }
    }
);

//TODO: cancel build request if application is closed by user
