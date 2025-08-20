import path from "node:path";
import { BrowserWindow, app, shell } from "electron";
import { loadIniFileOptions, saveIniFileOptions } from "./8-ini-file-options";
import { appWindow } from "./8-app-window-instance";

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];

export async function createWindow() {
    const iniFileOptions = loadIniFileOptions();
    const preloadPath = path.join(__dirname, 'preload.js');

    //console.log('__dirname', __dirname);

    appWindow.wnd = new BrowserWindow({
        title: 'PMAT Monitor',
        ...(iniFileOptions?.bounds),
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
        appWindow.wnd.loadURL(VITE_DEV_SERVER_URL);
    } else {
        appWindow.wnd.loadFile(path.join(process.env.DIST, 'index.html'));
    }

    appWindow.wnd.once('ready-to-show', () => {
        if (iniFileOptions?.devTools && !appWindow.wnd?.webContents.isDevToolsOpened()) {
            appWindow.wnd?.webContents.toggleDevTools();
        }
        appWindow.wnd?.show();
    });

    appWindow.wnd.on('close', () => {
        appWindow.wnd && saveIniFileOptions(appWindow.wnd);
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
