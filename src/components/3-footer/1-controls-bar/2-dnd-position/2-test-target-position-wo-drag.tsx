import { type ComponentPropsWithoutRef } from "react";
import { useSnapshot } from "valtio";
import { motion } from "motion/react";
import { IconDndTarget } from "@/components/ui";
import { napiBuildProgress, debouncedSetNapiGetPosXY } from "@/store/7-napi-atoms";

export function TestTargetWindowPositionWoDrag({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
    return (
        <div className="relative size-12 bg-primary-900 rounded cursor-pointer" {...rest}>
            <MovingIcon />
        </div>
    );
}

function MovingIcon() {
    const { getPosProgress } = useSnapshot(napiBuildProgress);
    return (<>
        {getPosProgress && (
            <motion.div
                className="size-12"
                onPointerDown={() => { napiBuildProgress.dragIsRunning = true; debouncedSetNapiGetPosXY(0, 0); }}
                onPointerUp={() => { napiBuildProgress.dragIsRunning = false; }}
                onPointerMove={(event: React.PointerEvent<HTMLDivElement>) => napiBuildProgress.dragIsRunning && debouncedSetNapiGetPosXY(event.pageX, event.pageY)}
                drag
            >
                <IconDndTarget className="text-primary-200" />
            </motion.div>
        )}
    </>);
}

//TODO: how to set icon position to initial position?
