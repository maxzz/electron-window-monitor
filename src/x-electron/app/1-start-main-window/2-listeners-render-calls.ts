import { IpcMainEvent, IpcMainInvokeEvent, ipcMain } from "electron";
import { R2M, R2MInvoke } from '@/shared/ipc-types';
import { callFromRendererInMain, invokeFromRendererInMain } from '../../../shared/1-gates-in-main';

export function connect_ListenersForCallFromRenderer() {
    connect_CallMain('call-main', cc);
    connect_InvokeMain('invoke-main', ii);

    // 1. call handlers
    function cc(_event: IpcMainEvent, data: any) {
        callFromRendererInMain(data as R2M.ToMainCalls);
    }
    function connect_CallMain(channel: PreloadChannelNames, handler: (event: IpcMainEvent, data: any) => void) {
        ipcMain.on(channel, handler);
    }
    // 2. invoke handlers
    function ii(_event: IpcMainInvokeEvent, data: any): any {
        return invokeFromRendererInMain(data as R2MInvoke.InvokeCalls);
    }
    function connect_InvokeMain(channel: PreloadChannelNames, handler: (event: IpcMainInvokeEvent, data: any) => any) {
        ipcMain.handle(channel, handler);
    }
}
