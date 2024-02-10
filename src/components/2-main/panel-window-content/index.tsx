import { HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import { sawHandleStrAtom } from "@/store";
import { HeaderPanel } from "./header/header-panel";
import { ContentScrollArea } from "./body-elements/content-scrollarea";
import { classNames } from "@/utils";

export function SawContentPanel({ className, ...rest }: HTMLAttributes<HTMLElement>) {
    const sawHandleStr = useAtomValue(sawHandleStrAtom);
    if (!sawHandleStr) {
        return null;
    }
    return (
        <div className={classNames("min-h-0 flex flex-col", className)} {...rest}>
            <HeaderPanel />
            <ContentScrollArea />
        </div>
    );
}
