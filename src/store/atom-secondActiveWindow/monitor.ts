import { atom } from "jotai";

let monitorTimerId: ReturnType<typeof setTimeout> | undefined;

const _isMonitoringAtom = atom(false);

export const doMonitoringAtom = atom(
    (get) => get(_isMonitoringAtom),
    (get, set, {doStart, callback}: {doStart: boolean, callback: Function}) => {
        const isMonitoring = get(_isMonitoringAtom);

        if (isMonitoring) {
            if (!doStart) {
                set(_isMonitoringAtom, false);
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
                    callback();
                    monitorTimerId = setTimeout(runTimeout, 1000);
                }
                monitorTimerId = setTimeout(runTimeout, 1000);
            }
        }
    }
);
