import { type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";
import { IconMicroscope } from "../ui/icons/normal";
import { PopoverSettings } from "../4-dialogs/7-settings-dialog";
import { TopMenu } from "./1-top-menu";
import { ButtonTestHighlight } from "../3-footer/1-controls-bar/2-test-links";

export function Section1Header({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
    return (
        <div className={classNames("pl-4 pr-2 py-2 border-b border-border shadow-xs", className)} {...rest}>

            <div className="flex items-center justify-between">
                <IconMicroscope className="size-4 stroke-6! text-foreground/50" />
                <span className="text-xs">Second active window (SAW)</span>

                <div>
                <ButtonTestHighlight />
                    <PopoverSettings />
                    <TopMenu />
                </div>
            </div>

        </div>
    );
}
