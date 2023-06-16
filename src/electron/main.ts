import path from 'node:path';
import { app } from 'electron';
import { connect_ListenersForCallFromRenderer, connect_MainWindowListeners, createWindow } from './app/start-main-window/create-main-window';
// import { getTargetWindow } from './window-monitor';

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
