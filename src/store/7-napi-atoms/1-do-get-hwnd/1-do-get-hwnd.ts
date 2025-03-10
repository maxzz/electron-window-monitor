import { atom, type Getter, type Setter } from "jotai";
import { hasMain, invokeMain } from "@/shared/2-gates-in-client-as-atoms";
import { type GetTargetWindowResult } from "@/x-electron/xternal-to-renderer/7-napi-calls";
import { appSettings } from "@/store/1-atoms";
import { doGetWindowIconAtom } from "../2-do-get-icon";
import { sawContentAtom, sawContentStrAtom } from "../3-do-get-controls";
import { napiBuildStateAtom, napiLock } from "../9-napi-build-state";

export const sawHandleStrAtom = atom<string | undefined>('');
export const sawHandleAtom = atom<GetTargetWindowResult | null>(null);

export const doClearSawHandleAtom = atom(
    null,
    (get, set) => {
        set(sawHandleAtom, null);
        set(sawHandleStrAtom, '');
    }
);

export const doGetTargetHwndAtom = atom(
    null,
    async (get, set): Promise<void> => {
        // 1. Get target hwnd
        if (!napiLock.locked()) {

            hasMain()
                ? await doLiveHwnd(get, set)
                : await doTestHwnd(get, set);
            napiLock.unlock();
        }

        // 2. Update icon
        if (appSettings.monitor.iconAutoUpdate) {
            const hwnd = get(sawHandleAtom)?.hwnd;
            if (hwnd) {
                set(doGetWindowIconAtom, hwnd);
            }
        }
    }
);

async function doLiveHwnd(get: Getter, set: Setter) {
    try {
        const res = await invokeMain<string>({ type: 'r2mi:get-target-hwnd' });

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
        set(sawHandleStrAtom, '');
        set(sawHandleAtom, null);
        console.error(`'doGetTargetHwndAtom' ${error instanceof Error ? error.message : `${error}`}`);
    }
}

async function doTestHwnd(get: Getter, set: Setter) {
    // if (lastTestCreateHwnd === debugSettings.testCreate.hwnd) {
    //     return;
    // }
    // lastTestCreateHwnd = debugSettings.testCreate.hwnd;

    // const testHwnd = (await set(doLoadFakeHwndAtom, debugSettings.testCreate.hwnd)) as unknown as TestHwnd;
    // set(sawHandleStrAtom, JSON.stringify(testHwnd));
    // set(sawHandleAtom, testHwnd?.hwnd ? testHwnd.hwnd : null);
}

// let lastTestCreateHwnd: typeof debugSettings.testCreate.hwnd = 'none';


export const sawGetDisabledAtom = atom(
    (get) => {
        const { buildRunning } = get(napiBuildStateAtom);
        const secondActiveWindow = get(sawHandleAtom);
        const hwnd = secondActiveWindow?.hwnd;
        const isDisabled = !hwnd || buildRunning;
        return isDisabled;
    }
);
