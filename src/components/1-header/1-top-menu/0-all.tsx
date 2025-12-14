import { Button } from "@/components/ui/shadcn/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/shadcn/dropdown-menu";
import { IconMenuHamburger5 } from "@/components/ui/icons/normal";
import { TestLinksSubMenu } from "./1-test-links";
import { ThemeSubMenu } from "./2-theme-sub-menu";

export function TopMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="size-6 focus-visible:ring-0" variant="ghost" size="icon" title="Options">
                    <IconMenuHamburger5 className="size-5" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="overflow-hidden">
                <TestLinksSubMenu />
                <DropdownMenuSeparator />
                <ThemeSubMenu />
            </DropdownMenuContent>
            
        </DropdownMenu>
    );
}
