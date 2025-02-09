import { type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";
import { MainActionsPanel } from "../1-panel-actions";
import { SawHwndInfo } from "../2-panel-saw-hwnd-handle";
import { SawContentPanel } from "../3-panel-window-content";

export function Section2Main({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
    return (
        <div className={classNames("min-h-0 text-primary-900 flex flex-col gap-4 divide-y-1 divide-red-500/50", className)} {...rest}>
            <MainActionsPanel className="py-4 border-b border-primary-500/50" />

            <SawHwndInfo className="border-b border-primary-500/50" />

            <SawContentPanel className="border-b border-primary-500/50" />
        </div>
    );
} 
