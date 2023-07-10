import { EngineControl, TargetClientRect, WindowControlsCollectFinalAfterParse } from "@/electron/app/napi-calls";
import { FieldPath, MPath, MSAA_ROLE, Meta, splitPool } from "pm-manifest";
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
        const stateNum = parts[1] || 0;

        // type m = typeof MSAA_ROLE;
        // type keys = {
        //     [K in keyof m]: K extends number ? m[K] : never;
        // };

        // type keys<T> = {
        //     [K in keyof T]: K extends number ? T[K] : never;
        // };
        // type numbers = keys<typeof MSAA_ROLE>

        // type keys<T> = {
        //     [K in keyof T as T[K] extends number ? K : never ]: T[K];
        // };
        // type numbers = keys<typeof MSAA_ROLE>

        type keys<T> = {
            [K in keyof T as K extends string ? K : never ]: T[K];
        };
        type numbers = keys<typeof MSAA_ROLE>

        const nums = getEnumNumberEntries<typeof MSAA_ROLE>(MSAA_ROLE);

        return {
            role: roleName,
            state: `${stateNum}`,
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

type NumberKeys<T> = T extends object
  ? {
      [K in keyof T]-?: K extends number ? T[K] : never;
    }[keyof T]
  : never;

export function getEnumNumberEntries<T extends object>(objEnum: T) {
    return Object.fromEntries(Object.entries(objEnum).filter(([key, val]) => Number.isInteger(+key))) as NumberKeys<T>;
}

export function getEnumNamedEntries<T extends Record<string| number,  any>>(objEnum: T) {
    return Object.fromEntries(Object.entries(objEnum).filter(([key, val]) => !Number.isInteger(+key)));
}

// export function getEnumNumberEntries<T extends object>(objEnum: T) {
//     return Object.fromEntries(Object.entries(objEnum).filter(([key, val]) => Number.isInteger(+key)));
// }

// export function getEnumNamedEntries<T extends Record<string| number,  any>>(objEnum: T) {
//     return Object.fromEntries(Object.entries(objEnum).filter(([key, val]) => !Number.isInteger(+key)));
// }
