import { type M2R } from "../ipc-types";
import { appWindow } from "../../x-electron/app/1-start-main-window/8-app-window-instance";

export function mainToRenderer(data: M2R.RendererCalls) {
    const channel: PreloadChannelNames = 'send-to-renderer';
    appWindow.wnd?.webContents.send(channel, data);
}
