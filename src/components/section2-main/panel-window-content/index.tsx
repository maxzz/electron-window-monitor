import { sawHandleStrAtom } from "@/store";
import { useAtomValue } from "jotai";
import { ContentPanel } from "./content-panel";
import { HeaderPanel } from "./header-panel";
import { ContentScrollArea } from "./content-scrollarea";

export function SawContentPanel() {
    const sawHandleStr = useAtomValue(sawHandleStrAtom);
    if (!sawHandleStr) {
        return null;
    }
    return (
        <div className="w-full min-h-0 max-w-xl flex flex-col">
            <HeaderPanel />
            {/* <ContentPanel /> */}
            <ContentScrollArea />
        </div>
    );
}
