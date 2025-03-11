export type NapiCallError =
    | 'undefined'           // Undefined error. used during error split
    | 'unknown-error'       // Unknown error; see extra param for details; as usual from catch
    | 'build-error'         // Error during manifest build
    | 'build-wo-mani'       // Build done without manifest
    | 'canceled-by-user'    // Canceled by user
    | 'too-many-controls'   // Too many controls (more then ${mainStore.maxControls})
    ;

/**
 * First part after '>>>' is error type, second part after ':::' is optional extra info.
 */
export function makeTypedError(error: NapiCallError, extra?: string): string {
    if (extra) {
        return `>>>${error}:::${extra}`;
    }
    return `>>>${error}`;
}

export function errorToString(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }
    return `${error}`;
}

export function splitTypedError(errorStr: string): { error: NapiCallError, extra: string | undefined; } {
    const typed = errorStr.split('>>>').at(-1) as NapiCallError;

    if (!typed) {
        return {
            error: 'undefined',
            extra: errorStr,
        };
    }

    const parts = typed.split('...');
    return {
        error: parts[0] as NapiCallError,
        extra: parts[1],
    };
}

// function splitTypedError(errorStr: string): { error: NapiCallError, extra?: string; } {
//     const parts = errorStr.split(':::');
//     const error = parts[0] as NapiCallError;

//     if (parts.length === 1) {
//         return {
//             error,
//         };
//     } else if (parts.length === 2) {
//         return {
//             error,
//             extra: parts[1],
//         };
//     } else {
//         return {
//             error: 'undefined',
//             extra: errorStr,
//         };
//     }
// }
