import { type HTMLAttributes } from "react";
import { classNames } from "@/utils";
import { HeaderButtons } from "./1-header-buttons";
import { PanelHwndGrid } from "./2-panel-grid";
import { PanelBuildProcess } from "./3-panel-build-process";

export function PanelHwnd({ className, ...rest }: HTMLAttributes<HTMLElement>) {
    return (
        <div className={classNames("flex flex-col", className)} {...rest}>
            <HeaderButtons />
            <PanelHwndGrid />
            
            <PanelBuildProcess className="h-10 self-end" />
        </div>
    );
}
