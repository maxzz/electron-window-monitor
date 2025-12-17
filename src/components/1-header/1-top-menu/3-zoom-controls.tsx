import { Button } from "@/components/ui/shadcn/button";
import { DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/shadcn/dropdown-menu";
import { useAtomValue } from "jotai";
import { zoomLevelAtom } from "@/store/1-atoms/atom-zoom";
import { zoomAction } from "@/shared/2-gates-in-client-as-atoms/3-to-main-apis";
import { IconZoomMinus, IconZoomPlus, IconZoomReset } from "@/components/ui/icons/normal";

export function ZoomControls() {
    const zoomLevel = useAtomValue(zoomLevelAtom);
    const zoomPercent = Math.round((1.2 ** zoomLevel) * 100);

    return (
        <DropdownMenuItem 
            className="justify-between focus:bg-transparent cursor-default" 
            onSelect={(e) => e.preventDefault()}
        >
            <DropdownMenuLabel className="p-0 pl-2 text-xs font-normal">
                Zoom
            </DropdownMenuLabel>

            <div className="flex items-center gap-1 border rounded-md p-0.5">
                <Button
                    className="size-6 rounded-sm" variant="ghost" size="icon"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); zoomAction('out'); }}
                    title="Zoom Out"
                >
                    <IconZoomMinus className="size-3" />
                </Button>

                <span className="w-10 text-center text-xs tabular-nums">{zoomPercent}%</span>

                <Button
                    className="size-6 rounded-sm" variant="ghost" size="icon"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); zoomAction('in'); }}
                    title="Zoom In"
                >
                    <IconZoomPlus className="size-3" />
                </Button>

                <Button
                    className="ml-1 size-6 rounded-sm" variant="ghost" size="icon"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); zoomAction('reset'); }}
                    disabled={zoomLevel === 0}
                    title="Reset Zoom"
                >
                    <IconZoomReset className="size-3" />
                </Button>
            </div>
        </DropdownMenuItem>
    );
}
