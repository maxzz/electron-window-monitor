import { type HTMLAttributes } from "react";
import { useSetAtom, useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { doGetTargetHwndAtom, doMonitoringAtom } from "@/store";
import { buttonClasses } from "./8-button-classes";

export function ButtonGetSawHandle({ className, ...rest }: HTMLAttributes<HTMLButtonElement>) {

    const isMonitoring = useAtomValue(doMonitoringAtom);
    const doGetTargetHwnd = useSetAtom(doGetTargetHwndAtom);

    return (
        <button className={classNames(buttonClasses, isMonitoring && "!opacity-5", className)} disabled={isMonitoring} onClick={doGetTargetHwnd} {...rest}>
            Get Second Window
        </button>
    );
}
