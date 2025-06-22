import { type ComponentPropsWithoutRef } from "react";
import { useSnapshot } from "valtio";
import { stateNapiPosTracker } from "@/store/7-napi-atoms";

export function PositionIndicator(props: ComponentPropsWithoutRef<"div">) {
    const { current, dragIsRunning } = useSnapshot(stateNapiPosTracker);
    return (<>
        {dragIsRunning && (
            <div {...props}>
                {current.x}, {current.y}
            </div>
        )}
    </>);
}
