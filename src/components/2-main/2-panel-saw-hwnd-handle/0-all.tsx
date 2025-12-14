import { type HTMLAttributes } from "react";
import { classNames } from "@/utils";
import { SawHwndPropsGrid } from "./2-saw-hwnd-props-grid";
import { PanelBuildProcess } from "./3-panel-build-process";

export function SawHwndInfo({ className, ...rest }: HTMLAttributes<HTMLElement>) {
    return (
        <div className={classNames("grid", className)} {...rest}>
            <SawHwndPropsGrid />
            
            <PanelBuildProcess className="place-self-end" />
        </div>
    );
}
