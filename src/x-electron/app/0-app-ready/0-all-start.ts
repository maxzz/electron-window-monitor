import path from 'node:path';
import { app } from 'electron';
import { connect_ListenersForCallFromRenderer, createAppWindow } from '../1-start-main-window';
import { iniFileOptions } from '../1-start-main-window/8-ini-file-options';
import { setAppListeners } from '../1-start-main-window/3-2-listeners-of-app';

app.whenReady().then(() => {
    connect_ListenersForCallFromRenderer();

    iniFileOptions.load();
    createAppWindow();

    setAppListeners();
});
