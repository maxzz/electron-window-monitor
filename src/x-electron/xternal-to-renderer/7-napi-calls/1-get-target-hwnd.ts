import { addon } from "./0-addon";
import { type GetTargetWindowParams } from "./pmat-plugin-types";

export function getTargetHwnd(): Promise<string> {
    return new Promise<string>(
        (resolve, reject) => {
            const params: GetTargetWindowParams = {};
            const param = JSON.stringify(params);

            addon.getTargetWindow(param,
                (err: string, data: string) => err ? reject(err) : resolve(data)
            );
        }
    );
}
