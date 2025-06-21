import { Notification } from "electron";
import { type R2M } from "@/shared/ipc-types";
import { electronState } from "../../x-electron/app/2-electron-globals";
import { dndAction, highlightField } from "../../x-electron/xternal-to-renderer/7-napi-calls";

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
            highlightField(data);
            break;
        }
        case 'r2m:get-window-pos-action': {
            dndAction(data.params);
            break;
        }
        default: {
            const really: never = data;
            throw new Error(`\nUnknown IPC-call: ${JSON.stringify(really)}\n`);
        }
    }
}
