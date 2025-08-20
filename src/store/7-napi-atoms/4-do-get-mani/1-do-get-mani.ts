import { atom } from "jotai";
import { errorToString } from "@/utils";
import { hasMain, invokeMainTyped } from "@/shared/2-gates-in-client-as-atoms";
import { type ManifestForWindowCreatorParams, type WindowControlsCollectResult } from "@/x-electron/xternal-to-renderer/7-napi-calls";
import { napiBuildProgress, napiBuildState, napiLock, setBuildState, splitTypedError, typedErrorToString } from "../9-napi-build-state";
import { debugSettings, doLoadFakeManiAtom } from "@/store/1-atoms";

export const maniXmlStrAtom = atom<string | undefined>(undefined);          // raw unprocessed reply string from napi to compare with current
const sawManiAtom = atom<WindowControlsCollectResult | null>(null);         // reply with controls and pool

export const doGetWindowManiAtom = atom(
    null,
    async (get, set, params: ManifestForWindowCreatorParams): Promise<void> => {
        if (napiLock.locked('mani')) {
            return;
        }

        if (hasMain()) {
            await doLiveMani(params, get, set);
        } else {
            await doTestMani(params, get, set);
        }

        napiLock.unlock();
    }
);

async function doLiveMani(params: ManifestForWindowCreatorParams, get: Getter, set: Setter) {
    try {
        if (!params.hwnd) {
            throw new Error('No hwnd');
        }

        if (napiBuildState.buildRunning) {
            return;
        }

        // 1. call napi to get raw reply string

        setBuildState({ progress: 0, lastProgress: 0, isRunning: true, error: '', failedBody: '' });

        const res = await invokeMainTyped({ type: 'r2mi:get-window-mani', params });

        const prev = get(maniXmlStrAtom);
        if (prev === res) {
            setBuildState({ progress: 0, isRunning: false, error: '' });
            return;
        }
        set(maniXmlStrAtom, res);
        //printStrResultData(res);

        // 2. parse reply string to get final reply

        if (!params.wantXml) {
            const reply = JSON.parse(res || '{}') as WindowControlsCollectResult;
            const final = reply.pool && reply.controls?.length ? reply : null;
            set(sawManiAtom, final);
            //printControlsResultData(reply);
        }

        setBuildState({ progress: 0, lastProgress: napiBuildProgress.buildCounter, isRunning: false, error: '' });
    } catch (error) {
        set(doClearManiAtom);

        const msg = errorToString(error);
        setBuildState({ progress: 0, isRunning: false, error: msg });
        console.error(`'doGetWindowManiAtom' ${typedErrorToString(splitTypedError(msg))}`);
    }
}

async function doTestMani({ hwnd, wantXml }: ManifestForWindowCreatorParams, get: Getter, set: Setter) {
    const mani = await set(doLoadFakeManiAtom, debugSettings.testCreate.mani);
    set(maniXmlStrAtom, mani);
}

const doClearManiAtom = atom(
    null,
    (get, set) => {
        set(maniXmlStrAtom, undefined);
        set(sawManiAtom, null);
    }
);

//

function printStrResultData(res: string | undefined) {
    console.log(`doGetWindowManiXmlAtom\n${res}`);
}

function printControlsResultData(reply: WindowControlsCollectResult) {
    console.log('doGetWindowManiAtom.set', JSON.stringify(reply, null, 4));
}
