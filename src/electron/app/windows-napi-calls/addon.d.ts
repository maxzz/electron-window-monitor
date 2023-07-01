// declare module "*pmat_plugin_nodejs.node" {
declare namespace PMAT_PLUGIN_NODEJS {
    
    type PluginErrorCallback = (err: string) => void;
    type PluginDataCallback = (err: string, data: string) => void;

    async function getTargetWindow(dataIn: object | string, cb: PluginDataCallback): Promise<string>;
    
    declare class CWindowControlsCollector {
        constructor();
        async collect(param: string, cb: PluginDataCallback): Promise<string>;
        cancel();
    }

    async function initGdi(cd: PluginErrorCallback);

    async function getWindowIcon(paramsStr: string, cb: PluginDataCallback);

    async function termGdi(cb: () => void);
        
    declare class CManifestForWindowCreator {
        constructor();
        async create(param: string, cb: PluginDataCallback): Promise<string>;
        cancel();
    }
}
