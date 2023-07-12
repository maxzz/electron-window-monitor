import { useState } from "react";
import { useSnapshot } from "valtio";
import { IconTarget2 } from "../ui/icons";
import { buildState } from "@/store/app-state";
import { invokeMain, sawHandleAtom } from "@/store";
import { useAtomValue } from "jotai";
import { classNames } from "@/utils";

export function TestTargetWindowPosition() {
    const [iconVisible, setIconVisible] = useState(true);

    const { getPosProgress } = useSnapshot(buildState);

    const sawHandle = useAtomValue(sawHandleAtom);
    if (!sawHandle?.hwnd) {
        return null;
    }

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

        const point = { x: roundInt(event.pageX), y: roundInt(event.pageY) };

        buildState.getPosProgress = {
            point,
        };

        //console.log('stopDragging (true)', point);
    }

    function stopDragCanceled(event: React.PointerEvent<HTMLDivElement>) {
        setIconVisible(true);

        //console.log('stopDragcancel (true)');
    }

    return (
        <div className="flex items-end space-x-2">
            <div className="">Test get target position:</div>

            <div
                className="w-12 h-12 bg-primary-900 rounded cursor-pointer"
                onPointerDown={startDragging}
                onPointerUp={stopDragging}
                onPointerMove={dragging}
                onPointerCancel={stopDragCanceled}
            >
                <IconTarget2 className={classNames("text-primary-200", !iconVisible && "invisible")} />
            </div>

            {getPosProgress &&
                <div className="">{getPosProgress.point.x}, {getPosProgress.point.y}</div>
            }
        </div>
    );
}

function round2(num: number) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}
function roundInt(num: number) {
    return Math.round(num);
}

//TODO: set custom cursor while dragging
