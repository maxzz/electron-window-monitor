import { type HTMLAttributes, useRef, useEffect } from "react";
import { type Atom, useAtomValue } from "jotai";

export function ImageHolder({ imageAtom, ...rest }: { imageAtom: Atom<HTMLImageElement | null>; } & HTMLAttributes<HTMLDivElement>) {
    const imageElm = useAtomValue(imageAtom);
    const refParent = useRef<HTMLDivElement>(null);

    useEffect(
        () => {
            if (!refParent.current || !imageElm) {
                return;
            }

            const parent = refParent.current;
            parent.appendChild(imageElm);

            return () => {
                parent.removeChild(imageElm);
            };
        }, [imageElm]
    );

    if (!imageElm) {
        return null;
    }

    return (<>
        {imageElm
            ? <div ref={refParent} {...rest} />
            : null
        }
    </>);
}

//TODO: add icons cache
//TODO: we need to get the website icon from the active tab for browser windows
