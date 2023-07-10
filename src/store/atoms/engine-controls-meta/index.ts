import { EngineControl, TargetClientRect, WindowControlsCollectFinalAfterParse } from "@/electron/app/napi-calls";
import { FieldPath, MPath, MSAA_ROLE, Meta, splitPool } from "pm-manifest";
import { uuid } from "pm-manifest/src/utils";

export type EngineControlMeta = {
    uuid: number;
    path: Meta.Path;
    rect?: TargetClientRect;
    role?: string;
};

export type EngineControlWithMeta = {
    control: EngineControl;
    meta: EngineControlMeta;
};

export type EngineControlsWithMeta = Omit<WindowControlsCollectFinalAfterParse, 'controls'> & {
    controls: EngineControlWithMeta[];
};

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
            const rect = getControlTaretRect(path.loc);
            const role = getRole(path.p4 || path.p4a);
            const item = {
                control,
                meta: {
                    uuid: uuid.asRelativeNumber(),
                    path,
                    ...(rect && { rect }),
                    ...(role && { role }),
                }
            };
            return item;
        });
        return rv;
    }

    function getRole(p4a: MPath.p4a[] | undefined): string | undefined {
        if (!p4a?.length) {
            return;
        }
        const last = p4a.at(-1);
        const parts = last?.roleString?.split('_');
        
        const role = parts?.[0];
        if (role) {
            //const name = MSAA_ROLE['cell'];
            const name = MSAA_ROLE[+role];

            console.log('----------name', name);
        }

        return last?.roleString;
    }

    function getControlTaretRect(pathLoc: string | undefined): TargetClientRect | undefined {
        const loc = FieldPath.loc.getControlRect(pathLoc);
        if (loc) {
            return {
                left: loc[0],      // x1.x
                top: loc[1],       // x1.y
                right: loc[2],     // x2.x
                bottom: loc[3],    // x2.y
            };
        }
    }
}
