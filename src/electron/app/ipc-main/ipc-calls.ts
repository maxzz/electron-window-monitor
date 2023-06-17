import { Notification } from "electron";
import { M4R } from "./ipc-types";

export function callFromRendererToMain(d: M4R.ToMainCalls) {
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
            break;
        }
        default: {
            const really: never = d;
            throw new Error(really);
        }
    }
}
