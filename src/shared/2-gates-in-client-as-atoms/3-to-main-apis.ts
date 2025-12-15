import { type R2MInvoke, type R2M } from "@/shared/ipc-types";
import { worldStore } from "./1-ipc-react-listener";

// main process APIs

var mainApi: TmApi | undefined = typeof tmApi !== 'undefined' ? tmApi : undefined;

export function hasMain(): boolean {
    return !!mainApi;
}

// Subscribe to main process calls

mainApi?.setCbCallFromMain((_event: unknown, data: unknown) => worldStore.update(data));

// call

export function sendToMain(data: R2M.ToMainCalls): void {
    mainApi?.callMain(data);
}

// invoke

export async function invokeMainTyped<TInvoke extends R2MInvoke.AllInvokes>(data: TInvoke): Promise<R2MInvoke.InvokeResult<TInvoke>> {
    if (!mainApi) {
        throw new Error('no.main.api');
    }
    return mainApi.invokeMain<R2MInvoke.AllInvokes, R2MInvoke.InvokeResult<TInvoke>>(data);
}

export function invokeLoadFiles(filenames: string[], allowedExt?: string[]): Promise<R2MInvoke.FileContent[]> {
    const d: R2MInvoke.AllInvokes = {
        type: 'r2mi:load-files',
        filenames,
        ...(allowedExt && { allowedExt }),
    };
    return mainApi?.invokeMain(d) as Promise<R2MInvoke.FileContent[]>;
}

export function zoomAction(action: 'in' | 'out' | 'reset'): void {
    sendToMain({ type: 'r2m:zoom-action', action });
}

export function exitApp(): void {
    sendToMain({ type: 'r2m:exit-app' });
}

export function getZoomLevel(): Promise<number> {
    return invokeMainTyped({ type: 'r2mi:get-zoom-level' });
}