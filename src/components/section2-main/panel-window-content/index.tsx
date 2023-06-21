import { sawHandleStrAtom } from "@/store";
import { useAtomValue } from "jotai";
import { ContentPanel } from "./content-panel";
import { HeaderPanel } from "./header-panel";

export function SawContentPanel() {
    const sawHandleStr = useAtomValue(sawHandleStrAtom);
    if (!sawHandleStr) {
        return null;
    }
    return (
        <div className="my-4 w-full max-w-xl">
            <HeaderPanel />
            <ContentPanel />
        </div>
    );
}
