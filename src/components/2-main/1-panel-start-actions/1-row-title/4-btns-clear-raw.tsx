import { useSetAtom } from "jotai";
import { doClearSawHandleAtom } from "@/store";
import { Button } from "@/components/ui/shadcn/button";

export function ButtonClearHandle() {
    const doClearSawHandle = useSetAtom(doClearSawHandleAtom);
    return (
        <Button
            className="py-1 px-2 h-auto text-xs font-normal rounded-sm"
            variant="outline"
            onClick={doClearSawHandle}
            title="Clear Second Active Window handle"
        >
            Clear
        </Button>
    );
}
