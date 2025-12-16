import { useSetAtom } from "jotai";
import { doClearSawHandleAtom } from "@/store";
import { utilityButtonClasses } from "../2-row-buttons/8-button-classes";
import { Button } from "@/components/ui/shadcn/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/shadcn/dialog";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";

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
        <button
            className={utilityButtonClasses}
            onClick={doClearSawHandle}
            title="Clear Second Active Window handle"
        >
            Clear
        </button>
    );
}

function ButtonShowReplyRawText({ raw }: { raw: string; }) {
    let displayContent = raw;
    try {
        const rawObj = JSON.parse(raw);
        displayContent = JSON.stringify(rawObj, null, 2);
    } catch (e) {
        // keep original raw if parse fails, maybe append error
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="h-auto py-1 px-2 text-xs border-primary-500 hover:bg-primary-300 hover:text-foreground"
                    variant="outline"
                >
                    Raw
                </Button>
            </DialogTrigger>

            <DialogContent className="p-2 max-w-lg max-h-[40vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-xs">Second active window info</DialogTitle>
                    <DialogDescription className="text-xs">This is the raw JSON data from the second active window.</DialogDescription>
                </DialogHeader>

                <ScrollArea className="flex-1 p-1 w-full bg-muted/50 rounded-md border">
                    <pre className="text-xs font-mono whitespace-pre-wrap break-all">
                        {displayContent}
                    </pre>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}

