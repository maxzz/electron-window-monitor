import { type ReactNode, useState } from "react";
import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { motion, AnimatePresence } from "motion/react";
import { classNames } from "@/utils";
import { napiBuildState } from "@/store/7-napi-atoms";
import { sawContentStrAtom } from "@/store";
import { IconCopy } from "@/components/ui";
import { utilityButtonClasses } from "../../1-panel-start-actions/8-button-classes";

export function ButtonCopyContent() {
    const [showNotice, setShowNotice] = useState(false);
    const sawContentStr = useAtomValue(sawContentStrAtom);
    const { buildFailedBody } = useSnapshot(napiBuildState);

    const msg = buildFailedBody || sawContentStr;
    if (!msg) {
        return null;
    }

    return (
        <button
            className={utilityButtonClasses} title="copy server reply"
            onClick={() => { navigator.clipboard.writeText(msg); setShowNotice(true); }}
        >
            <IconCopy className="size-4 text-primary-800/80" />

            <MountCopyNotice
                show={showNotice}
                setShow={setShowNotice}
                items={[
                    '', // <div className="absolute -left-5 -top-12 text-xs opacity-25">💎</div>,
                    <div className="absolute -left-5 -top-[50px] px-2 py-1 w-fit text-xs text-white bg-primary-600 border-primary-800 border rounded">
                        Copied
                    </div>
                ]}
            />
        </button>
    );
}

function MountCopyNotice({ show, setShow, items }: { show: boolean; setShow?: (v: boolean) => void; items: ReactNode[]; }) {
    return (
        <AnimatePresence 
            onExitComplete={() => setShow?.(false)}
            mode="wait"
        >
            {show && (
                <motion.div
                    className="absolute"
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -25 }}
                    transition={{
                        duration: 0.35,
                        ease: "easeOut"
                    }}
                    onAnimationComplete={() => {
                        setTimeout(() => setShow?.(false), 300);
                    }}
                >
                    {items[1]}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
