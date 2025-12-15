import { app, Menu, BrowserWindow } from "electron";

function changeZoom(win: BrowserWindow, change: number) {
    const current = win.webContents.getZoomLevel();
    const next = current + change;
    win.webContents.setZoomLevel(next);
    win.webContents.send('send-to-renderer', { type: 'm2r:zoom-changed', level: next });
}

function resetZoom(win: BrowserWindow) {
    win.webContents.setZoomLevel(0);
    win.webContents.send('send-to-renderer', { type: 'm2r:zoom-changed', level: 0 });
}

export function createAppMenu() {
    const isMac = process.platform === 'darwin';

    const template: Electron.MenuItemConstructorOptions[] = [
        // App menu (macOS only)
        ...(isMac ? [{
            label: app.name,
            submenu: [
                { role: 'about' as const },
                { type: 'separator' as const },
                { role: 'services' as const },
                { type: 'separator' as const },
                { role: 'hide' as const },
                { role: 'hideOthers' as const },
                { role: 'unhide' as const },
                { type: 'separator' as const },
                { role: 'quit' as const },
            ]
        }] : []),

        // File menu
        {
            label: 'File',
            submenu: [
                isMac ? { role: 'close' } : { role: 'quit' },
            ]
        },

        // Edit menu
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                ...(isMac ? [
                    { role: 'pasteAndMatchStyle' as const },
                    { role: 'delete' as const },
                    { role: 'selectAll' as const },
                ] : [
                    { role: 'delete' as const },
                    { type: 'separator' as const },
                    { role: 'selectAll' as const },
                ]),
            ]
        },

        // View menu with zoom controls (Chrome-like shortcuts)
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forceReload' },
                { role: 'toggleDevTools' },
                { type: 'separator' },
                // Chrome-like zoom shortcuts
                {
                    label: 'Zoom In',
                    accelerator: 'CmdOrCtrl+=',
                    click: (_menuItem, baseWindow) => {
                        if (baseWindow instanceof BrowserWindow) {
                            changeZoom(baseWindow, 0.5);
                        }
                    }
                },
                {
                    label: 'Zoom In (Numpad)',
                    accelerator: 'CmdOrCtrl+numadd',
                    visible: false,
                    click: (_menuItem, baseWindow) => {
                        if (baseWindow instanceof BrowserWindow) {
                            changeZoom(baseWindow, 0.5);
                        }
                    }
                },
                {
                    label: 'Zoom Out',
                    accelerator: 'CmdOrCtrl+-',
                    click: (_menuItem, baseWindow) => {
                        if (baseWindow instanceof BrowserWindow) {
                            changeZoom(baseWindow, -0.5);
                        }
                    }
                },
                {
                    label: 'Zoom Out (Numpad)',
                    accelerator: 'CmdOrCtrl+numsub',
                    visible: false,
                    click: (_menuItem, baseWindow) => {
                        if (baseWindow instanceof BrowserWindow) {
                            changeZoom(baseWindow, -0.5);
                        }
                    }
                },
                {
                    label: 'Actual Size',
                    accelerator: 'CmdOrCtrl+0',
                    click: (_menuItem, baseWindow) => {
                        if (baseWindow instanceof BrowserWindow) {
                            resetZoom(baseWindow);
                        }
                    }
                },
                { type: 'separator' },
                { role: 'togglefullscreen' },
            ]
        },

        // Window menu
        {
            label: 'Window',
            submenu: [
                { role: 'minimize' },
                ...(isMac ? [
                    { type: 'separator' as const },
                    { role: 'front' as const },
                ] : [
                    { role: 'close' as const },
                ]),
            ]
        },
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

// Optional: Register additional keyboard shortcuts for zoom (Ctrl+Shift+=, numpad, etc.)
export function registerZoomShortcuts(win: BrowserWindow) {
    win.webContents.on('before-input-event', (event, input) => {
        // Handle Ctrl+Shift+= (plus key) for zoom in
        if (input.control && input.shift && input.key === '+') {
            changeZoom(win, 0.5);
            event.preventDefault();
        }
        // Handle Ctrl+Numpad+ for zoom in
        if (input.control && input.key === 'Add') {
            changeZoom(win, 0.5);
            event.preventDefault();
        }
        // Handle Ctrl+Numpad- for zoom out  
        if (input.control && input.key === 'Subtract') {
            changeZoom(win, -0.5);
            event.preventDefault();
        }
    });
}

