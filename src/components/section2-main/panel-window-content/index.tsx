import { sawContentAtom, sawContentStrAtom, sawHandleStrAtom } from "@/store";
import { useAtomValue } from "jotai";
import { ControlsGrid } from "./controls-grid";
import { PanelBuildProcess } from "./build-process";

export function SawContentPanel() {
    const sawHandleStr = useAtomValue(sawHandleStrAtom);
    const sawContentStr = useAtomValue(sawContentStrAtom);
    const sawContent = useAtomValue(sawContentAtom);

    if (!sawHandleStr) {
        return null;
    }

    const controls = sawContent?.controls;
    // if (!controls) {
    //     return null;
    // }

    return (
        <div className="my-4 w-full max-w-xl">
            <div className="pt-4 pb-1 flex items-center justify-between gap-2">
                <div className="font-semibold">
                    Second Window Content
                </div>
                <PanelBuildProcess />
            </div>

            {!controls && (
                <div className="text-sm grid grid-cols-[auto_1fr] gap-x-2">
                    <div className="">No controls detected</div>
                    <div className="">{sawContentStr}</div>
                </div>
            )}

            {controls && <ControlsGrid controls={controls} />}
        </div>
    );
}
