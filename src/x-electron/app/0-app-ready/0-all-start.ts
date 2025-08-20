import path from 'node:path';
import { app } from 'electron';
import { connect_ListenersForCallFromRenderer, connect_MainWindowListeners, createWindow } from '../1-start-main-window';
import { iniFileOptions } from '../1-start-main-window/8-ini-file-options';

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │

process.env.DIST = path.join(__dirname, '../dist');
process.env.PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public');

connect_MainWindowListeners();

app.whenReady().then(() => {
    connect_ListenersForCallFromRenderer();

    iniFileOptions.load();
    createWindow();
});
