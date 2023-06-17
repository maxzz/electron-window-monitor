import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

const api: TmApi = {
    callMain: (data: any): void => {
        const channel: PreloadChannels = 'call-main';
        ipcRenderer.send(channel, data);
    },

    invokeMain: (data: any): any => {
        const channel: PreloadChannels = 'invoke-main';
        return ipcRenderer.invoke(channel, data);
    },

    setCbCallFromMain: (callback: (event: IpcRendererEvent, data: any) => void) => {
        const channel: PreloadChannels = 'send-to-renderer';
        ipcRenderer.removeAllListeners(channel);
        ipcRenderer.on(channel, callback);
    },
};

contextBridge.exposeInMainWorld('tmApi', api);
