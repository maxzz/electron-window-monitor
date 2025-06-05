import { type ComponentPropsWithoutRef, useState } from "react";
import { motion } from "motion/react";
import { IconDndTarget } from "@/components/ui";
import { napiBuildProgress, debouncedSetNapiGetPosXY } from "@/store/7-napi-atoms";
import { useSnapshot } from "valtio";

export function TestTargetWindowPositionWoDrag({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
    const [iconVisible, setIconVisible] = useState(true);

    return (
        <div className="relative size-12 bg-primary-900 rounded cursor-pointer">
            {/* <IconTarget2 className={classNames("text-primary-200", !iconVisible && "invisible")} /> */}

            <MovingIcon iconVisible={iconVisible} />
        </div>
    );
}

function MovingIcon({ className, iconVisible, ...rest }: { iconVisible: boolean; } & ComponentPropsWithoutRef<"div">) {
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
