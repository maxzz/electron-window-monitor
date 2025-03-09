import { type TargetClientRect } from "@/x-electron/xternal-to-renderer/7-napi-calls";

export namespace R2M { // Main from Renderer
    export type ClientOptions = {
        maxControls: number;
    }

    export type NotifyMessage = {
        type: 'r2m:notify';
        message: string;
    };

    export type DarkMode = {
        type: 'r2m:dark-mode';
        active: boolean;
    };

    export type SetClientOptions = {
        type: 'r2m:set-client-options';
        state: ClientOptions;
    };

    export type CancelDetection = {
        type: 'r2m:cancel-detection';
    };

    export type HighlightRect = {
        type: 'r2m:highlight-rect';
        hwnd: string;
        rect: TargetClientRect;
    };

    export type ToMainCalls = NotifyMessage | DarkMode | SetClientOptions | CancelDetection | HighlightRect;
}
