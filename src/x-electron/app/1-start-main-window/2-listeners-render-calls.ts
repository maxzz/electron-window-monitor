import { type IpcMainEvent, type IpcMainInvokeEvent, ipcMain } from "electron";
import { type R2M, type R2MInvoke } from '@/shared/ipc-types';
import { callFromRendererInMain, invokeFromRendererInMain } from '../../../shared/1-gates-in-main';

export function connect_ListenersForCallFromRenderer() {
    connect_CallMain('call-main', cc);
    connect_InvokeMain('invoke-main', ii);
}

// 1. call handlers
function connect_CallMain(channel: PreloadChannelNames, handler: (event: IpcMainEvent, data: any) => void) {
    ipcMain.on(channel, handler);
}

function cc(_event: IpcMainEvent, data: any) {
    callFromRendererInMain(data as R2M.ToMainCalls);
}

// 2. invoke handlers
function connect_InvokeMain(channel: PreloadChannelNames, handler: (event: IpcMainInvokeEvent, data: any) => any) {
    ipcMain.handle(channel, handler);
}

function ii(_event: IpcMainInvokeEvent, data: any): any {
    return invokeFromRendererInMain(data as R2MInvoke.AllInvokes);
}
