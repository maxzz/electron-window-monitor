import { M2R } from "@/shared/ipc-types";
import { atom } from "jotai";
import { filesContentAtom } from "../../store/atom-dropped-files";
import { napiBuildProgress, napiBuildState } from "../../store/1-app-state";

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
                napiBuildProgress.buildCounter = data.progress;
                break;
            }
            case 'position-progress': {
                napiBuildProgress.getPosProgress = data.progress;
                break;
            }
            case 'failed-raw-content': {
                napiBuildState.buildFailedBody = data.body;
                break;
            }
            default: {
                const really: never = data;
                throw new Error(`\nUnknown IPC-listener: ${JSON.stringify(really)}\n`);
            }
        }
    }
);
