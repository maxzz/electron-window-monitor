import { M4RInvoke } from "./ipc-types";
import { loadFilesContent } from "../utils/load-files";

export function invokeFromRendererToMain(d: M4RInvoke.InvokeCalls): any {
    switch (d.type) {
        case 'load-files': {
            return loadFilesContent(d.filenames, d.allowedExt);
        }
        case 'load-files2': {
            return loadFilesContent(d.filenames);
        }
        default: {
            const really: never = d;
            throw new Error(really);
        }
    }
}
