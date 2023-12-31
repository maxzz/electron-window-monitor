import { useRef, useEffect, HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import { sawIconAtom } from "@/store";

export function ImagePanel(props: HTMLAttributes<HTMLDivElement>) {
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
        <div ref={refParent} {...props}>
        </div>
    );
}
//TODO: add icons cache
//TODO: we need to get the website icon from the active tab for browser windows
