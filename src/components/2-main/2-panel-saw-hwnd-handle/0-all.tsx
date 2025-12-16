import { type HTMLAttributes } from "react";
import { classNames } from "@/utils";
import { useAtomValue } from "jotai";
import { sawHandleAtom } from "@/store";
import { PropsGrid } from "./2-saw-hwnd-props-grid";
import { TotalCalls } from "./3-total-calls";

export function SawHwndInfo({ className, ...rest }: HTMLAttributes<HTMLElement>) {
    return (
        <div className={classNames("grid", className)} {...rest}>
            <SawHwndPropsGrid />
        </div>
    );
}

function SawHwndPropsGrid() {
    const saw = useAtomValue(sawHandleAtom);
 
    return (<>
        {saw && (
            <div className="relative text-xs">
                <PropsGrid saw={saw} />
                <TotalCalls className="absolute right-2 bottom-1.5" />
            </div>
        )}
    </>);
}
