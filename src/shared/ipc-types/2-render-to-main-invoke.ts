import { type ManifestForWindowCreatorParams, type GetTlwScreenshotsParams } from "@/x-electron/xternal-to-renderer/7-napi-calls";

export namespace R2MInvoke { // Main from Renderer invoke and get result
    type DoLoadfiles = {
        type: 'r2mi:load-files';
        filenames: string[];
        allowedExt?: string[];
    };

    type DoLoadfiles2 = {
        type: 'r2mi:load-files2';
        filenames: string[];
    };

    type DoLoadfiles3 = {
        type: 'r2mi:load-files3';
        filenames: string[];
    };

    type GetSecondWindowHandle = {
        type: 'r2mi:get-target-hwnd';
    };

    type GetSecondWindowContent = {
        type: 'r2mi:get-window-controls';
        hwnd: string;
    };

    type GetSecondWindowIcon = {
        type: 'r2mi:get-window-icon';
        hwnd: string;
    };

    type GetSecondWindowMani = {
        type: 'r2mi:get-window-mani';
        params: ManifestForWindowCreatorParams;
    };

    type GetWindowPos = {
        type: 'r2mi:get-window-pos';
        hwnd: string;
    };

    type GetTlwInfos = {
        type: 'r2mi:get-tlw-infos';
    };

    type GetTlwScreenshots = {
        type: 'r2mi:get-tlw-screenshots';
        tlwInfos: GetTlwScreenshotsParams;
    };

    export type InvokeCalls =
        | DoLoadfiles 
        | DoLoadfiles2/* | DoLoadfiles3*/ 
        | GetSecondWindowHandle 
        | GetSecondWindowContent 
        | GetSecondWindowIcon 
        | GetSecondWindowMani
        | GetWindowPos
        | GetTlwInfos
        | GetTlwScreenshots
        ;

    export type FileContent = {
        name: string;                   // file name wo/ path
        fullPath: string;               // file full path and filename
        cnt: string;                    // file content or error message
        failed?: boolean;               // if failed the cnt member has error text
        notOur?: boolean;               // load of file content was blocked by allowedExt list.

        entry?: FileSystemFileEntry;    // FileSystemEntry from DataTransfer will exist only when loaded from the web drag and drop.
        file?: File;                    // File object from async entry.file() call
    };

    export const allowedExt = ['dpm', 'dpn'];
}
