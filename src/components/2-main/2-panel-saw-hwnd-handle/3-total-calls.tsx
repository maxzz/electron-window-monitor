import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { napiBuildProgress } from "@/store";
import { ComponentPropsWithoutRef } from "react";

export function TotalCalls({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
    const lastBuildProgress = useSnapshot(napiBuildProgress).lastProgress;
    return (
        <>
            {!!lastBuildProgress && (
                <div className={classNames("text-[.55rem] opacity-70", className)} title="Total number of calls to check the active window" {...rest}>
                    total calls: {lastBuildProgress}
                </div>
            )}
        </>
    );
}

