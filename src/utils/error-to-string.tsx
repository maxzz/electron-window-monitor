export function getErrorMsg(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }
    return `${error}`;
}
