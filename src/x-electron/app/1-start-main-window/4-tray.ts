import path from "node:path";
import { app, nativeImage, nativeTheme, Tray } from "electron";
import { appWindow } from "./7-app-window-instance";
import { log } from "node:console";

//import TrayIconDarkWin from '../../resources/trayDark.ico?asset';
import TrayIconDarkWin from '../../../assets/icons/icon.png?asset';
// import TrayIconDarkWin from '../../../assets/icons/favicon.svg?asset';
//import TrayIconDarkWin from '../../../assets/icons/favicon.ico?asset';
log('----------TrayIconDarkWin', TrayIconDarkWin);

const isDarkMode = nativeTheme.shouldUseDarkColors;
//log('----------isDarkMode', isDarkMode);

export function createTray() {
    // Create the tray icon
    // const tray = new Tray(path.join(app.getAppPath(), 'resources', 'icon.png'));
    //const tray = new Tray(TrayIconDarkWin);

    // const img: Electron.NativeImage = nativeTheme.trayIcon.resize({ width: 16, height: 16 });
    const img: Electron.NativeImage = nativeImage.createFromDataURL(TrayIconDarkWin);

    const tray = new Tray(img);

    // Set the context menu for the tray icon
    tray.setToolTip('Win-Mon');
    //tray.setContextMenu(contextMenu);

    // Show the tray icon
    tray.on('click', () => {
        if (appWindow.wnd?.isVisible()) {
            appWindow.wnd.hide();
        } else {
            appWindow.wnd?.show();
        }
    });
}
