import { ReactNode, useState } from "react";
import { useSnapshot } from "valtio";
import { easings, a, useTransition } from "@react-spring/web";
import { clientState } from "@/store/1-app-state";
import { classNames } from "@/utils";
import { IconCopy } from "@/components/ui/icons";
import { useAtomValue } from "jotai";
import { sawContentStrAtom } from "@/store";

const borderClasses = `border-primary-500 border rounded ${"hover:bg-primary-500 hover:border-primary-600 select-none shadow-sm"}`;

function MountCopyNotice({ show, setShow, items }: { show: boolean; setShow?: (v: boolean) => void; items: ReactNode[]; }) {
    const transitions = useTransition(Number(show), {
        from: { opacity: 0, y: 0, },
        enter: { opacity: 1, y: 0, config: { duration: 300 }, },
        leave: { opacity: 0, y: -25, config: { duration: 350, easing: easings.easeOutQuad }, },
        onRest: ({ finished }) => show && finished && setShow?.(false),
    });
    return transitions((styles, item) => (
        <a.div style={styles} className="absolute"> {items[item]} </a.div>
    ));
}

export function ButtonCopyContent() {
    const [showNotice, setShowNotice] = useState(false);
    const sawContentStr = useAtomValue(sawContentStrAtom);
    const { buildFailedBody } = useSnapshot(clientState);
    const msg = buildFailedBody || sawContentStr;
    if (!msg) {
        return null;
    }
    return (
        <button
            className={classNames(borderClasses, "relative p-1.5 py-1 active:scale-[.97]")} title="copy server reply"
            onClick={() => {
                navigator.clipboard.writeText(msg);
                setShowNotice(true);
            }}
        >
            <IconCopy className="w-4 h-4 text-primary-800/80" />
            <MountCopyNotice
                show={showNotice}
                setShow={setShowNotice}
                items={[
                    '', // <div className="absolute -left-5 -top-12 text-xs opacity-25">💎</div>,
                    <div className="absolute -left-5 -top-[50px] px-2 py-1 w-fit text-xs text-white bg-primary-600 border-primary-800 border rounded">Copied</div>
                ]}
            />
        </button>
    );
}
