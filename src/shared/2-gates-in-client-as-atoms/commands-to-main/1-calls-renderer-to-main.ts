import { type R2MParams } from "@/shared/ipc-types";
import { type Rect4 } from "@/x-electron/xternal-to-renderer/7-napi-calls";
import { sendToMain } from "../3-to-main-apis";

export namespace R2MCalls {

    // options, notify

    export function notify(message: R2MParams.NotifyMessage): void {
        sendToMain({ type: 'r2m:notify', ...message });
    }

    export function darkMode(state: R2MParams.DarkMode): void {
        sendToMain({ type: 'r2m:dark-mode', ...state });
    }

    export function setClientOptions(state: R2MParams.SetNapiOptions): void {
        sendToMain({ type: 'r2m:set-client-options', ...state });
    }

    // napi

    export function cancelDetection(): void {
        sendToMain({ type: 'r2m:cancel-detection' });
    }

    export function highlightRect({ hwnd, rect }: { hwnd: string; rect: Rect4; }): void {
        sendToMain({ type: 'r2m:highlight-rect', hwnd, rect });
    }

    export function getWindowPosAction(params: 'move' | 'stop'): void {
        sendToMain({ type: 'r2m:get-window-pos-action', params });
    }
}
