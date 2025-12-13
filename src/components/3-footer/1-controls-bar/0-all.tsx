import { type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";
import { BlockTargetWindowPosition } from "./2-dnd-position";
import { TestLinks } from "./2-test-links";
import { PopoverSettings } from "./popover-settings";
import { Section3_Footer } from "../2-footer";

export function Section3FooterAnd({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
    return (
        <div>
            <div className={classNames("text-xs border border-slate-500/50 rounded-sm flex flex-col select-none", className)} {...rest}>

                <TestLinks className="p-2 border-b border-slate-500/50" />

                <BlockTargetWindowPosition className="p-2 border-b border-slate-500/50" />

                <div className="p-2">
                    <PopoverSettings />
                </div>

            </div>
            
            <Section3_Footer />
        </div>
    );
}
