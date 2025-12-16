import { type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";
import { BlockTargetWindowPosition } from "./2-dnd-position";

export function Panel4DragAndDrop({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
    return (
        <div className={classNames("-mx-4 px-4 text-xs border-t border-border shadow-sm flex flex-col select-none", className)} {...rest}>
            <BlockTargetWindowPosition className="p-2" />
        </div>
    );
}
