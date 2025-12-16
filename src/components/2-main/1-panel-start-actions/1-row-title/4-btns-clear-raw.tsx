import { useSetAtom } from "jotai";
import { doClearSawHandleAtom } from "@/store";
import { Button } from "@/components/ui/shadcn/button";
import { ButtonShowReplyRawText } from "./5-btn-show-reply-raw";

export function SawHeaderRightActions({ isMonitoring, raw }: { isMonitoring: boolean; raw: string; }) {
    if (isMonitoring) {
        return null;
    }

    return (
        <div className="flex items-center space-x-1">
            <ButtonClearHandle />
            <ButtonShowReplyRawText raw={raw} />
        </div>
    );
}

function ButtonClearHandle() {
    const doClearSawHandle = useSetAtom(doClearSawHandleAtom);
    return (
        <Button
            className="py-1 px-2 h-auto text-xs font-normal rounded-sm"
            variant="outline"
            onClick={doClearSawHandle}
            title="Clear Second Active Window handle"
        >
            Clear
        </Button>
    );
}
