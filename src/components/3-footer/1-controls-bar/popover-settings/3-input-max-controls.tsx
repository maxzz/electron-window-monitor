import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { debugSettings } from "@/store/1-atoms";
import { focusClasses } from "../../../2-main/8-shared-styles";
import { Input } from "@/components/ui/shadcn/input";

export function InputMaxControls() {
    const { maxControls } = useSnapshot(debugSettings.uiState);

    function setValue(value: string) {
        let n = parseInt(value);
        if (Number.isNaN(n)) {
            n = 0;
        }
        debugSettings.uiState.maxControls = n;
    }

    return (
        <label className="-mt-2 flex items-center justify-between" title="Allowed number of detected controls before rejecting content detection (0 - unlimited).">
            <div className="select-none">Max detected controls</div>
            <Input
                className={classNames("px-2 w-20 h-7 text-xs rounded-sm focus-visible:ring-0 focus-visible:border-primary-500", focusClasses)}
                value={maxControls}
                onChange={(e) => setValue(e.target.value)}
            />
        </label>
    );
}
