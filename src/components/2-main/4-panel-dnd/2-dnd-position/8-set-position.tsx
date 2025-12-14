import { debounce, roundInt } from "@/utils";
import { stateNapiPosTracker } from "@/store/7-napi-atoms";
import { PointXY } from "@/x-electron/xternal-to-renderer/7-napi-calls";

/**
 * When call is coming from main, it is already debounced and rounded, but here we call it directly from pointer event handlers.
 * So far we do not have real isInside check, so we set it to false from outside.
 */
export function setNapiGetPosXY(x: number, y: number, isInside: boolean) {
    const xyNew: PointXY = { x: roundInt(x), y: roundInt(y) };
    const xyOld = stateNapiPosTracker.current;

    if (xyNew.x !== xyOld.x || xyNew.y !== xyOld.y) {
        stateNapiPosTracker.current.x = xyNew.x;
        stateNapiPosTracker.current.y = xyNew.y;
        stateNapiPosTracker.current.isInside = isInside;

        console.log(`napi-xy-progress {x:${xyNew.x}, y:${xyNew.y}}`);
    }
}

export const debouncedSetNapiGetPosXY = debounce(setNapiGetPosXY, 100);
