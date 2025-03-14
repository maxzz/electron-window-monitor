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

export async function invokeMain<TResult>(data: R2MInvoke.InvokeCalls): Promise<TResult | undefined> {
    return mainApi?.invokeMain<R2MInvoke.InvokeCalls, TResult>(data);
}

export function invokeLoadFiles(filenames: string[], allowedExt?: string[]): Promise<R2MInvoke.FileContent[]> {
    const d: R2MInvoke.InvokeCalls = {
        type: 'r2mi:load-files',
        filenames,
        ...(allowedExt && { allowedExt }),
    };
    return mainApi?.invokeMain(d) as Promise<R2MInvoke.FileContent[]>;
}
