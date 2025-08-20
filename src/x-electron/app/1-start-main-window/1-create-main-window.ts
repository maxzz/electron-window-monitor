import path from "node:path";
import { app, shell } from "electron";
import { appWindow } from "./8-app-window-instance";
import { iniFileOptions } from "./8-ini-file-options";
import { initMainWindow } from "./2-init-main-window";

export async function createWindow() {
    appWindow.wnd = initMainWindow();

    appWindow.wnd.once('ready-to-show', () => {
        if (iniFileOptions.options?.devTools && !appWindow.wnd?.webContents.isDevToolsOpened()) {
            appWindow.wnd?.webContents.toggleDevTools();
        }
        appWindow.wnd?.show();
    });

    appWindow.wnd.on('close', () => {
        iniFileOptions.save(appWindow.wnd);
    });

    appWindow.wnd.webContents.setWindowOpenHandler(({ url }) => { // Make all links open with the browser, not with the application
        if (url.startsWith('https:')) {
            shell.openExternal(url);
        }
        return { action: 'deny' };
    });

    appWindow.wnd.webContents.on('did-finish-load', () => {
        appWindow.wnd?.webContents.send('main-process-message', (new Date).toLocaleString()); // Test active push message to Renderer-process.
    });
}

export function connect_MainWindowListeners() {
    app.on('window-all-closed', () => {
        appWindow.wnd = null;
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
}
