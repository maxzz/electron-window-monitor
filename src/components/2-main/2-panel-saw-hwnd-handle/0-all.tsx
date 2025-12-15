import { type HTMLAttributes } from "react";
import { classNames } from "@/utils";
import { SawHwndPropsGrid } from "./2-saw-hwnd-props-grid";

export function SawHwndInfo({ className, ...rest }: HTMLAttributes<HTMLElement>) {
    return (
        <div className={classNames("grid", className)} {...rest}>
            <SawHwndPropsGrid />
        </div>
    );
}
