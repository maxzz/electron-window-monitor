export type PluginErrorCallback = (err: string) => void;
export type PluginDataCallback = (err: string, data: string) => void;

// getWindowIcon

export interface WindowIconGetter {
    new(): WindowIconGetterBody;
}

interface WindowIconGetterBody {
    getWindowIcon(paramStr: string, cb: PluginDataCallback): void;
}

// ManifestForWindowCreator

export interface ManifestForWindowCreator {
    new(): ManifestForWindowCreatorBody;
}

interface ManifestForWindowCreatorBody {
    create(paramStr: string, cb: PluginDataCallback): void;
    cancel(): void;
}

// WindowControlsCollector

export interface WindowControlsCollector {
    new(): WindowControlsCollectorBody;
}

interface WindowControlsCollectorBody {
    collect(paramStr: string, cb: PluginDataCallback): void;
    cancel(): void;
}

// getTargetWindow()

export interface getTargetWindow {
    (paramStr: string, cb: PluginDataCallback): void;
}

export type AddonTypes = {
    getTargetWindow: getTargetWindow;
    WindowIconGetter: WindowIconGetter;
    WindowControlsCollector: WindowControlsCollector;
    ManifestForWindowCreator: ManifestForWindowCreator;
};
