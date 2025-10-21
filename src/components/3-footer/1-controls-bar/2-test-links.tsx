import { type ComponentPropsWithoutRef } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { classNames } from "@/utils";
import { sawHandleAtom, doHighlightRectAtom } from "@/store";

export function TestLinks({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
    return (
        <div className={classNames("text-primary-600 flex items-center justify-between", className)} {...rest}>
            <div className="flex items-center gap-x-1">
                <div>
                    Test web logins:
                </div>

                <a className={linkClasses} href="https://tailwindui.com/login" target="_blank">
                    tw
                </a>

                <a className={linkClasses} href="https://www.bankofamerica.com" target="_blank">
                    bofa
                </a>
            </div>

            <ButtonTestHighlight />
        </div>
    );
}

function ButtonTestHighlight() {
    const sawHandle = useAtomValue(sawHandleAtom);
    const doHighlightRect = useSetAtom(doHighlightRectAtom);

    if (!sawHandle?.hwnd) {
        return null;
    }

    return (
        <button
            className={linkClasses}
            onClick={() => {
                doHighlightRect({ hwnd: sawHandle.hwnd, rect: { left: 0, top: 0, right: 640, bottom: 480, } });
            }}>
            Highlight
        </button>
    );
}

const linkClasses = "px-2 py-0.5 hover:text-green-100 hover:bg-primary-600 border-primary-600 border border-dotted rounded-sm active:scale-x-[.97]";
