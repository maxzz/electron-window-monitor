import { type ComponentPropsWithoutRef } from "react";
import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { sawHandleAtom } from "@/store";
import { TestTargetWindowPosition } from "./1-test-target-position";
import { TestTargetWindowPositionWoDrag } from "./2-test-target-position-wo-drag";
import { PositionIndicator } from "./5-position-indicator";

export function BlockTargetWindowPosition({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
    const sawHandle = useAtomValue(sawHandleAtom);
    if (!sawHandle?.hwnd) {
        return null;
    }

    return (
        <div className={classNames("flex flex-col gap-2", className)} {...rest}>
            <div className="flex items-center gap-1">
                Test get target position:
                <PositionIndicator />
            </div>


            <div className="flex items-center gap-1">

                <div className="">
                    <TestTargetWindowPosition />
                    w/ drag
                </div>

                <div className="pl-4">
                    <TestTargetWindowPositionWoDrag />
                    wo/ drag
                </div>
            </div>


        </div>
    );
}
