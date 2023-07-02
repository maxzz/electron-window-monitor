import { M4RInvoke } from "./to-main-calls";

export namespace M2R { // Main to Renderer

    // menu commands

    export type DarkMode = {
        type: 'dark-mode';
        active: boolean;
    };

    export type ReloadFiles = {
        type: 'reload-files';
    };

    export type OpenedFiles = {
        type: 'opened-files';
        filesCnt: M4RInvoke.FileContent[];
    };

    export type DetectionProgress = {
        type: 'detection-progress';
        progress: number;
    };

    export type FailedRawContent = {
        type: 'failed-raw-content';
        body: string;
    };

    export type RendererCalls = DarkMode | ReloadFiles | OpenedFiles | DetectionProgress | FailedRawContent;
}
