import path from 'node:path';
import { BrowserWindow, app } from "electron";

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];

let winApp: BrowserWindow | null;

export async function createWindow() {
    winApp = new BrowserWindow({
        icon: path.join(process.env.PUBLIC, 'electron-vite.svg'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    // Test active push message to Renderer-process.
    winApp.webContents.on('did-finish-load', () => {
        winApp?.webContents.send('main-process-message', (new Date).toLocaleString());
    });

    if (VITE_DEV_SERVER_URL) {
        winApp.loadURL(VITE_DEV_SERVER_URL);
    } else {
        // win.loadFile('dist/index.html')
        winApp.loadFile(path.join(process.env.DIST, 'index.html'));
    }

    // const res = await getTargetWindow({});
    // console.log('res', res);

}

export function connect_MainWindowListeners() {
    app.on('window-all-closed', () => {
        winApp = null;
        if (process.platform !== 'darwin') { app.quit(); }
    });
}

export function connect_ListenersForCallFromRenderer() {
}