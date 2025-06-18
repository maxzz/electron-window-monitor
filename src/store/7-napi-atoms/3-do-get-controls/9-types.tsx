import { type Meta, type RoleStateNames } from "pm-manifest";
import { type EngineControl, type Rect4, type WindowControlsCollectFinalAfterParse } from "@/x-electron/xternal-to-renderer/7-napi-calls";

export type EngineControlMeta = {
    uuid: number;
    path: Meta.Path;
    rect?: Rect4;
    role?: RoleStateNames;
};

export type EngineControlWithMeta = {
    control: EngineControl;
    meta: EngineControlMeta;
};

export type EngineControlsWithMeta = Omit<WindowControlsCollectFinalAfterParse, 'controls'> & {
    controls: EngineControlWithMeta[];
};
