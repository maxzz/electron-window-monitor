import { useCallback, useEffect } from "react";
import { atom, useAtom, useAtomValue } from "jotai";

export const isMonitoringAtom = atom(
    (get) => get(_isMonitoringAtom),
    (get, set, { doStart, callback }: { doStart: boolean, callback?: Function; }) => {
        const isMonitoring = get(_isMonitoringAtom);

        console.log(`%c==== isMonitoringAtom: set(${doStart}) isMonitoring`, isMonitoring ? 'green' : 'orange', isMonitoring);

        if (isMonitoring) {
            if (!doStart) {
                set(_isMonitoringAtom, false);
                set(monitorCounterAtom, -1);

                timerId.clear();
                // if (monitorTimerId) {
                //     clearTimeout(monitorTimerId);
                //     monitorTimerId = undefined;
                // }
            }
        } else {
            if (doStart) {
                set(_isMonitoringAtom, true);

                timerId.clear();
                // if (monitorTimerId) {
                //     clearTimeout(monitorTimerId);
                //     monitorTimerId = undefined;
                // }

                function runTimeout() {
                    callback?.();

                    set(monitorCounterAtom, get(monitorCounterAtom) + 1);
                    timerId.id = setTimeout(runTimeout, 1000);
                }

                set(monitorCounterAtom, 1);
                timerId.id = setTimeout(runTimeout, 1000);
            }
        }
    }
);

export const monitorCounterAtom = atom(-1); // How many seconds passed since the start of monitoring

const _isMonitoringAtom = atom(false);

const timerId = {
    id: undefined as undefined | ReturnType<typeof setTimeout>,
    clear() {
        console.log('---- timerId. intended clear id', timerId.id);
        if (timerId.id) {
            console.log('---- timerId.clear id', timerId.id);
            clearTimeout(timerId.id);
            timerId.id = undefined;
        }
    }
};

// let monitorTimerId: ReturnType<typeof setTimeout> | undefined;

export function useMonitoring(callback: () => void) {
    const [isMonitoring, setIsMonitoring] = useAtom(isMonitoringAtom);

    useEffect(
        () => {
            console.log('useMonitoring.useEffect: isMonitoring', isMonitoring);

            if (isMonitoring) {
                return () => {
                    timerId.clear();
                    // if (monitorTimerId) {
                    //     clearTimeout(monitorTimerId);
                    //     monitorTimerId = undefined;
                    // }
                };
            }
        }, [isMonitoring]
    );

    const startStop = useCallback(
        async function sendRequest() {
            console.log(`---- useMonitoring.start/stop(${!isMonitoring}) isMonitoring=${isMonitoring}`);

            setIsMonitoring({ doStart: !isMonitoring, callback });
        }, [isMonitoring, callback]
    );

    return [isMonitoring, startStop] as const;
}
