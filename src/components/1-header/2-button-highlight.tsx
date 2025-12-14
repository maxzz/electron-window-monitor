import { type ComponentPropsWithoutRef } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { AnimatePresence, motion } from "motion/react";
import { classNames } from "@/utils";
import { sawHandleAtom, doHighlightRectAtom } from "@/store";
import { Button } from "@/components/ui/shadcn/button";

export function ButtonTestHighlight() {
    const sawHandle = useAtomValue(sawHandleAtom);
    const doHighlightRect = useSetAtom(doHighlightRectAtom);

    return (
        <AnimatePresence>
            {sawHandle?.hwnd && (
                <motion.div
                    className="inline-block"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                >
                    <Button
                        variant="outline"
                        size="sm"
                        className={linkClasses}
                        onClick={() => {
                            doHighlightRect({ hwnd: sawHandle.hwnd, rect: { left: 0, top: 0, right: 640, bottom: 480, } });
                        }}>
                        Highlight
                    </Button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

const linkClasses = "h-6 font-normal rounded-sm active:scale-x-[.97]";
