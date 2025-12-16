import * as React from "react";
import { useSetAtom } from "jotai";
import { AnimatePresence, motion } from "motion/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { doClearSawHandleAtom } from "@/store";
import { utilityButtonClasses } from "../2-row-buttons/8-button-classes";
import { Button } from "@/components/ui/shadcn/button";
import {
    Dialog,
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
    const [isOpen, setIsOpen] = React.useState(false);
    let displayContent = raw;
    try {
        const rawObj = JSON.parse(raw);
        displayContent = JSON.stringify(rawObj, null, 2);
    } catch (e) {
        // keep original raw if parse fails, maybe append error
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    className="h-auto py-1 px-2 text-xs border-primary-500 hover:bg-primary-300 hover:text-foreground"
                    variant="outline"
                >
                    Raw
                </Button>
            </DialogTrigger>

            <AnimatePresence>
                {isOpen && (
                    <DialogPrimitive.Portal forceMount>
                        <DialogPrimitive.Overlay asChild>
                            <motion.div
                                className="fixed inset-0 z-50 bg-black/80"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            />
                        </DialogPrimitive.Overlay>
                        <DialogPrimitive.Content asChild>
                            <motion.div
                                className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg gap-4 border bg-background p-2 shadow-lg h-[52vh] flex flex-col sm:rounded-lg"
                                initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
                                animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                                exit={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
                                transition={{ duration: 0.2 }}
                            >
                                <DialogHeader>
                                    <DialogTitle className="text-sm">Second active window info</DialogTitle>
                                    <DialogDescription className="text-xs">This is the raw JSON data from the second active window.</DialogDescription>
                                </DialogHeader>

                                <div className="relative size-full overflow-hidden">
                                    <div className="absolute inset-0">
                                        <ScrollArea className="p-1 size-full bg-muted/50 rounded-md border" parentContentWidth horizontal>
                                            <pre className="text-xs font-mono">
                                                {displayContent}
                                            </pre>
                                        </ScrollArea>
                                    </div>
                                </div>

                                <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                                    <X className="h-4 w-4" />
                                    <span className="sr-only">Close</span>
                                </DialogPrimitive.Close>
                            </motion.div>
                        </DialogPrimitive.Content>
                    </DialogPrimitive.Portal>
                )}
            </AnimatePresence>
        </Dialog>
    );
}

