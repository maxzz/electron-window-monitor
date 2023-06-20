import { M2R } from "@/electron/app/ipc-main";
import { atom } from "jotai";
import { filesContentAtom } from "../atom-dropped-files";

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
            default: {
                const really: never = data;
                throw new Error(really);
            }
        }
    }
);
