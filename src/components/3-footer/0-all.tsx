import { TestTargetWindowPosition } from "./1-test-target-position";
import { TestLinks } from "./2-test-links";
import { InputMaxControls } from "./3-input-max-controls";
import { ChkboxXmlFormat } from "./4-chkbox-xml-format";
import { ChkboxIconAutoUpdate } from "./5-chkbox-icon-auto-update";
import { ChkboxLargeIcon } from "./6-chkbox-icon-large";

export function Section3Footer() {
    return (
        <div className="p-4 text-xs flex flex-col space-y-2 select-none">
            <TestTargetWindowPosition />
            <TestLinks />

            <div className="flex gap-x-4">
                <InputMaxControls />
                <ChkboxXmlFormat />
                <ChkboxIconAutoUpdate />
                <ChkboxLargeIcon />
            </div>
        </div>
    );
}
