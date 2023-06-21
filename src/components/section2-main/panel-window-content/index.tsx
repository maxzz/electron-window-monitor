import { sawContentAtom, sawContentStrAtom, sawHandleStrAtom } from "@/store";
import { useAtomValue } from "jotai";
import { ControlsGrid } from "./controls-grid";
import { PanelBuildProcess } from "./build-process";

export function ContentPanel() {
    const sawContent = useAtomValue(sawContentAtom);
    const controls = sawContent?.controls;
    return (<>
        {controls
            ? <ControlsGrid controls={controls} />
            : <div className="text-sm"> No controls detected </div>
        }
    </>);
}

export function SawContentPanel() {
    const sawHandleStr = useAtomValue(sawHandleStrAtom);
    if (!sawHandleStr) {
        return null;
    }
    return (
        <div className="my-4 w-full max-w-xl">
            <div className="pt-4 pb-1 flex items-center justify-between gap-2">
                <div className="font-semibold">
                    Second Window Content
                </div>
                <PanelBuildProcess />
            </div>

            <ContentPanel />
        </div>
    );
}
