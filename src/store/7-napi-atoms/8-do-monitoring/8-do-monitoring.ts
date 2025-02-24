import { useCallback, useEffect } from "react";
import { atom, useAtom, useAtomValue } from "jotai";

export const isMonitoringAtom = atom(
    (get) => get(_isMonitoringAtom),
    (get, set, { doStart, callback }: { doStart: boolean, callback?: Function; }) => {
        const isMonitoring = get(_isMonitoringAtom);

        if (isMonitoring) {
            if (!doStart) {
                set(_isMonitoringAtom, false);
                set(monitorCounterAtom, -1);

                if (monitorTimerId) {
                    clearTimeout(monitorTimerId);
                    monitorTimerId = undefined;
                }
            }
        } else {
            if (doStart) {
                set(_isMonitoringAtom, true);

                if (monitorTimerId) {
                    clearTimeout(monitorTimerId);
                    monitorTimerId = undefined;
                }

                function runTimeout() {
                    callback?.();

                    set(monitorCounterAtom, get(monitorCounterAtom) + 1);
                    monitorTimerId = setTimeout(runTimeout, 1000);
                }

                set(monitorCounterAtom, 1);
                monitorTimerId = setTimeout(runTimeout, 1000);
            }
        }
    }
);

export const monitorCounterAtom = atom(-1); // How many seconds passed since the start of monitoring

const _isMonitoringAtom = atom(false);

let monitorTimerId: ReturnType<typeof setTimeout> | undefined;

export function useMonitoring(callback: () => void) {
    const [isMonitoring, setIsMonitoring] = useAtom(isMonitoringAtom);

    useEffect(
        () => {
            return () => {
                if (monitorTimerId) {
                    clearTimeout(monitorTimerId);
                    monitorTimerId = undefined;
                }
            };
        }, [isMonitoring]
    );

    const start = useCallback(
        async function sendRequest() {
            setIsMonitoring({ doStart: !isMonitoring, callback });
        }, [isMonitoring, callback]
    );

    return [isMonitoring, start] as const;
}
