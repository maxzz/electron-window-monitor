import { type HTMLAttributes } from "react";
import { useSetAtom, useAtomValue } from "jotai";
import { doGetTargetHwndAtom, doMonitoringAtom } from "@/store";
import { buttonClasses } from "./8-button-classes";
import { classNames } from "@/utils";

export function ButtonGetSawHandle({ className, ...rest }: HTMLAttributes<HTMLButtonElement>) {
    const doGetTargetHwnd = useSetAtom(doGetTargetHwndAtom);
    const isMonitoring = useAtomValue(doMonitoringAtom);
    return (
        <button className={classNames(buttonClasses, className)} disabled={isMonitoring} onClick={doGetTargetHwnd} {...rest}>
            Get Second Window
        </button>
    );
}
