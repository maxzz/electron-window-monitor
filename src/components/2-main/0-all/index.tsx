import { type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";
import { StartActionsPanel } from "../1-panel-start-actions";
import { SawHwndInfo } from "../2-panel-saw-hwnd-handle";
import { SawControlsPanel } from "../3-panel-window-content";
import { AccordionDemo, PopoverDemo } from "@/components/ui/ui-tests";
import { Panel4DragAndDrop } from "../4-panel-dnd/0-all";

export function Section2Main({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
    return (
        <div className={classNames("min-h-0 flex flex-col gap-4 divide-y divide-sky-500/50", className)} {...rest}>
            <StartActionsPanel className="py-4" />

            <SawHwndInfo className="py-4" />
            {/* <PopoverDemo /> */}
            {/* <AccordionDemo /> */}

            <SawControlsPanel className="py-4" />
            <Panel4DragAndDrop />
        </div>
    );
} 
