import { type M2R } from "../ipc-types";
import { winApp } from "../../x-electron/app/1-start-main-window";

export function mainToRenderer(data: M2R.RendererCalls) {
    const channel: PreloadChannelNames = 'send-to-renderer';
    winApp?.webContents.send(channel, data);
}
