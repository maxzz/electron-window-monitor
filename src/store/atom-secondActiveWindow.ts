import { atom } from "jotai";

// SAW - Second Active Window

export type SecondActiveWindowReply = {
    hwnd: string;       // "000000000014103E",
    caption: string;    // "ipc-invoke.ts - electron-window-monitor - Visual Studio Code",
    classname: string;  // "Chrome_WidgetWin_1",
    process: string;    // "C:\\Program Files\\Microsoft VS Code\\Code.exe"
};

export const secondActiveWindowAtom = atom<SecondActiveWindowReply | null>(null);

/* order sent by napi plugin
export type EngineControl = {
    type: string;
    memid: number;
    topurl: string;
    parenturl: string;
    formname: string;
    path: string;
    dispname: string;
    memvalue: string;
    choosevalues: string[];
    orderid: number;
    hintfromengineuseit: boolean;
    mfillin_useunicode: boolean;
    mfillin_wrapkeystate: boolean;
};
*/

export type EngineControl = {
    type: string;
    dispname: string;
    formname: string;
    path: string;
    memvalue: string;
    choosevalues: string[];

    memid: number;
    orderid: number;

    topurl: string;
    parenturl: string;

    hintfromengineuseit: boolean;
    mfillin_useunicode: boolean;
    mfillin_wrapkeystate: boolean;
};

export type SawContentReply = {
    pool: string;
    controls: EngineControl[];
};

export const sawContentStrAtom = atom<string | null>(null);
export const sawContentAtom = atom<SawContentReply | null>(null);

//

export const isMonitoringAtom = atom(false);

export const doMonitoringAtom = atom(null,
    (get, set, doStart: boolean) => {
        const isMonitoring = get(isMonitoringAtom);

        if (isMonitoring) {
            if (!doStart) {
                set(isMonitoringAtom, false);
            }
        } else {
            if (doStart) {
                set(isMonitoringAtom, true);
            }
        }
    }
);