export type PluginDataCallback = (err: string, data: string) => void;
export type PluginErrorCallback = (err: string) => void;

/////////////////////////////////////////////////////////////////////////////
// Get Target Window

export type GetTargetWindowParams = {   // i.e. empty object like this '{}'
};

export type GetTargetWindowResult = {   // SAW - Second Active Window
    hwnd: string;                       // "000000000014103E",
    caption: string;                    // "ipc-invoke.ts - electron-window-monitor - Visual Studio Code",
    classname: string;                  // "Chrome_WidgetWin_1",
    process: string;                    // "C:\\Program Files\\Microsoft VS Code\\Code.exe"
};

export interface getTargetWindow {
    (getTargetWindowParams: string, cb: PluginDataCallback): void;
}

/////////////////////////////////////////////////////////////////////////////
// Get Icon

export type IconFormatType = 'png' | 'jpeg' | 'bmp';
export type Base64String = string;

export type WindowIconGetterParams = {
    hwnd: string;               // hwnd should be string because int64 and js number types are different
    iconFormat: IconFormatType;
};

export type WindowIconGetterResult = {
    data: Base64String;
    type: IconFormatType;
};

/**
 * Class for getting window icon. Instantiate once and call getIcon multiple times.
 * 
 * During instantiation it internally starts GDI Plus. So, do not create/destruct this class multiple times, 
 * it will be expensive.

 * Usage:
 * let getter = new WindowIconGetter();
 * let [iconBinaryBmp, iconTypeBmp] = await getter.getIcon(0x1114C, 'png');
 */

export interface WindowIconGetter {
    new(): WindowIconGetter;
    getWindowIcon(windowIconGetterParamsParams: string, cb: PluginDataCallback): void;
}

/////////////////////////////////////////////////////////////////////////////
// Get Controls

export type WindowControlsCollectorCollectParams = {
    hwnd: string;
};

export type WindowControlsCollectProgress = {
    state: 'progress' | 'done';
    progress: number;
};

export type WindowControlsCollectFinal = {
    pool: string;
    controls: string[];
};

export type WindowControlsCollectorCollectResult = WindowControlsCollectProgress | WindowControlsCollectFinal;

export type EngineControl = {
    type: string;
    dispname: string;
    formname: string;
    path: string;
    memvalue: string;
    choosevalues: string[];

    memid: number;
    orderid: number;

    topurl: string;
    parenturl: string;

    hintfromengineuseit: boolean;
    mfillin_useunicode: boolean;
    mfillin_wrapkeystate: boolean;
};

export type WindowControlsCollectorCollectReply = {
    pool: string;
    controls: EngineControl[];
};

export interface WindowControlsCollector {
    new(): WindowControlsCollector;
    collect(windowControlsCollectorCollectParams: string, cb: PluginDataCallback): void;
    cancel(): void;
}

/////////////////////////////////////////////////////////////////////////////
// Get Manifest

export type ManifestForWindowCreatorParams = {
    hwnd: string;
};

export type ManifestForWindowCreatorResult = any;

export interface ManifestForWindowCreator {
    new(): ManifestForWindowCreator;
    create(manifestForWindowCreatorParams: string, cb: PluginDataCallback): void;
    cancel(): void;
}

/////////////////////////////////////////////////////////////////////////////
// All together

export type AddonTypes = {
    getTargetWindow: getTargetWindow;
    WindowIconGetter: WindowIconGetter;
    WindowControlsCollector: WindowControlsCollector;
    ManifestForWindowCreator: ManifestForWindowCreator;
};
