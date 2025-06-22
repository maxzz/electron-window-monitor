import { type ComponentPropsWithoutRef } from "react";
import { useSnapshot } from "valtio";
import { motion } from "motion/react";
import { IconDndTarget } from "@/components/ui";
import { stateNapiPosTracker } from "@/store/7-napi-atoms";
import { debouncedSetNapiGetPosXY } from "./8-set-position";

export function TestTargetWindowPositionWoDrag({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
    return (
        <div className="relative size-12 bg-primary-900 rounded cursor-pointer" {...rest}>
            <MovingIcon />
        </div>
    );
}

function MovingIcon() {
    const { dragIsRunning } = useSnapshot(stateNapiPosTracker);
    return (<>
        {dragIsRunning && (
            <motion.div
                className="size-12"
                onPointerDown={() => { stateNapiPosTracker.dragIsRunning = true; debouncedSetNapiGetPosXY(0, 0, false); }}
                onPointerUp={() => { stateNapiPosTracker.dragIsRunning = false; }}
                onPointerMove={(event: React.PointerEvent<HTMLDivElement>) => stateNapiPosTracker.dragIsRunning && debouncedSetNapiGetPosXY(event.pageX, event.pageY, false)}
                drag
            >
                <IconDndTarget className="text-primary-200" />
            </motion.div>
        )}
    </>);
}

//TODO: how to set icon position to initial position?
