import { type ComponentPropsWithoutRef, useState } from "react";
import { motion } from "motion/react";
import { classNames, debounce, roundInt } from "@/utils";
import { IconDndTarget, IconTarget2 } from "@/components/ui";
import { napiBuildProgress, setNapiBuildProgressXY } from "@/store/7-napi-atoms";
import { useSnapshot } from "valtio";
import { type PointXY } from "@/x-electron/xternal-to-renderer/7-napi-calls";

export function TestTargetWindowPositionWoDrag({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
    const [iconVisible, setIconVisible] = useState(true);

    function startDragging(event: React.PointerEvent<HTMLDivElement>) {
        const elm = event.target as HTMLDivElement;
        elm.setPointerCapture(event.pointerId);
        setIconVisible(false);
        //console.log('startDragging (false)', event.target);

        // this is not ready on plugin side: if (sawHandle?.hwnd) { invokeMain({ type: 'get-window-pos', hwnd: sawHandle.hwnd }); }
    }

    function stopDragging(event: React.PointerEvent<HTMLDivElement>) {
        setIconVisible(true);
        //console.log('stopDragging (true)');
    }

    function dragging(event: React.PointerEvent<HTMLDivElement>) {
        if (iconVisible) {
            return;
        }

        setNapiBuildProgressXY(event.pageX, event.pageY);
    }

    function stopDragCanceled(event: React.PointerEvent<HTMLDivElement>) {
        setIconVisible(true);
        //console.log('stopDragcancel (true)');
    }

    return (<>
        <div
            className="relative size-12 bg-primary-900 rounded cursor-pointer"
        // onPointerDown={startDragging}
        // onPointerUp={stopDragging}
        // onPointerMove={dragging}
        // onPointerCancel={stopDragCanceled}
        >
            {/* <IconTarget2 className={classNames("text-primary-200", !iconVisible && "invisible")} /> */}

            <MovingIcon iconVisible={iconVisible} />
        </div>
    </>);
}

function MovingIcon({ className, iconVisible, ...rest }: { iconVisible: boolean; } & ComponentPropsWithoutRef<"div">) {
    const { getPosProgress } = useSnapshot(napiBuildProgress);
    return (<>
        {getPosProgress && (
            <motion.div
                className="size-12"
                onPointerMove={(event: React.PointerEvent<HTMLDivElement>) => {
                    setNapiBuildProgressXY(event.pageX, event.pageY);
                }}
                drag
            >
                <IconDndTarget className="text-primary-200" />
                {/* <IconTarget2 className={classNames("text-primary-200", !iconVisible && "invisible")} /> */}
            </motion.div>
        )}
    </>);
}
// function MovingIcon({ className, iconVisible, ...rest }: {iconVisible: boolean} & ComponentPropsWithoutRef<"div">) {
//     const { getPosProgress } = useSnapshot(napiBuildProgress);
//     return (<>
//         {getPosProgress && (
//             <motion.div
//                 className="absolute"
//                 initial={{ x: 0, y: 0 }}
//                 animate={{ x: getPosProgress.point.x, y: getPosProgress.point.y }}
//                 transition={{ duration: 0.5 }}
//                 // {...rest}
//             >
//                 <IconTarget2 className={classNames("text-primary-200", !iconVisible && "invisible")} />
//             </motion.div>
//         )}
//     </>);
// }
