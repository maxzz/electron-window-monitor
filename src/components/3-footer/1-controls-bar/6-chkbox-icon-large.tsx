import { useSnapshot } from "valtio";
import { debugSettings } from "@/store/1-atoms";
import { checkboxClasses } from "../../2-main/8-shared-styles";
import { Checkbox } from "@/components/ui/shadcn/checkbox";

export function ChkboxLargeIcon() {
    const { iconsLarge } = useSnapshot(debugSettings.uiState);
    return (
        <label className="w-max flex items-center gap-x-1" title="The get manifest request format: JSON/XML">

            <Checkbox   
                className={checkboxClasses}
                checked={iconsLarge}
                onCheckedChange={(v) => debugSettings.uiState.iconsLarge = !!v}
            />

            <div className="select-none">
                Large icon
            </div>
        </label>
    );
}
