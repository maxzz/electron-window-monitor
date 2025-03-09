import path from 'node:path';
import { app } from 'electron';
import { connect_ListenersForCallFromRenderer, connect_MainWindowListeners, createWindow } from '../1-start-main-window';

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
connect_ListenersForCallFromRenderer();

app.whenReady().then(() => {
    createWindow();
});
