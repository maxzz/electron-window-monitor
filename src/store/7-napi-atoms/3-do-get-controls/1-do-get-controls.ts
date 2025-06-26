import { atom } from "jotai";
import { errorToString } from "@/utils";
import { invokeMainTyped } from "@/shared/2-gates-in-client-as-atoms";
import { type WindowControlsCollectFinalAfterParse } from "@/x-electron/xternal-to-renderer/7-napi-calls";
import { type EngineControlsWithMeta } from "./9-types";
import { controlsReplyToEngineControlWithMeta } from "./2-conv-controls-meta";
import { napiBuildProgress, napiBuildState, setBuildState, splitTypedError, typedErrorToString } from "../9-napi-build-state";

export const sawContentStrAtom = atom<string | undefined>('');
export const sawContentAtom = atom<EngineControlsWithMeta | null>(null);

export const doGetWindowControlsAtom = atom(
    null,
    async (get, set, hwnd: string | undefined): Promise<void> => {
        try {
            if (!hwnd) {
                throw new Error('No hwnd');
            }

            if (napiBuildState.buildRunning) {
                return;
            }

            // 1. call napi to get raw reply string

            setBuildState({ progress: 0, isRunning: true, error: '', failedBody: '' });

            const res = await invokeMainTyped<string>({ type: 'r2mi:get-window-controls', hwnd });

            const prev = get(sawContentStrAtom);
            if (prev === res) {
                setBuildState({ progress: 0, isRunning: false, error: '' });
                return;
            }
            set(sawContentStrAtom, res);

            // 2. parse reply string to get final reply

            const poolAndControls = JSON.parse(res || '{}') as WindowControlsCollectFinalAfterParse;
            const final = controlsReplyToEngineControlWithMeta(poolAndControls);

            set(sawContentAtom, final);
            setBuildState({ progress: 0, lastProgress: napiBuildProgress.buildCounter, isRunning: false, error: '' });

            printControlsData(poolAndControls);
        } catch (error) {
            set(doClearWindowControlsAtom);

            const msg = errorToString(error);
            setBuildState({ progress: 0, lastProgress: napiBuildProgress.buildCounter, isRunning: false, error: msg });
            console.error(`'doGetWindowControlsAtom' ${typedErrorToString(splitTypedError(msg))}`);
        }
    }
);

const doClearWindowControlsAtom = atom(
    null,
    (get, set) => {
        set(sawContentStrAtom, '');
        set(sawContentAtom, null);
    }
);

/**
 * Print hwnd and icon in format that can be used in tests.
 */
function printControlsData(poolAndControls: WindowControlsCollectFinalAfterParse) {
    console.log('doGetWindowControlsAtom', JSON.stringify(poolAndControls, null, 4));
}
