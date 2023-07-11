import { TestLinks } from "./test-links";
import { ChkboxIconAutoUpdate } from "./chkbox-icon-auto-update";
import { ChkboxLargeIcon } from "./chkbox-icon-large";
import { ChkboxXmlFormat } from "./chkbox-xml-format";
import { InputMaxControls } from "./input-max-controls";
import { TestTargetWindowPosition } from "./test-target-position";

export function Section3Footer() {
    return (
        <div className="p-4 text-xs flex flex-col space-y-2">
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
