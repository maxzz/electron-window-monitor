import { type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";
import { BlockTargetWindowPosition } from "./2-dnd-position";
import { TestLinks } from "./2-test-links";
import { InputMaxControls } from "./3-input-max-controls";
import { ChkboxXmlFormat } from "./4-chkbox-xml-format";
import { ChkboxIconAutoUpdate } from "./5-chkbox-icon-auto-update";
import { ChkboxLargeIcon } from "./6-chkbox-icon-large";
import { Section3_Footer } from "../2-footer";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/shadcn/popover";
import { Button } from "@/components/ui/shadcn/button";

export function Section3FooterAnd({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
    return (
        <div>
            <div className={classNames("text-xs border border-slate-500/50 rounded-sm flex flex-col select-none", className)} {...rest}>

                <TestLinks className="p-2 border-b border-slate-500/50" />

                <BlockTargetWindowPosition className="p-2 border-b border-slate-500/50" />

                <div className="p-2">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm">Options</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto">
                            <div className="grid gap-3 text-xs">
                                <InputMaxControls />
                                <ChkboxXmlFormat />
                                <ChkboxIconAutoUpdate />
                                <ChkboxLargeIcon />
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>

            </div>
            
            <Section3_Footer />
        </div>
    );
}
