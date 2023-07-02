export type PluginErrorCallback = (err: string) => void;
export type PluginDataCallback = (err: string, data: string) => void;

/////////////////////////////////////////////////////////////////////////////
// Get Icon

export type IconFormatType = 'png' | 'jpeg' | 'bmp';

export type GetWindowIconParams = {
    hwnd: string;
    iconFormat: IconFormatType;
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
    new(): WindowIconGetterBody;
}

export interface WindowIconGetterBody {
    getWindowIcon(getWindowIconParams: string, cb: PluginDataCallback): void;
}

/////////////////////////////////////////////////////////////////////////////
// Get Manifest

export type ManifestForWindowCreatorParams = {
    hwnd: string;
}

export interface ManifestForWindowCreator {
    new(): ManifestForWindowCreatorBody;
}

export interface ManifestForWindowCreatorBody {
    create(manifestForWindowCreatorParams: string, cb: PluginDataCallback): void;
    cancel(): void;
}

/////////////////////////////////////////////////////////////////////////////
// Get Controls

export type WindowControlsCollectorCollectParams = {
    hwnd: string;
}

export interface WindowControlsCollector {
    new(): WindowControlsCollectorBody;
}

export interface WindowControlsCollectorBody {
    collect(windowControlsCollectorCollectParams: string, cb: PluginDataCallback): void;
    cancel(): void;
}

/////////////////////////////////////////////////////////////////////////////
// Get Target Window

export interface getTargetWindow {
    (params: string, cb: PluginDataCallback): void;
}

/////////////////////////////////////////////////////////////////////////////
// All together

export type AddonTypes = {
    getTargetWindow: getTargetWindow;
    WindowIconGetter: WindowIconGetter;
    WindowControlsCollector: WindowControlsCollector;
    ManifestForWindowCreator: ManifestForWindowCreator;
};
