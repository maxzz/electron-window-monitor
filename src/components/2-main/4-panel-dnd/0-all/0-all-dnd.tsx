import { type ComponentPropsWithoutRef } from "react";
import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { sawHandleAtom } from "@/store";
import { PositionIndicator } from "../2-dnd-position/5-position-indicator";
import { TestTargetWindowPosition } from "../2-dnd-position/1-test-target-position";
import { TestTargetWindowPositionWoDrag } from "../2-dnd-position/2-test-target-position-wo-drag";
import { TestTargetWindowPositionWReset } from "../2-dnd-position/3-test-target-position-w-reset";
import { NewInputXY } from "../2-napi-dnd/1-picker-dnd-w-napi";

export function Panel4DragAndDrop({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
    return (
        <div className={classNames("-mx-4 px-4 text-xs border-t border-border shadow-sm flex flex-col select-none", className)} {...rest}>
            <BlockTargetWindowPosition className="p-2" />
        </div>
    );
}


function BlockTargetWindowPosition({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
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

            <div className="flex items-center gap-12">
                <div>
                    <TestTargetWindowPosition />
                    w/ drag
                </div>

                {/* <div>
                    <TestTargetWindowPositionWoDrag />
                    wo/ drag
                </div> */}

                <div>
                    <TestTargetWindowPositionWReset />
                    w/ reset
                </div>

                <NewInputXY />
            </div>
        </div>
    );
}
