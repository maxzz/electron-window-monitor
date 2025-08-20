import { useCallback, useEffect } from "react";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { napiLock } from "../9-napi-build-state";
import { doGetTargetHwndAtom, sawHandleAtom } from "../1-do-get-hwnd";
import { doGetWindowIconAtom } from "../2-do-get-icon";

export const isMonitorRunningAtom = atom((get) => get(_isMonitoringTimerAtom));
// export const startMonitorTimerAtom = atom(null, async (get, set) => set(doMonitoringTimerAtom, { doStart: true }));
export const stopMonitorTimerAtom = atom(null, async (get, set) => set(doMonitoringTimerAtom, { doStart: false }));

const doMonitoringTimerAtom = atom(
    (get) => null,
    (get, set, { doStart, callback }: { doStart: boolean, callback?: Function; }) => {
        const isMonitoring = get(_isMonitoringTimerAtom);

        if (isMonitoring) {
            if (doStart) {
                return;
            }

            set(_isMonitoringTimerAtom, false);
            set(_monitorCounterAtom, -1);
            timeoutId.clear();
        } else {
            if (!doStart) {
                return;
            }

            set(_isMonitoringTimerAtom, true);
            timeoutId.clear();

            set(_monitorCounterAtom, 1);
            timeoutId.id = setTimeout(runTimeout, 1000 / timesPerSecond);

            function runTimeout() {
                callback?.();
                set(_monitorCounterAtom, get(_monitorCounterAtom) + 1);
                timeoutId.id = setTimeout(runTimeout, 1000 / timesPerSecond);
            }
        }
    }
);

const _isMonitoringTimerAtom = atom(false);

const timeoutId = {
    id: undefined as undefined | ReturnType<typeof setTimeout>,
    clear() {
        if (this.id) {
            clearTimeout(this.id);
            this.id = undefined;
        }
    }
};

const _monitorCounterAtom = atom(-1); // How many seconds passed since the start of monitoring

const timesPerSecond = 2;

export const secondsCounterAtom = atom(
    (get) => Math.ceil(get(_monitorCounterAtom) / timesPerSecond)
);

/**
 * Combines monitoring atom and clearing timeout on unmount
 */
export function useMonitoring(callback?: () => void) {
    const isMonitoring = useAtomValue(isMonitorRunningAtom);
    const doMonitoring = useSetAtom(doMonitoringTimerAtom);

    useEffect(
        () => {
            if (isMonitoring) {
                return () => {
                    timeoutId.clear();
                };
            }
        }, [isMonitoring]
    );

    const toggleStartStop = useCallback(
        async function sendRequest() {
            doMonitoring({ doStart: !isMonitoring, callback });
        }, [isMonitoring, callback]
    );

    return [isMonitoring, toggleStartStop] as const;
}

// Update hwnd and icon

export const doUpdateHwndAndIconAtom = atom(
    null,
    async (get, set) => {
        if (!napiLock.isLocked) { // Avoid attempt to get hwnd by timer when napi is locked
            await set(doGetTargetHwndAtom);
            const sawHandle = get(sawHandleAtom);
            //set(doGetWindowIconAtom, sawHandle?.hwnd);
        }
    }
);
