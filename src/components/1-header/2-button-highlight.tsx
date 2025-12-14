import { type ComponentPropsWithoutRef } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { classNames } from "@/utils";
import { sawHandleAtom, doHighlightRectAtom } from "@/store";
import { Button } from "@/components/ui/shadcn/button";

export function ButtonTestHighlight() {
    const sawHandle = useAtomValue(sawHandleAtom);
    const doHighlightRect = useSetAtom(doHighlightRectAtom);

    if (!sawHandle?.hwnd) {
        return null;
    }

    return (
        <Button
            variant="outline"
            size="sm"
            className={linkClasses}
            onClick={() => {
                doHighlightRect({ hwnd: sawHandle.hwnd, rect: { left: 0, top: 0, right: 640, bottom: 480, } });
            }}>
            Highlight
        </Button>
    );
}

const linkClasses = "h-6 font-normal rounded-sm active:scale-x-[.97]";
