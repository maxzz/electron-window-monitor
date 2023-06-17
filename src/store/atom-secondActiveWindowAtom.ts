import { atom } from "jotai";

export type SecondActiveWindow = {
    hwnd: string;       // "000000000014103E",
    caption: string;    // "ipc-invoke.ts - electron-window-monitor - Visual Studio Code",
    classname: string;  // "Chrome_WidgetWin_1",
    process: string;    // "C:\\Program Files\\Microsoft VS Code\\Code.exe"
};

export const secondActiveWindowAtom = atom<SecondActiveWindow | null>(null);
