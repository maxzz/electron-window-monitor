import { M2R } from "@/shared/ipc-types";
import { atom } from "jotai";
import { filesContentAtom } from "../../store/atom-dropped-files";
import { napiBuildProgress, napiBuildState } from "../../store/7-napi-atoms";

export const doFromMainAtom = atom(
    null,
    (get, set, data: M2R.RendererCalls) => {
        switch (data.type) {
            case 'm2r:dark-mode': {
                console.log('case m2r:dark-mode, active', data.active);
                break;
            }
            case 'm2r:reload-files': {
                console.log('reload-files');
                break;
            }
            case 'm2r:opened-files': {
                set(filesContentAtom, data.filesCnt);
                break;
            }
            case 'm2r:detection-progress': {
                napiBuildProgress.buildCounter = data.progress;
                break;
            }
            case 'm2r:position-progress': {
                napiBuildProgress.getPosProgress = data.progress;
                break;
            }
            case 'm2r:failed-raw-content': {
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
