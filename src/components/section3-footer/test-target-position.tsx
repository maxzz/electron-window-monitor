import { useSnapshot } from "valtio";
import { IconTarget } from "../ui/icons";
import { buildState } from "@/store/app-state";
import { invokeMain, sawHandleAtom } from "@/store";
import { useAtomValue } from "jotai";

export function TestTargetWindowPosition() {
    const { getPosProgress } = useSnapshot(buildState);
    const sawHandle = useAtomValue(sawHandleAtom);
    if (!sawHandle?.hwnd) {
        return null;
    }

    return (
        <div className="flex items-end space-x-2">
            <div className="">Test get target position:</div>
            <div className="w-12 h-12 bg-primary-900 rounded" onMouseDown={() => {
                invokeMain({ type: 'get-window-pos', hwnd: sawHandle?.hwnd });
            }}>
                <IconTarget className="text-primary-200" />
            </div>
            {getPosProgress &&
                <div className="">{getPosProgress.point.x}, {getPosProgress.point.y}</div>
            }
        </div>
    );
}
