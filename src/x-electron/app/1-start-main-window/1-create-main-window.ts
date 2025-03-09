import path from "node:path";
import { BrowserWindow, app, shell } from "electron";
import { loadIniFileOptions, saveIniFileOptions } from "./8-ini-file-options";

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];

export let winApp: BrowserWindow | null;

export async function createWindow() {
    const iniFileOptions = loadIniFileOptions();
    const preloadPath = path.join(__dirname, 'preload.js');

    //console.log('__dirname', __dirname);

    winApp = new BrowserWindow({
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
        winApp.loadURL(VITE_DEV_SERVER_URL);
    } else {
        winApp.loadFile(path.join(process.env.DIST, 'index.html'));
    }

    winApp.once('ready-to-show', () => {
        if (iniFileOptions?.devTools && !winApp?.webContents.isDevToolsOpened()) {
            winApp?.webContents.toggleDevTools();
        }
        winApp?.show();
    });

    winApp.on('close', () => {
        winApp && saveIniFileOptions(winApp);
    });

    winApp.webContents.setWindowOpenHandler(({ url }) => { // Make all links open with the browser, not with the application
        if (url.startsWith('https:')) {
            shell.openExternal(url);
        }
        return { action: 'deny' };
    });

    winApp.webContents.on('did-finish-load', () => {
        winApp?.webContents.send('main-process-message', (new Date).toLocaleString()); // Test active push message to Renderer-process.
    });
}

export function connect_MainWindowListeners() {
    app.on('window-all-closed', () => {
        winApp = null;
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
}
