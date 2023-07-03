import { useSetAtom, useAtomValue } from "jotai";
import { doGetSawIconAtom, sawHandleAtom } from "@/store";
import { classNames } from "@/utils";
import { buttonClasses } from ".";

export function ButtonGetIcon() {
    const doGetSawIcon = useSetAtom(doGetSawIconAtom);
    const secondActiveWindow = useAtomValue(sawHandleAtom);
    const hwnd = secondActiveWindow?.hwnd;
    const isDisabled = !hwnd;
    const title = !hwnd ? 'Get the second active window first' : 'Get the second active window icon';
    return (
        <button
            className={classNames(buttonClasses, "")}
            disabled={isDisabled}
            title={title}
            onClick={() => {
                doGetSawIcon(hwnd);
            }}
        >
            Icon
        </button>
    );
}
