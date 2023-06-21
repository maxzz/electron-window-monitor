import { M2R } from "@/electron/app/ipc-types";
import { atom } from "jotai";
import { filesContentAtom } from "../atom-dropped-files";
import { controlsCheckProgress } from "../app-state";

export const doFromMainAtom = atom(
    null,
    (get, set, data: M2R.RendererCalls) => {
        switch (data.type) {
            case 'dark-mode': {
                console.log('case dark-mode, active', data.active);
                break;
            }
            case 'reload-files': {
                console.log('reload-files');
                break;
            }
            case 'opened-files': {
                set(filesContentAtom, data.filesCnt);
                break;
            }
            case 'detection-progress': {
                controlsCheckProgress.foundCounter = data.progress;
                break;
            }
            default: {
                const really: never = data;
                throw new Error(`\nUnknown IPC-listener: ${JSON.stringify(really)}\n`);
            }
        }
    }
);
