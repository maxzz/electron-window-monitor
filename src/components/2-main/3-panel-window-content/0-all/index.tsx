import { type HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { sawHandleStrAtom } from "@/store";
import { HeaderPanel } from "../1-header";
import { ContentScrollArea } from "../2-body-elements";

export function SawControlsPanel({ className, ...rest }: HTMLAttributes<HTMLElement>) {

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
