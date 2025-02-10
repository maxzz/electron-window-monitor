import { useSetAtom, useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { doGetWindowIconAtom, sawHandleAtom } from "@/store";
import { buttonClasses } from "./8-button-classes";
import { appSettings } from "@/store/1-app-state";

export function ButtonGetIcon() {

    const doGetWindowIcon = useSetAtom(doGetWindowIconAtom);
    const secondActiveWindow = useAtomValue(sawHandleAtom);

    const { iconAutoUpdate } = useSnapshot(appSettings.monitor);
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
