import { useSnapshot } from "valtio";
import { IconTarget2 } from "../ui/icons";
import { buildState } from "@/store/app-state";
import { invokeMain, sawHandleAtom } from "@/store";
import { useAtomValue } from "jotai";

export function TestTargetWindowPosition() {
    const { getPosProgress } = useSnapshot(buildState);
    
    const sawHandle = useAtomValue(sawHandleAtom);
    if (!sawHandle?.hwnd) {
        return null;
    }

    function startDragging() {
        if (sawHandle?.hwnd) {
            //invokeMain({ type: 'get-window-pos', hwnd: sawHandle.hwnd });
        }
    }

    return (
        <div className="flex items-end space-x-2">
            <div className="">Test get target position:</div>
            <div className="w-12 h-12 bg-primary-900 rounded" onMouseDown={startDragging}>
                <IconTarget2 className="text-primary-200" />
            </div>
            {getPosProgress &&
                <div className="">{getPosProgress.point.x}, {getPosProgress.point.y}</div>
            }
        </div>
    );
}
