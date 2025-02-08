import { TestTargetWindowPosition } from "./1-test-target-position";
import { TestLinks } from "./2-test-links";
import { InputMaxControls } from "./3-input-max-controls";
import { ChkboxXmlFormat } from "./4-chkbox-xml-format";
import { ChkboxIconAutoUpdate } from "./5-chkbox-icon-auto-update";
import { ChkboxLargeIcon } from "./6-chkbox-icon-large";

export function Section3Footer() {
    return (
        <div className="m-4 text-xs border border-slate-500/50 rounded flex flex-col select-none">

            <TestLinks className="p-2 border-b border-slate-500/50" />

            <TestTargetWindowPosition className="p-2 border-b border-slate-500/50" />

            <div className="p-2 flex gap-x-4">
                <InputMaxControls />
                <ChkboxXmlFormat />
                <ChkboxIconAutoUpdate />
                <ChkboxLargeIcon />
            </div>
        </div>
    );
}
