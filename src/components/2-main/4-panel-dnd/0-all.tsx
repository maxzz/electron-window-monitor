import { type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";
import { BlockTargetWindowPosition } from "./2-dnd-position";
import { Section3_Footer } from "../../3-footer/0-all-footer";

export function Section3FooterAnd({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
    return (
        <div>
            <div className={classNames("text-xs border border-slate-500/50 rounded-sm flex flex-col select-none", className)} {...rest}>

                <BlockTargetWindowPosition className="p-2 border-b border-slate-500/50" />
    
            </div>
            
            <Section3_Footer />
        </div>
    );
}
