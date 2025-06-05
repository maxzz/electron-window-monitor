import { type ComponentPropsWithoutRef } from "react";
import { useSnapshot } from "valtio";
import { motion, type PanInfo, useDragControls } from "motion/react"; //https://www.youtube.com/watch?v=UEzt1vp2p6k&t=112s
import { IconDndTarget } from "@/components/ui";
import { napiBuildProgress, debouncedSetNapiGetPosXY } from "@/store/7-napi-atoms";
//import { roundInt } from "@/utils";

export function TestTargetWindowPositionWReset({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
    return (
        <div className="relative size-12 bg-primary-900 rounded cursor-pointer" {...rest}>
            <MovingIcon />
        </div>
    );
}

function MovingIcon() {
    const { getPosProgress } = useSnapshot(napiBuildProgress);
    const dragControls = useDragControls();

    function onDrag(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
        // console.log(roundInt(info.point.x), roundInt(info.point.y));
        debouncedSetNapiGetPosXY(info.point.x, info.point.y);
    }

    return (<>
        {getPosProgress && (
            <motion.div
                className="size-12"
                onPointerDown={(event) => { napiBuildProgress.dragIsRunning = true; dragControls.start(event, { snapToCursor: true }); }}
                // onPointerDown={() => { napiBuildProgress.dragIsRunning = true; debouncedSetNapiGetPosXY(0, 0); }}
                // onPointerMove={(event: React.PointerEvent<HTMLDivElement>) => napiBuildProgress.dragIsRunning && debouncedSetNapiGetPosXY(event.pageX, event.pageY)}
                onPointerUp={() => { napiBuildProgress.dragIsRunning = false; }}
                drag
                dragSnapToOrigin
                dragElastic={0.01}
                dragTransition={{ bounceStiffness: 600, bounceDamping: 50 }}
                dragControls={dragControls}
                dragListener={false}
                onDrag={onDrag}
            >
                <IconDndTarget className="text-primary-200" />
            </motion.div>
        )}
    </>);
}
