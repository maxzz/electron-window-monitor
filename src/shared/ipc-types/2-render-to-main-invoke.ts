import { type ManifestForWindowCreatorParams, type GetTlwScreenshotsParams, type Rect4, type WindowHighlighterParams, type DragAndDropParams, type OkIfEmptyString, type PerformCommandParams } from "@/x-electron/xternal-to-renderer/7-napi-calls";

export namespace R2MInvoke { // Main from Renderer invoke and get result

    // load files

    export type DoLoadfiles = {
        type: 'r2mi:load-files';
        filenames: string[];
        allowedExt?: string[];
    };

    type DoLoadfiles2 = { type: 'r2mi:load-files2'; filenames: string[]; };
    type DoLoadfiles3 = { type: 'r2mi:load-files3'; filenames: string[]; };

    // napi

    export type GetSecondWindowHandle = {
        type: 'r2mi:get-target-hwnd';
    };

    export type GetSecondWindowContent = {
        type: 'r2mi:get-window-controls';
        hwnd: string;
    };

    export type GetSecondWindowIcon = {
        type: 'r2mi:get-window-icon';
        hwnd: string;
    };

    export type GetSecondWindowMani = {
        type: 'r2mi:get-window-mani';
        params: ManifestForWindowCreatorParams;
    };

    export type GetWindowPosInit = {
        type: 'r2mi:get-window-pos-init';
        params: DragAndDropParams;
    };

    export type GetTlwInfos = {
        type: 'r2mi:get-tlw-infos';
    };

    export type GetTlwScreenshots = {
        type: 'r2mi:get-tlw-screenshots';
        tlwInfos: GetTlwScreenshotsParams;
    };

    export type HighlightField = {
        type: 'r2mi:highlight-field';
        params?: {                              // If not set, then hide highlighter
            hwnd: string;
            rect?: Rect4;
            accId?: number;                     // We accId (not be profile id) as ordered in manifest (accId does not skip buttons).

            highlightColor?: string;            // Color of the highlighted border, in HTML form #RRGGBB. Default: #FF0000. Do not send #000000 or #008080.
            width?: number;                     // Width of the highlighted border in pixels. Default: 5
            blinks?: number;                    // Number of times to blink the highlighting rectangle. Default: 3; zero means no blick and use hide() to stop hihglighting
        };
    };

    export type HighlightTarget = {
        type: 'r2mi:highlight-target';
        params?: WindowHighlighterParams;       // If not set, then hide highlighter
    };

    export type GetWindowExtras = {
        type: 'r2mi:get-window-extras';
        hwnds: string[];
    };

    export type GeneralInfo = {
        type: 'r2mi:get-general-info';
    };

    export type PerformCommand = {
        type: 'r2mi:perform-command';
        params: PerformCommandParams;
    };

    export type AllInvokes =
        | DoLoadfiles
        | DoLoadfiles2/* | DoLoadfiles3*/
        | GetSecondWindowHandle
        | GetSecondWindowContent
        | GetSecondWindowIcon
        | GetSecondWindowMani
        | GetWindowPosInit
        | GetTlwInfos
        | GetTlwScreenshots
        | HighlightField
        | HighlightTarget
        | GetWindowExtras
        
        | GeneralInfo
        | PerformCommand
        ;

    export type InvokeResult<T extends R2MInvoke.AllInvokes> =
        T extends DoLoadfiles                //'r2mi:load-files'
        // T['type'] extends 'r2mi:load-files'               //'r2mi:load-files' // This is OK but not for now
        ? {
            filesCnt: FileContent[];
            emptyFolder: string;
        }

        // napi

        : T extends GetSecondWindowHandle    //'r2mi:get-target-hwnd'
        ? string

        : T extends GetSecondWindowContent   //'r2mi:get-window-controls'
        ? string

        : T extends GetSecondWindowIcon      //'r2mi:get-window-icon'
        ? string

        : T extends GetSecondWindowMani      //'r2mi:get-window-mani'
        ? string

        : T extends GetWindowPosInit         //'r2mi:get-window-pos-init-init'
        ? OkIfEmptyString

        : T extends GetTlwInfos              //'r2mi:get-tlw-infos'
        ? string

        : T extends GetTlwScreenshots        //'r2mi:get-tlw-screenshots'
        ? string

        : T extends HighlightField           //'r2mi:highlight-field'
        ? string

        : T extends HighlightTarget          //'r2mi:highlight-target'
        ? OkIfEmptyString

        : T extends GetWindowExtras          //'r2mi:get-window-extras'
        ? string

        : T extends GeneralInfo              //'r2mi:get-general-info'
        ? string

        : T extends PerformCommand           //'r2mi:perform-command'
        ? string

        : never;

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

} //namespace R2MInvoke

export namespace R2MInvokeParams {
    export type DoLoadfiles = Omit<R2MInvoke.DoLoadfiles, 'type'>;
    export type GetSecondWindowHandle = Omit<R2MInvoke.GetSecondWindowHandle, 'type'>;
    export type GetSecondWindowContent = Omit<R2MInvoke.GetSecondWindowContent, 'type'>;
    export type GetSecondWindowIcon = Omit<R2MInvoke.GetSecondWindowIcon, 'type'>;
    export type GetSecondWindowMani = Omit<R2MInvoke.GetSecondWindowMani, 'type'>;
    export type GetWindowPosInit = Omit<R2MInvoke.GetWindowPosInit, 'type'>;
    export type GetTlwInfos = Omit<R2MInvoke.GetTlwInfos, 'type'>;
    export type GetTlwScreenshots = Omit<R2MInvoke.GetTlwScreenshots, 'type'>;
    export type HighlightField = Omit<R2MInvoke.HighlightField, 'type'>;
    export type HighlightTarget = Omit<R2MInvoke.HighlightTarget, 'type'>;
    export type GetWindowExtras = Omit<R2MInvoke.GetWindowExtras, 'type'>;
    export type GeneralInfo = Omit<R2MInvoke.GeneralInfo, 'type'>;
    export type PerformCommand = Omit<R2MInvoke.PerformCommand, 'type'>;
}
