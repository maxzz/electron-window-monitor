import { atom } from "jotai";
import { invokeMain } from "@/shared/ipc-client";
import { buildState, clientState } from "../../app-state";
import { lastBuildProgressAtom } from "../1-do-get-hwnd";
import { type WindowControlsCollectFinalAfterParse } from "@/electron/xternal-to-renderer/napi-calls";
import { type EngineControlsWithMeta, controlsReplyToEngineControlWithMeta } from "./controls-meta";
import { getSubError } from "@/utils";

export const sawContentStrAtom = atom<string | undefined>('');
export const sawContentAtom = atom<EngineControlsWithMeta | null>(null);

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
            const final = controlsReplyToEngineControlWithMeta(reply);

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
