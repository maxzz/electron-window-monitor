import { type ComponentPropsWithoutRef } from "react";
import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { sawHandleAtom } from "@/store";

export function BlockTargetWindowPosition({ className, ...rest }: ComponentPropsWithoutRef<"div">) {

    const sawHandle = useAtomValue(sawHandleAtom);
    if (!sawHandle?.hwnd) {
        return null;
    }

    return (
        <div className={classNames("flex items-end space-x-2", className)} {...rest}>
            <div>
                Test get target position:
            </div>

            123

        </div>
    );
}
