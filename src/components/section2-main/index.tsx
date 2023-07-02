import { MainActionsPanel } from "./panel-main-actions";
import { SawHandlePanel } from "./panel-window-handle";
import { SawContentPanel } from "./panel-window-content";
import { useAtomValue } from "jotai";
import { sawIconAtom } from "@/store/atom-second-active-window/get-window-icon";
import { useEffect, useRef } from "react";

function ImagePanel() {
    const image = useAtomValue(sawIconAtom);
    const refParent = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!refParent.current || !image) {
            return;
        }

        const parent = refParent.current;
        parent.appendChild(image);

        return () => {
            parent.removeChild(image);
        };
    }, [image]);

    if (!image) {
        return null;
    }

    return (
        <div ref={refParent} className="">
        </div>
    );
}
//TODO: add icons cache
//TODO: we need to get the website icon from the active tab for browser windows

export function Section2Main() {
    return (
        <div className="m-4 min-h-0 text-primary-900 flex flex-col space-y-8">
            <MainActionsPanel />
            <SawHandlePanel />
            <SawContentPanel />
            <ImagePanel />
        </div>
    );
} 
