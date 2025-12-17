import { useState, type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/shadcn/button";
import { IconCopy, IconCheck } from "@/components/ui/icons/normal";

export function ButtonCopy({ text, ...buttonProps }: { text: string; } & ComponentPropsWithoutRef<typeof Button>) {
    const [showCheck, setShowCheck] = useState(false);

    function handleCopy() {
        navigator.clipboard.writeText(typeof text === "string" ? text : JSON.stringify(text, null, 2));
        setShowCheck(true);
        setTimeout(() => setShowCheck(false), 1000);
    }

    const { className, title, onClick, ...rest } = buttonProps;

    return (
        <Button
            {...rest}
            className={classNames("p-1 size-7 relative", className)}
            size="icon"
            variant="ghost"
            onClick={(e) => {
                handleCopy();
                onClick?.(e);
            }}
            title={title || "Copy"}
        >
            <AnimatePresence mode="wait">
                {showCheck ? (
                    <motion.div
                        key="check"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                    >
                        <IconCheck className="size-4 text-green-600 dark:text-green-400" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="copy"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0 } }}
                        transition={{ duration: 0.2 }}
                    >
                        <IconCopy className="size-4 text-muted-foreground" />
                    </motion.div>
                )}
            </AnimatePresence>
        </Button>
    );
}
