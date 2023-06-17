import { Notification } from "electron";
import { M4R } from "./ipc-types";
import { getTargetWindow } from "../windows-napi-calls/window-monitor";

export async function callFromRendererToMain(d: M4R.ToMainCalls) {
    switch (d.type) {
        case 'notify': {
            new Notification({ title: 'My Noti', body: d.message }).show();
            break;
        }
        case 'dark-mode': {
            d.active;
            break;
        }
        case 'get-second-window': {
            console.log('get-second-window');
            let data1 = await getTargetWindow({});
            console.log('------------------------', data1);
            break;
        }
        default: {
            const really: never = d;
            throw new Error(really);
        }
    }
}
