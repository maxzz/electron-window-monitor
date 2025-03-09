import { type BrowserWindow, dialog } from "electron";
import { type M2R, R2MInvoke } from "../ipc-types";
import { winApp } from "../../x-electron/app/1-start-main-window";
import { loadFilesContent } from "../../x-electron/app/utils-main/load-files";

export function mainToRenderer(data: M2R.RendererCalls) {
    const channel: PreloadChannelNames = 'send-to-renderer';
    winApp?.webContents.send(channel, data);
}
