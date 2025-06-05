import { type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";
import { BlockTargetWindowPosition } from "./2-dnd-position";
import { TestLinks } from "./2-test-links";
import { InputMaxControls } from "./3-input-max-controls";
import { ChkboxXmlFormat } from "./4-chkbox-xml-format";
import { ChkboxIconAutoUpdate } from "./5-chkbox-icon-auto-update";
import { ChkboxLargeIcon } from "./6-chkbox-icon-large";

export function Section3Footer({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
    return (
        <div className={classNames("text-xs border border-slate-500/50 rounded flex flex-col select-none", className)} {...rest}>

            <TestLinks className="p-2 border-b border-slate-500/50" />

            <BlockTargetWindowPosition className="p-2 border-b border-slate-500/50" />

            <div className="p-2 flex gap-x-4">
                <InputMaxControls />
                <ChkboxXmlFormat />
                <ChkboxIconAutoUpdate />
                <ChkboxLargeIcon />
            </div>
        </div>
    );
}
