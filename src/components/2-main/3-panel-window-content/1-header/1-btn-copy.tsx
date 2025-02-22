import { type ReactNode, useState } from "react";
import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { easings, a, useTransition } from "@react-spring/web";
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

    const transitions = useTransition(Number(show), {
        from: { opacity: 0, y: 0, },
        enter: { opacity: 1, y: 0, config: { duration: 300 }, },
        leave: { opacity: 0, y: -25, config: { duration: 350, easing: easings.easeOutQuad }, },
        onRest: ({ finished }) => show && finished && setShow?.(false),
    });

    return transitions((styles, item) => (
        <a.div style={styles} className="absolute">
            {items[item]}
        </a.div>
    ));
}
