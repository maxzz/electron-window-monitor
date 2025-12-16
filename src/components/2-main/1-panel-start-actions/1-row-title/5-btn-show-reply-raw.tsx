import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Dialog, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/shadcn/dialog";
import { Button } from "@/components/ui/shadcn/button";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";
import { SymbolCross } from "@/components/ui/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn/tabs";
import { PropsGridOrEmpty } from "../../2-panel-saw-hwnd-handle/2-saw-hwnd-props-grid";
import { type GetTargetWindowResult } from "@/x-electron/xternal-to-renderer/7-napi-calls";

export function ButtonShowReplyRawText({ raw }: { raw: string; }) {
    const [isOpen, setIsOpen] = useState(false);

    let displayContent = raw;
    let sawObj: GetTargetWindowResult | null = null;
    try {
        sawObj = JSON.parse(raw);
        displayContent = JSON.stringify(sawObj, null, 2);
    } catch (e) {
        displayContent = `Error parsing JSON: ${e}\n\n${raw}`;
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="py-1 px-2 h-auto text-xs font-normal rounded-sm" variant="outline">
                    Raw
                </Button>
            </DialogTrigger>

            <AnimatePresence>
                {isOpen && (
                    <DialogPrimitive.Portal forceMount>
                        <DialogPrimitive.Overlay asChild>
                            <motion.div
                                className="fixed inset-0 z-50 bg-black/10"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            />
                        </DialogPrimitive.Overlay>

                        <DialogPrimitive.Content asChild>
                            <motion.div
                                className={contentClasses}
                                initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
                                animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                                exit={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
                                transition={{ duration: 0.2 }}
                            >
                                <DialogHeader className="space-y-0.5 select-none">
                                    <DialogTitle className="text-sm">Second active window info</DialogTitle>
                                    <DialogDescription className="text-xs">This is the raw JSON data from the second active window.</DialogDescription>
                                </DialogHeader>

                                <Tabs defaultValue="raw" className="flex-1 min-h-0 w-full flex flex-col">

                                    <TabsList className="w-max h-8 rounded grid grid-cols-[auto_auto] gap-x-1 justify-start select-none" tabIndex={-1}>
                                        <TabsTrigger className="text-xs rounded" value="raw">Raw JSON</TabsTrigger>
                                        <TabsTrigger className="text-xs rounded" value="info">Grid</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="raw" className="flex-1 min-h-0 relative">
                                        <div className="absolute inset-0">
                                            <ScrollArea className="p-1 size-full bg-muted/50 rounded-md border" parentContentWidth horizontal>
                                                <pre className="text-xs font-mono">
                                                    {displayContent}
                                                </pre>
                                            </ScrollArea>
                                            <div className="absolute top-2 right-2 z-10">
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="p-1 size-7"
                                                    title="Copy JSON"
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(
                                                            typeof displayContent === "string"
                                                                ? displayContent
                                                                : JSON.stringify(displayContent, null, 2)
                                                        );
                                                    }}
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" />
                                                        <path d="M5 15v2a2 2 0 0 0 2 2h8" stroke="currentColor"/>
                                                        <rect x="3" y="3" width="13" height="13" rx="2" ry="2" />
                                                    </svg>
                                                </Button>
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="info" className="flex-1 min-h-0 text-xs">
                                        <PropsGridOrEmpty saw={sawObj} />
                                    </TabsContent>
                                </Tabs>

                                {/* <DialogPrimitive.Close className={closeButtonClasses} tabIndex={-1}>
                                    <SymbolCross className="size-3 stroke-2 group-hover:stroke-3" />
                                    <span className="sr-only">Close</span>
                                </DialogPrimitive.Close> */}

                            </motion.div>
                        </DialogPrimitive.Content>
                    </DialogPrimitive.Portal>
                )}
            </AnimatePresence>
        </Dialog>
    );
}

const contentClasses = "\
fixed left-[50%] top-[50%] p-2 h-[56vh] w-full max-w-100 lg:max-w-lg border bg-background shadow dark:shadow-white/20 flex flex-col gap-2 sm:rounded-lg z-50 \
";

const closeButtonClasses = "\
group \
absolute \
right-3 \
top-3 \
size-7 \
rounded-sm \
ring-0 \
ring-offset-background \
transition-colors \
hover:bg-red-500 \
hover:text-white \
grid place-items-center";
