import { type ComponentPropsWithoutRef, useState } from "react";
import { classNames } from "@/utils";
import { IconTarget2 } from "@/components/ui";
import { debouncedSetNapiGetPosXY } from "./8-set-position";

export function TestTargetWindowPosition({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
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

        debouncedSetNapiGetPosXY(event.pageX, event.pageY, false);
    }

    function stopDragCanceled(event: React.PointerEvent<HTMLDivElement>) {
        setIconVisible(true);
        //console.log('stopDragcancel (true)');
    }

    return (<>
        <div
            className="w-12 h-12 bg-primary-900 rounded-sm cursor-pointer"
            onPointerDown={startDragging}
            onPointerUp={stopDragging}
            onPointerMove={dragging}
            onPointerCancel={stopDragCanceled}
        >
            <IconTarget2 className={classNames("text-primary-200", !iconVisible && "invisible")} />
        </div>
    </>);
}

//TODO: set custom cursor while dragging
