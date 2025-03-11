import { atom } from "jotai";
import { invokeMain } from "@/shared/2-gates-in-client-as-atoms";
import { type WindowControlsCollectFinalAfterParse } from "@/x-electron/xternal-to-renderer/7-napi-calls";
import { type EngineControlsWithMeta } from "./9-types";
import { controlsReplyToEngineControlWithMeta } from "./2-conv-controls-meta";
import { errorToString, getSubError, splitTypedError, typedErrorToString } from "@/utils";
import { napiBuildProgress, napiBuildState } from "../9-napi-build-state";
import { setLocalState } from "./8-utils-set-state";

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

            setLocalState({ progress: 0, isRunning: true, error: undefined, failedBody: '' });

            const res = await invokeMain<string>({ type: 'r2mi:get-window-controls', hwnd });

            const prev = get(sawContentStrAtom);
            if (prev === res) {
                setLocalState({ progress: 0, isRunning: false, error: undefined });
                return;
            }
            set(sawContentStrAtom, res);

            // 2. parse reply string to get final reply

            const poolAndControls = JSON.parse(res || '{}') as WindowControlsCollectFinalAfterParse;
            const final = controlsReplyToEngineControlWithMeta(poolAndControls);

            set(sawContentAtom, final);
            setLocalState({ progress: 0, lastProgress: napiBuildProgress.buildCounter, isRunning: false, error: undefined });

            console.log('doGetWindowControlsAtom', JSON.stringify(poolAndControls, null, 4));
        } catch (error) {
            set(sawContentStrAtom, '');
            set(sawContentAtom, null);

            const typedError = splitTypedError(errorToString(error));
            setLocalState({ progress: 0, lastProgress: napiBuildProgress.buildCounter, isRunning: false, error: typedError });

            console.error(`'doGetWindowControlsAtom' ${typedErrorToString(typedError)}`);
        }
    }
);
