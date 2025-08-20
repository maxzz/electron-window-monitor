import path from "node:path";
import { BrowserWindow } from "electron";
import icon from "../../../../resources/icon.png?asset"; // This is only for linux
import { iniFileOptions } from "./8-ini-file-options";

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];

const preloadPath = path.join(__dirname, 'preload.js');

export function initMainWindow(): BrowserWindow {
    const rv = new BrowserWindow({
        title: 'PMAT Monitor',
        ...(iniFileOptions.options?.bounds),
        show: false,
        icon: path.join(process.env.PUBLIC, 'electron-vite.svg'),
        webPreferences: {
            preload: preloadPath,
            nodeIntegration: false, //https://www.electronjs.org/docs/latest/tutorial/security process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
            contextIsolation: true, //https://www.electronjs.org/docs/latest/tutorial/context-isolation
            //...(iniOptions?.devTools && { devTools: iniOptions.devTools }) enable during runtime
        },
    });

    if (VITE_DEV_SERVER_URL) {
        rv.loadURL(VITE_DEV_SERVER_URL);
    } else {
        rv.loadFile(path.join(process.env.DIST, 'index.html'));
    }

    return rv;
}
