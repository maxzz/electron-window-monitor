import path from "node:path";
import { app, Tray } from "electron";
import { appWindow } from "./7-app-window-instance";

//import TrayIconDarkWin from '../../resources/trayDark.ico?asset';

export function createTray() {
    // Create the tray icon
    const tray = new Tray(path.join(app.getAppPath(), 'resources', 'icon.png'));

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
