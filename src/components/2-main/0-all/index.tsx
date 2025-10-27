import { type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";
import { StartActionsPanel } from "../1-panel-start-actions";
import { SawHwndInfo } from "../2-panel-saw-hwnd-handle";
import { SawControlsPanel } from "../3-panel-window-content";
import { PopoverDemo } from "@/components/ui/ui-tests";

export function Section2Main({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
    return (
        <div className={classNames("min-h-0 text-primary-900 flex flex-col gap-4 divide-y divide-sky-500/50", className)} {...rest}>
            <StartActionsPanel className="py-4 1border-b border-primary-500/50" />

            <SawHwndInfo className="border-b 1border-primary-500/50" />
            <PopoverDemo />

            <SawControlsPanel className="border-b 1border-primary-500/50" />
        </div>
    );
} 
