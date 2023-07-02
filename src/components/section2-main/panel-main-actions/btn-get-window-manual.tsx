import { HTMLAttributes } from "react";
import { useSetAtom, useAtomValue } from "jotai";
import { doGetSawHandleAtom, doMonitoringAtom } from "@/store";
import { classNames } from "@/utils";
import { buttonClasses } from ".";

export function ButtonGetHandle({ className, ...rest }: HTMLAttributes<HTMLButtonElement>) {
    const doGetSawHandle = useSetAtom(doGetSawHandleAtom);
    const isMonitoring = useAtomValue(doMonitoringAtom);
    return (
        <button className={classNames(buttonClasses, className)} disabled={isMonitoring} onClick={doGetSawHandle} {...rest}>
            Get Second Window
        </button>
    );
}
