import { type ComponentPropsWithoutRef } from "react";
import { useSnapshot } from "valtio";
import { napiBuildProgress } from "@/store/7-napi-atoms";

export function PositionIndicator(props: ComponentPropsWithoutRef<"div">) {
    const { getPosProgress } = useSnapshot(napiBuildProgress);
    return (<>
        {getPosProgress && (
            <div {...props}>
                {getPosProgress.point.x}, {getPosProgress.point.y}
            </div>
        )}
    </>);
}
