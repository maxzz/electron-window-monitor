import { type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";
import { StartActionsPanel } from "../1-panel-start-actions";
import { SawHwndInfo } from "../2-panel-saw-hwnd-handle";
import { SawControlsPanel } from "../3-panel-window-content";
import { AccordionDemo, PopoverDemo } from "@/components/ui/ui-tests";
import { Panel4DragAndDrop } from "../4-panel-dnd/0-all";

export function Section2Main({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
    return (
        <div className={classNames("px-4 grid grid-rows-[auto_1fr_auto] gap-4 overflow-hidden", className)} {...rest}>
            <StartActionsPanel className="py-4" />

            <div className="grid grid-rows-[auto_1fr]">
                <SawHwndInfo className="" />
                <SawControlsPanel className="" />
            </div>

            {/* <PopoverDemo /> */}
            {/* <AccordionDemo /> */}

            <Panel4DragAndDrop />
        </div>
    );
} 
