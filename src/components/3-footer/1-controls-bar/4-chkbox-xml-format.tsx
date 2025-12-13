import { useSnapshot } from "valtio";
import { debugSettings } from "@/store/1-atoms";
import { Checkbox } from "@/components/ui/shadcn/checkbox";

export function ChkboxXmlFormat() {
    const { acquireXml } = useSnapshot(debugSettings.uiState);
    return (
        <label className="w-max flex items-center gap-x-2 cursor-pointer" title="The get manifest request format: JSON/XML">

            <Checkbox
                checked={acquireXml}
                onCheckedChange={(v) => debugSettings.uiState.acquireXml = !!v}
            />

            <div className="select-none">
                Get manifest in XML format
            </div>
            
        </label>
    );
}
