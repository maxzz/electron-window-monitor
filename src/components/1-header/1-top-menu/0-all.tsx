import { IconMenuHamburger5 } from "@/components/ui/icons/normal";
import { Button } from "@/components/ui/shadcn/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/shadcn/dropdown-menu";

export function TopMenu() {
    return (
        //TODO: add drop down menu with the following items:
        // - sub menu "Test links" with the following items:
        //  - "Test link 1"
        //  - "Test link 2"
        // the real links are taken from the @/components/3-footer/1-controls-bar/2-test-links.tsx component
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-6" title="Options">
                    <IconMenuHamburger5 className="size-5" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                {/* TODO: add DropdownMenu with items from testLinks */}
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <DropdownMenuLabel>Test links</DropdownMenuLabel>
                    </DropdownMenuSubTrigger>
                </DropdownMenuSub>
                <DropdownMenuSubContent>
                    {testLinks.map((link) => (
                        <DropdownMenuItem key={link.href}>
                            <a href={link.href} target="_blank">{link.label}</a>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuSubContent>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

const testLinks = [
    {
        label: "Test link 1",
        href: "https://www.google.com"
    },
    {
        label: "Test link 1",
        href: "https://www.google.com"
    },
];
