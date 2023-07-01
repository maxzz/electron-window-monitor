declare module "*pmat_plugin_nodejs.node" {
    
    type PluginErrorCallback = (err: string) => void;
    type PluginDataCallback = (err: string, data: string) => void;

    declare async function getTargetWindow(dataIn: object | string, cb: PluginDataCallback): Promise<string>;
    
    declare class CWindowControlsCollector {
        constructor();
        async collect(param: string, cb: PluginDataCallback): Promise<string>;
        cancel(): void;
    }

    declare async function initGdi(cd: PluginErrorCallback): Promise<void>;

    declare async function getWindowIcon(paramsStr: string, cb: PluginDataCallback): Promise<void>;

    declare async function termGdi(cb: () => void): Promise<void>;
        
    declare class CManifestForWindowCreator {
        constructor();
        async create(param: string, cb: PluginDataCallback): Promise<string>;
        cancel(): void;
    }
}

type PluginErrorCallback = (err: string) => void;
declare const addon: PluginErrorCallback;
