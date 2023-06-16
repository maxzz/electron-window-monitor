import { M2R } from "@/electron/app/ipc-main";
import { atom } from "jotai";
import { filesContentAtom } from "./dropFiles";

export const doFromMainAtom = atom(
    null,
    (get, set, data: any) => {
        const d = data as M2R.RendererCalls;
        switch (d.type) {
            case 'dark-mode': {
                console.log('case dark-mode, active', d.active);
                break;
            }
            case 'reload-files': {
                console.log('reload-files');
                break;
            }
            case 'opened-files': {
                set(filesContentAtom, d.filesCnt);
                break;
            }
            default: {
                const really: never = d;
                throw new Error(really);
            }
        }
    }
);
