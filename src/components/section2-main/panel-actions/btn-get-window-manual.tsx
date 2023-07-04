import { HTMLAttributes } from "react";
import { useSetAtom, useAtomValue } from "jotai";
import { doGetTargetHwndAtom, doMonitoringAtom } from "@/store";
import { classNames } from "@/utils";
import { buttonClasses } from ".";

export function ButtonGetHandle({ className, ...rest }: HTMLAttributes<HTMLButtonElement>) {
    const doGetTargetHwnd = useSetAtom(doGetTargetHwndAtom);
    const isMonitoring = useAtomValue(doMonitoringAtom);
    return (
        <button className={classNames(buttonClasses, className)} disabled={isMonitoring} onClick={doGetTargetHwnd} {...rest}>
            Get Second Window
        </button>
    );
}
