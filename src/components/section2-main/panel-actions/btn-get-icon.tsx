import { useSetAtom, useAtomValue } from "jotai";
import { doGetWindowIconAtom, sawHandleAtom } from "@/store";
import { classNames } from "@/utils";
import { buttonClasses } from ".";
import { appUi } from "@/store/app-state";
import { useSnapshot } from "valtio";

export function ButtonGetIcon() {
    const doGetWindowIcon = useSetAtom(doGetWindowIconAtom);
    const secondActiveWindow = useAtomValue(sawHandleAtom);
    const { iconAutoUpdate } = useSnapshot(appUi.uiState);
    if (iconAutoUpdate) {
        return null;
    }

    const hwnd = secondActiveWindow?.hwnd;
    const isDisabled = !hwnd;
    const title = !hwnd ? 'Get the second active window first' : 'Get the second active window icon';
    return (
        <button
            className={classNames(buttonClasses, "")}
            disabled={isDisabled}
            title={title}
            onClick={() => {
                doGetWindowIcon(hwnd);
            }}
        >
            Icon
        </button>
    );
}
