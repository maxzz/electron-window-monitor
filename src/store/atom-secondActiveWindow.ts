import { atom } from "jotai";

export type SecondActiveWindowReply = {
    hwnd: string;       // "000000000014103E",
    caption: string;    // "ipc-invoke.ts - electron-window-monitor - Visual Studio Code",
    classname: string;  // "Chrome_WidgetWin_1",
    process: string;    // "C:\\Program Files\\Microsoft VS Code\\Code.exe"
};

export const secondActiveWindowAtom = atom<SecondActiveWindowReply | null>(null);

export const secondActiveContentAtom = atom<string | null>(null);
