import { type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";
import { BlockTargetWindowPosition } from "./2-dnd-position";

export function Panel4DragAndDrop({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
    return (
        <div className={classNames("text-xs flex flex-col select-none", className)} {...rest}>
            <BlockTargetWindowPosition className="p-2 border-b border-slate-500/50" />
        </div>
    );
}
