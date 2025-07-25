import { type Rect4 } from "@/x-electron/xternal-to-renderer/7-napi-calls";

export function compareRect(rect1: Rect4, rect2: Rect4) {
    return (
        rect1.left === rect2.left &&
        rect1.top === rect2.top &&
        rect1.right === rect2.right &&
        rect1.bottom === rect2.bottom
    );
}
