import { atom, type Getter, type Setter } from "jotai";
import { atomWithListeners, errorToString } from "@/utils";
import { hasMain, invokeMainTyped } from "@/shared/2-gates-in-client-as-atoms";
import { type GetTargetWindowResult } from "@/x-electron/xternal-to-renderer/7-napi-calls";
import { debugSettings } from "@/store/1-atoms";
import { doGetWindowIconAtom } from "../2-do-get-icon";
import { sawContentAtom, sawContentStrAtom } from "../3-do-get-controls";
import { doLoadFakeHwndAtom, type TestHwnd } from "../8-create-mani-tests-w-fetch";
import { napiBuildStateAtom, napiLock } from "../9-napi-build-state";

export const sawHandleStrAtom = atom<string | undefined>('');
export const [sawHandleAtom, useSawHandleListener] = atomWithListeners<GetTargetWindowResult | null>(null);

export const doGetTargetHwndAtom = atom(
    null,
    async (get, set): Promise<void> => {
        // 1. Get target hwnd
        if (!napiLock.locked('hwnd')) {

            hasMain()
                ? await doLiveHwnd(get, set)
                : await doTestHwnd(get, set);

            // 2. Update icon
            if (debugSettings.uiState.iconAutoUpdate) {
                set(doGetWindowIconAtom, get(sawHandleAtom)?.hwnd);
            }

            napiLock.unlock();
        }
    }
);

async function doLiveHwnd(get: Getter, set: Setter) {
    try {
        const res = await invokeMainTyped({ type: 'r2mi:get-target-hwnd' });

        const prev = get(sawHandleStrAtom);
        if (prev === res) {
            return;
        }
        set(sawHandleStrAtom, res);

        set(sawContentStrAtom, undefined);
        set(sawContentAtom, null);

        const obj = JSON.parse(res || '{}') as GetTargetWindowResult;
        set(sawHandleAtom, obj);
    } catch (error) {
        set(doClearSawHandleAtom);
        console.error(`'doGetTargetHwndAtom' ${errorToString(error)}`);
    }
}

async function doTestHwnd(get: Getter, set: Setter) {
    // if (lastTestCreateHwnd === debugSettings.testCreate.hwnd) {
    //     return;
    // }
    // lastTestCreateHwnd = debugSettings.testCreate.hwnd;

    const testHwnd = (await set(doLoadFakeHwndAtom, debugSettings.testCreate.hwnd)) as unknown as TestHwnd;
    set(sawHandleStrAtom, JSON.stringify(testHwnd));
    set(sawHandleAtom, testHwnd?.hwnd ? testHwnd.hwnd : null);
}

// let lastTestCreateHwnd: typeof debugSettings.testCreate.hwnd = 'none';

export const doClearSawHandleAtom = atom(
    null,
    (get, set) => {
        set(sawHandleAtom, null);
        set(sawHandleStrAtom, '');
    }
);

//

export const sawGetDisabledAtom = atom(
    (get) => {
        const { buildRunning } = get(napiBuildStateAtom);
        const secondActiveWindow = get(sawHandleAtom);
        const hwnd = secondActiveWindow?.hwnd;
        const isDisabled = !hwnd || buildRunning;
        return isDisabled;
    }
);
