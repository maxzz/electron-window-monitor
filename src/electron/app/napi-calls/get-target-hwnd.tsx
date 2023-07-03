import { addon } from ".";

export function getTargetHwnd(dataIn: object | string): Promise<string> {
    return new Promise<string>(
        (resolve, reject) => {
            const param = typeof dataIn === 'object' ? JSON.stringify(dataIn) : dataIn;
            addon.getTargetWindow(param, (err: string, data: string) => err ? reject(err) : resolve(data));
        }
    );
}

