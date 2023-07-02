export type PluginErrorCallback = (err: string) => void;
export type PluginDataCallback = (err: string, data: string) => void;

/////////////////////////////////////////////////////////////////////////////
// Get Target Window

export interface getTargetWindow {
    (params: string, cb: PluginDataCallback): void;
}

/////////////////////////////////////////////////////////////////////////////
// Get Icon

export type IconFormatType = 'png' | 'jpeg' | 'bmp';
export type Base64String = string;

export type WindowIconGetterParams = {
    hwnd: string;
    iconFormat: IconFormatType;
}

export type WindowIconGetterResult = {
    data: Base64String;
    type: IconFormatType;
}

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
}

export type WindowControlsCollectProgress = {
    state: 'progress' | 'done';
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

/////////////////////////////////////////////////////////////////////////////
// Get Manifest

export type ManifestForWindowCreatorParams = {
    hwnd: string;
}

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
