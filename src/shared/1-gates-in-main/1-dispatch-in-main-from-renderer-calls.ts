import { Notification } from "electron";
import { type R2M } from "@/shared/ipc-types";
import { electronState } from "../../x-electron/app/2-electron-globals";
import { dndAction, highlightControl } from "../../x-electron/xternal-to-renderer/7-napi-calls";
import { appWindow } from "../../x-electron/app/1-start-main-window/7-app-window-instance";

export async function callFromRendererInMain(data: R2M.ToMainCalls): Promise<void> {
    switch (data.type) {
        case 'r2m:notify': {
            new Notification({ title: 'My Noti', body: data.message }).show();
            break;
        }
        case 'r2m:dark-mode': {
            data.active;
            break;
        }
        case 'r2m:set-client-options': {
            electronState.maxControls = data.state.maxControls;
            break;
        }
        case 'r2m:cancel-detection': {
            electronState.cancelDetection = true;
            break;
        }
        case 'r2m:highlight-rect': {
            highlightControl(data);
            break;
        }
        case 'r2m:get-window-pos-action': {
            dndAction(data.params);
            break;
        }
        case 'r2m:zoom-action': {
            const w = appWindow.wnd;
            if (w) {
                const current = w.webContents.getZoomLevel();
                let next = current;
                if (data.action === 'in') next += 0.5;
                else if (data.action === 'out') next -= 0.5;
                else if (data.action === 'reset') next = 0;
                
                if (next !== current) {
                    w.webContents.setZoomLevel(next);
                    w.webContents.send('send-to-renderer', { type: 'm2r:zoom-changed', level: next });
                }
            }
            break;
        }
        default: {
            const really: never = data;
            throw new Error(`\nUnknown IPC-call: ${JSON.stringify(really)}\n`);
        }
    }
}
