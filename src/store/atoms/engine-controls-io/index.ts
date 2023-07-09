import { EngineControl, TargetClientRect, WindowControlsCollectFinalAfterParse } from "@/electron/app/napi-calls";
import { FieldPath, Meta, splitPool } from "pm-manifest";
import { uuid } from "pm-manifest/src/utils";

export type EngineControlMeta = {
    uuid: number;
    path: Meta.Path;
    rect?: TargetClientRect;
};

export type EngineControlWithMeta = {
    control: EngineControl;
    meta: EngineControlMeta;
};

export type EngineControlsWithMeta = Omit<WindowControlsCollectFinalAfterParse, 'controls'> & {
    controls: EngineControlWithMeta[];
};

//TODO: should go to pm-manifest but wo/ TargetClientRect but w/ tuple [p1.x, p1.y, p2.x, p2.y] 
// and check p1.x < p2.x and p1.y < p2.y and swap if needed; and check if some are 0 then return undefined
function getControlRect(pathLoc: string | undefined): TargetClientRect | undefined {
    const loc = pathLoc?.split('|')?.at(-1);
    const arr = loc?.split(' ');
    if (arr?.length === 4) {
        return {
            left: +arr[0],      // x1.x
            top: +arr[1],       // x1.y
            right: +arr[2],     // x2.x
            bottom: +arr[3],    // x2.y
        };
    }
}

export function controlsReplyToEngineControlWithMeta(reply: WindowControlsCollectFinalAfterParse): EngineControlsWithMeta | null {
    const final = reply.pool && reply.controls?.length ? reply : null;
    if (!final) {
        return null;
    }

    const pool = splitPool(final.pool);

    const rv: EngineControlsWithMeta = {
        pool: final.pool,
        controls: addMetaToEngineControls(pool, final.controls)
    };

    return rv;

    function addMetaToEngineControls(pool: string[], controls: EngineControl[]): EngineControlWithMeta[] {
        const rv = controls.map((control) => {
            const path = FieldPath.fieldPathItems(pool, control.path);
            let rect = getControlRect(path.loc);
            const item = {
                control,
                meta: {
                    uuid: uuid.asRelativeNumber(),
                    path,
                    ...(rect && { rect })
                }
            };
            return item;
        });
        return rv;
    }
}
