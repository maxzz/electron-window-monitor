import { useSetAtom, useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { buttonClasses } from "./8-button-classes";
import { doGetWindowIconAtom, sawHandleAtom } from "@/store";
import { debugSettings } from "@/store/1-atoms";

export function ButtonGetIcon() {

    const doGetWindowIcon = useSetAtom(doGetWindowIconAtom);
    const secondActiveWindow = useAtomValue(sawHandleAtom);

    const { iconAutoUpdate } = useSnapshot(debugSettings.uiState);
    if (iconAutoUpdate) {
        return null;
    }

    const hwnd = secondActiveWindow?.hwnd;
    const title = !hwnd
        ? 'Get the second active window first'
        : 'Get the second active window icon';
    const isDisabled = !hwnd;

    return (
        <button
            className={classNames(buttonClasses, "")}
            disabled={isDisabled}
            title={title}
            onClick={() => doGetWindowIcon(hwnd)}
        >
            Icon
        </button>
    );
}
