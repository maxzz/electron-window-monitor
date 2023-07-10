import { EngineControl, TargetClientRect, WindowControlsCollectFinalAfterParse } from "@/electron/app/napi-calls";
import { FieldPath, MPath, MSAA_ROLE, MSAA_STATE, Meta, splitPool } from "pm-manifest";
import { uuid } from "pm-manifest/src/utils";

export type RoleStateNames = {
    role: string;
    state: string;
};

export type EngineControlMeta = {
    uuid: number;
    path: Meta.Path;
    rect?: TargetClientRect;
    role?: RoleStateNames;
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

    function getRole(p4a: MPath.p4a[] | undefined): RoleStateNames | undefined {
        if (!p4a?.length) {
            return;
        }
        const lastP4a = p4a.at(-1);
        const parts = lastP4a?.roleString?.split('_');

        if (!lastP4a?.roleString || !parts?.length || !parts[0]) {
            return;
        }

        const roleNum = parseInt(parts[0], 16);
        const roleName = MSAA_ROLE[roleNum];

        let stateNum = parseInt(parts[1], 16) || 0;
        let stateStr = ''
        
        if (!isNaN(stateNum)) {

            const nums = getEnumNamedEntries(MSAA_STATE) as [string, number][];
            let key = 0;

            while (stateNum && key < nums.length) {
                const [k, v] = nums[key++];
                if ((stateNum & v) !== 0) {
                    stateNum = stateNum & ~v;
                    stateStr += k;
                }
            }
        }

        return {
            role: roleName,
            state: `${stateStr}`,
        };
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

export function getEnumNumberEntries<T extends object>(objEnum: T) {
    return Object.entries(objEnum).filter(([key, val]) => Number.isInteger(+key));
}

export function getEnumNamedEntries<T extends object>(objEnum: T) {
    return Object.entries(objEnum).filter(([key, val]) => !Number.isInteger(+key));
}
