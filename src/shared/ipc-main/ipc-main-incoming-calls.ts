import { Notification } from "electron";
import { M4R } from "@/shared/ipc-types";
import { mainStore } from "../../electron/app/store-main";
import { highlightRect } from "../../electron/app/napi-calls";

export async function callFromRendererToMain(data: M4R.ToMainCalls): Promise<void> {
    switch (data.type) {
        case 'notify': {
            new Notification({ title: 'My Noti', body: data.message }).show();
            break;
        }
        case 'dark-mode': {
            data.active;
            break;
        }
        case 'set-client-options': {
            mainStore.maxControls = data.state.maxControls;
            break;
        }
        case 'cancel-detection': {
            mainStore.cancelDetection = true;
            break;
        }
        case 'highlight-rect': {
            highlightRect(data.hwnd, data.rect);
            break;
        }
        default: {
            const really: never = data;
            throw new Error(`\nUnknown IPC-call: ${JSON.stringify(really)}\n`);
        }
    }
}
