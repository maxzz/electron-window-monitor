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
// Drag And Drop icon to a window (for programmatic mouse click to a control in manual mode)

export type DragAndDropParams = {
    hwnd: string;               // hwnd should be string because int64 and js number types are different
};

export type POINT = {
    x: number;                    // x-coordinate relative to client area of the window
    y: number;                    // y-coordinate relative to client area of the window
}

export type DragAndDropResult = {
    status: 'progress' | 'done';
    point: POINT;
    rect?: TargetClientRect;
};

export interface dragAndDrop {
    (DragAndDropParams: string, cb: PluginDataCallback): void;
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
// Highlight desktop app window control

export type TargetClientRect = {
    left: number;
    right: number;
    top: number;
    bottom: number;
}

export type WindowControlHighlighterParams = {
    hwnd: string;
    rect: TargetClientRect;
};

/**
 * Class for getting window icon. Instantiate once and call getIcon multiple times.
 * 
 * During instantiation it internally starts GDI Plus. So, do not create/destruct this class multiple times, 
 * it will be expensive.

 * Usage:
 * let highlighter = new WindowControlHighlighter();
 * highlighter.highlight('{"hwnd":"12345", "rect":{"left":100,"right":200,"top":100,"bottom":200}}');
 * 
 * TODO: There is no hide highlighter call. Is that done by timer? How to set timer interval in that case or reset show to see rect again?
 */

export interface WindowControlHighlighter {
    new(): WindowControlHighlighter;
    highlight(windowControlHighlighterParams: string): void;
}

/////////////////////////////////////////////////////////////////////////////
// Get Controls

export type WindowControlsCollectorCollectParams = {
    hwnd: string;
};

export type WindowControlsCollectProgress = {
    state: 'start' | 'progress' | 'done';
    progress: number;
};

export type WindowControlsCollectFinal = {
    pool: string;
    controls: string[];
};

export type WindowControlsCollectorCollectResult = WindowControlsCollectProgress | WindowControlsCollectFinal;

export interface WindowControlsCollector {
    new(): WindowControlsCollector;
    collect(windowControlsCollectorCollectParams: string, cb: PluginDataCallback): void;
    cancel(): void;
}

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

export type WindowControlsCollectFinalAfterParse = {
    pool: string;
    controls: EngineControl[];
};

/////////////////////////////////////////////////////////////////////////////
// Get Manifest

export type ManifestForWindowCreatorParams = {
    hwnd: string;
    wantXml: boolean;
};

export type ManifestForWindowCreatorResult = WindowControlsCollectProgress | object | string;

export interface ManifestForWindowCreator {
    new(): ManifestForWindowCreator;
    create(manifestForWindowCreatorParams: string, cb: PluginDataCallback): void;
    cancel(): void;
}

export type ManifestForWindowCreatorFinalAfterParse =
    | object    // TODO: define manifest fields
    | string;   // xml string if started with '<' character

/////////////////////////////////////////////////////////////////////////////
// All together

export type AddonTypes = {
    getTargetWindow: getTargetWindow;
    dragAndDrop: dragAndDrop,
    WindowIconGetter: WindowIconGetter;
    WindowControlsCollector: WindowControlsCollector;
    ManifestForWindowCreator: ManifestForWindowCreator;
    WindowControlHighlighter: WindowControlHighlighter;
};
