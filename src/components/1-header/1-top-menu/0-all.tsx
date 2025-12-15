import { Button } from "@/components/ui/shadcn/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/shadcn/dropdown-menu";
import { IconMenuHamburger5 } from "@/components/ui/icons/normal";
import { TestLinksSubMenu } from "./1-test-links";
import { ThemeSubMenu } from "./2-theme-sub-menu";
import { useAtomValue } from "jotai";
import { zoomLevelAtom } from "@/store/1-atoms/atom-zoom";
import { zoomAction } from "@/shared/2-gates-in-client-as-atoms/3-to-main-apis";
import { Minus, Plus, RotateCcw } from "lucide-react";

export function TopMenu() {
    const zoomLevel = useAtomValue(zoomLevelAtom);
    const zoomPercent = Math.round((1.2 ** zoomLevel) * 100);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="size-6 focus-visible:ring-0" variant="ghost" size="icon" title="Options">
                    <IconMenuHamburger5 className="size-5" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="overflow-hidden min-w-64">
                <TestLinksSubMenu />
                <DropdownMenuSeparator />

                {/* Zoom Controls */}
                <div className="flex items-center justify-between px-2 py-1.5 text-sm select-none">
                    <span>Zoom</span>
                    <div className="flex items-center gap-1 border rounded-md p-0.5">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 rounded-sm" 
                            onClick={(e) => { e.preventDefault(); zoomAction('out'); }}
                            title="Zoom Out"
                        >
                            <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-10 text-center text-xs tabular-nums">{zoomPercent}%</span>
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 rounded-sm" 
                            onClick={(e) => { e.preventDefault(); zoomAction('in'); }}
                            title="Zoom In"
                        >
                            <Plus className="h-3 w-3" />
                        </Button>
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 rounded-sm ml-1" 
                            onClick={(e) => { e.preventDefault(); zoomAction('reset'); }}
                            disabled={zoomLevel === 0}
                            title="Reset Zoom"
                        >
                            <RotateCcw className="h-3 w-3" />
                        </Button>
                    </div>
                </div>

                <DropdownMenuSeparator />
                <ThemeSubMenu />
            </DropdownMenuContent>
            
        </DropdownMenu>
    );
}
