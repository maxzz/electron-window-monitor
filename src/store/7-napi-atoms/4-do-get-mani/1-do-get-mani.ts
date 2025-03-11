import { atom, type Getter, type Setter } from "jotai";
import { hasMain, invokeMain } from "@/shared/2-gates-in-client-as-atoms";
import { type WindowControlsCollectResult } from "@/x-electron/xternal-to-renderer/7-napi-calls";
import { napiBuildProgress, napiBuildState } from "../9-napi-build-state";
import { debugSettings, doLoadFakeManiAtom } from "@/store/1-atoms";
import { setLocalState } from "../3-do-get-controls";
import { errorToString, splitTypedError, typedErrorToString } from "@/utils";

export const sawManiStrAtom = atom<string | undefined>('');                 // raw unprocessed reply string from napi to compare with current
export const sawManiXmlAtom = atom<string | undefined>(undefined);          // raw xml string from napi if called with wantXml
export const sawManiAtom = atom<WindowControlsCollectResult | null>(null);   // reply with controls and pool

export const doGetWindowManiAtom = atom(
    null,
    async (get, set, params: { hwnd: string | undefined; wantXml: boolean; }): Promise<void> => {
        if (hasMain()) {
            await doLiveMani(params, get, set);
        } else {
            await doTestMani(params, get, set);
        }
    }
);

async function doLiveMani({ hwnd, wantXml }: { hwnd: string | undefined; wantXml: boolean; }, get: Getter, set: Setter) {
    try {
        if (!hwnd) {
            throw new Error('No hwnd');
        }

        if (napiBuildState.buildRunning) {
            return;
        }

        // 1. call napi to get raw reply string

        setLocalState({ progress: 0, lastProgress: 0, isRunning: true, error: undefined, failedBody: '' });

        const res = await invokeMain<string>({ type: 'r2mi:get-window-mani', hwnd, wantXml });

        const prev = get(sawManiStrAtom);
        if (prev === res) {
            setLocalState({ progress: 0, isRunning: false, error: undefined });
            return;
        }
        set(sawManiStrAtom, res);

        // 2. parse reply string to get final reply

        if (wantXml) {
            set(sawManiXmlAtom, res);

            console.log(`doGetWindowManiXmlAtom.set\n${res}`);
        } else {
            const reply = JSON.parse(res || '{}') as WindowControlsCollectResult;
            const final = reply.pool && reply.controls?.length ? reply : null;
            set(sawManiAtom, final);

            console.log('doGetWindowManiAtom.set', JSON.stringify(reply, null, 4));
        }

        setLocalState({ progress: 0, lastProgress: napiBuildProgress.buildCounter, isRunning: false, error: undefined });
    } catch (error) {
        set(sawManiStrAtom, '');
        set(sawManiAtom, null);

        const typedError = splitTypedError(errorToString(error));
        setLocalState({ progress: 0, isRunning: false, error: typedError });

        console.error(`'doGetWindowManiAtom' ${typedErrorToString(typedError)}`);
    }
}

async function doTestMani({ hwnd, wantXml }: { hwnd: string | undefined; wantXml: boolean; }, get: Getter, set: Setter) {
    const mani = await set(doLoadFakeManiAtom, debugSettings.testCreate.mani);
    set(sawManiXmlAtom, mani);
}
