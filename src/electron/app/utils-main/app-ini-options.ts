import path from "path";
import fs from "fs";
import { app, BrowserWindow, Rectangle, screen } from "electron";

const initPath = path.join(app.getPath('userData'), "init.json");

export type IniOptions = {
    bounds: Rectangle;  // x, y, width, height
    devTools: boolean;  // is devTools open
};

function fixBounds(bounds?: Rectangle): Rectangle | undefined {
    if (bounds) {
        const area = screen.getDisplayMatching(bounds).workArea;
        if (isInsideRect(bounds, area)) {
            return bounds;
        }
    }

    function isInsideRect(bounds: Rectangle, area: Rectangle) {
        return bounds.x >= area.x &&
            bounds.y >= area.y &&
            bounds.x + bounds.width <= area.x + area.width &&
            bounds.y + bounds.height <= area.y + area.height;
    }
}

export function getIniOptions(): IniOptions | undefined {
    try {
        const cnt = fs.readFileSync(initPath, 'utf8');
        const data = JSON.parse(cnt) as IniOptions;
        const bounds = fixBounds(data?.bounds); // it seems like windows is doing this as well
        bounds && (data.bounds = bounds);
        return data;
    }
    catch (e) {
    }
}

export function saveIniOptions(win: BrowserWindow) {
    const data = {
        bounds: win.getNormalBounds(),
        devTools: win.webContents.isDevToolsOpened(),
    };
    fs.writeFileSync(initPath, JSON.stringify(data));
}
