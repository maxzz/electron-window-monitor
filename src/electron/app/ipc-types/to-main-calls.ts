export namespace M4R { // Main from Renderer
    export type ClientOptions = {
        maxControls: number;
    }

    export type NotifyMessage = {
        type: 'notify';
        message: string;
    };

    export type DarkMode = {
        type: 'dark-mode';
        active: boolean;
    };

    type SetClientOptions = {
        type: 'set-client-options';
        state: ClientOptions;
    };

    type CancelDetection = {
        type: 'cancel-detection';
    };

    export type ToMainCalls = NotifyMessage | DarkMode | SetClientOptions | CancelDetection;
}
