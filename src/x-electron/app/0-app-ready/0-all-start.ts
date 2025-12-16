import { app } from 'electron';
import { connect_ListenersForCallFromRenderer, createAppWindow } from '../1-start-main-window';
import { iniFileOptions } from '../1-start-main-window/8-ini-file-options';
import { setAppListeners } from '../1-start-main-window/3-2-listeners-of-app';
import { createTray } from '../1-start-main-window/4-tray';
import { createAppMenu } from '../1-start-main-window/5-app-menu';

// Fix for "Request Autofill.enable failed" errors
// app.commandLine.appendSwitch('enable-features', 'Autofill');
app.commandLine.appendSwitch('disable-features', 'Autofill');

app.whenReady().then(() => {
    connect_ListenersForCallFromRenderer();

    createAppMenu(); // Set up application menu with zoom shortcuts
    
    iniFileOptions.load();
    createAppWindow();

    setAppListeners();

    createTray();
});
