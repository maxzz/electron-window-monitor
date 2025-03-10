import { type TargetClientRect } from "@/x-electron/xternal-to-renderer/7-napi-calls";

export namespace R2M { // Main from Renderer
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

    export type ClientOptions = {
        maxControls: number;
    }

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

export namespace R2MParams {
    export type NotifyMessage = Omit<R2M.NotifyMessage, 'type'>;
    export type DarkMode = Omit<R2M.DarkMode, 'type'>;
    export type SetNapiOptions = Omit<R2M.SetClientOptions, 'type'>;
    export type CancelDetection = Omit<R2M.CancelDetection, 'type'>;
    export type HighlightRect = Omit<R2M.HighlightRect, 'type'>;
}

// Size, position, and bounds

export type PointInt = { //All nubers must be an integer. Docs: https://electronjs.org/docs/api/structures/rectangle
    x: number;
    y: number;
};

export type SizeInt = { //All nubers must be an integer. Docs: https://electronjs.org/docs/api/structures/rectangle
    width: number;
    height: number;
};

export type RectangleInt = Prettify<PointInt & SizeInt>;
