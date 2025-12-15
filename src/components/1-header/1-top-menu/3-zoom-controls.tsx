import { Button } from "@/components/ui/shadcn/button";
import { DropdownMenuLabel } from "@/components/ui/shadcn/dropdown-menu";
import { useAtomValue } from "jotai";
import { zoomLevelAtom } from "@/store/1-atoms/atom-zoom";
import { zoomAction } from "@/shared/2-gates-in-client-as-atoms/3-to-main-apis";
import { Minus, Plus, RotateCcw } from "lucide-react";

export function ZoomControls() {
    const zoomLevel = useAtomValue(zoomLevelAtom);
    const zoomPercent = Math.round((1.2 ** zoomLevel) * 100);

    return (
        <div className="flex items-center justify-between px-2 py-1.5 text-sm select-none">
            <DropdownMenuLabel className="text-xs font-normal">
                Zoom
            </DropdownMenuLabel>

            <div className="flex items-center gap-1 border rounded-md p-0.5">
                <Button
                    className="size-6 rounded-sm" variant="ghost" size="icon"
                    onClick={(e) => { e.preventDefault(); zoomAction('out'); }}
                    title="Zoom Out"
                >
                    <Minus className="size-3" />
                </Button>

                <span className="w-10 text-center text-xs tabular-nums">{zoomPercent}%</span>

                <Button
                    className="size-6 rounded-sm" variant="ghost" size="icon"
                    onClick={(e) => { e.preventDefault(); zoomAction('in'); }}
                    title="Zoom In"
                >
                    <Plus className="size-3" />
                </Button>

                <Button
                    className="size-6 rounded-sm ml-1" variant="ghost" size="icon"
                    onClick={(e) => { e.preventDefault(); zoomAction('reset'); }}
                    disabled={zoomLevel === 0}
                    title="Reset Zoom"
                >
                    <RotateCcw className="size-3" />
                </Button>
            </div>
        </div>
    );
}

//TODO: when mouse moved in the ZoomControls from DropdownMenuItem with submenu, the submenu is not closed, but it should be.