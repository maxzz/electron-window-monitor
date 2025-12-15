import { Button } from "@/components/ui/shadcn/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/shadcn/dropdown-menu";
import { IconMenuHamburger5 } from "@/components/ui/icons/normal";
import { TestLinksSubMenu } from "./1-test-links";
import { ThemeSubMenu } from "./2-theme-sub-menu";
import { exitApp } from "@/shared/2-gates-in-client-as-atoms/3-to-main-apis";
import { ZoomControls } from "./3-zoom-controls";

export function TopMenu() {
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

                <ZoomControls />
                <ThemeSubMenu />

                <DropdownMenuSeparator />
                
                <DropdownMenuItem className="focus:bg-destructive/10 cursor-pointer" onClick={() => exitApp()}>
                    <DropdownMenuLabel className="py-0 text-xs font-normal">Exit</DropdownMenuLabel>
                </DropdownMenuItem>
            </DropdownMenuContent>
            
        </DropdownMenu>
    );
}
