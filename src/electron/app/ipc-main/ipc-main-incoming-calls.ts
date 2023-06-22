import { Notification } from "electron";
import { M4R } from "@/electron/app/ipc-types";
import { mainStore } from "../store-main";

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
            console.log('cancel-detection');
            mainStore.cancelDetection = true;
            break;
        }
        default: {
            const really: never = data;
            new Error(`\nUnknown IPC-call: ${JSON.stringify(really)}\n`);
        }
    }
}
