import { type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";
import { PopoverSettings } from "../4-dialogs/7-settings-dialog";
import { IconMicroscope } from "../ui/icons/normal";

export function Section1Header({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
    return (
        <div className={classNames("px-2 py-2 border-b border-border shadow-xs", className)} {...rest}>

            <div className="flex items-center justify-between">
                <IconMicroscope className="size-4 stroke-6! text-foreground/50" />
                <PopoverSettings />
            </div>

        </div>
    );
}
