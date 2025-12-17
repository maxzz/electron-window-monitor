import { useAtom } from "jotai";
import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { AnimatePresence, motion } from "motion/react";
import { appSettings, sawRawDialogOpenAtom } from "@/store/1-atoms";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Dialog, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/shadcn/dialog";
import { Button } from "@/components/ui/shadcn/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn/tabs";
import { sawHandleParsedAtom } from "@/store/7-napi-atoms/1-do-get-hwnd/2-saw-handle-parsed";
import { TabContentSawRawJson } from "./6-1-tab-content-saw-raw-json";
import { TabContentSawRawGrid } from "./6-2-tab-content-saw-grid";
import { DialogCloseButton } from "../../../ui/ui-local/6-btn-close-dialog";

export function ButtonShowReplyRawText() {
    const [isOpen, setIsOpen] = useAtom(sawRawDialogOpenAtom);
    
    const { appUi } = useSnapshot(appSettings);
    const { displayContent, parsed } = useAtomValue(sawHandleParsedAtom);

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

                                <Tabs 
                                    className="flex-1 min-h-0 w-full flex flex-col"
                                    value={appUi.sawTab} 
                                    onValueChange={(value) => appSettings.appUi.sawTab = value as "raw" | "info"}
                                >
                                    <TabsList className="w-max h-8 rounded grid grid-cols-[auto_auto] gap-x-1 justify-start select-none" tabIndex={-1}>
                                        <TabsTrigger className="text-xs rounded" value="raw">Raw JSON</TabsTrigger>
                                        <TabsTrigger className="text-xs rounded" value="info">Grid</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="raw" className="flex-1 min-h-0 relative">
                                        <TabContentSawRawJson displayContent={displayContent} />
                                    </TabsContent>

                                    <TabsContent value="info" className="flex-1 min-h-0">
                                        <TabContentSawRawGrid saw={parsed} />
                                    </TabsContent>
                                </Tabs>

                                <DialogCloseButton />

                            </motion.div>
                        </DialogPrimitive.Content>
                    </DialogPrimitive.Portal>
                )}
            </AnimatePresence>
        </Dialog>
    );
}

const contentClasses = "\
fixed left-[50%] top-[50%] \
p-2 w-full max-w-100 lg:max-w-lg h-[56vh] min-h-40 max-h-120 \
bg-background shadow dark:shadow-white/20 \
border sm:rounded-lg \
flex flex-col gap-2 z-50";
