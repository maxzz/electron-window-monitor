import { Button } from "@/components/ui/shadcn/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/shadcn/dropdown-menu";
import { IconMenuHamburger5 } from "@/components/ui/icons/normal";

export function TopMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="size-6 focus-visible:ring-0" variant="ghost" size="icon" title="Options">
                    <IconMenuHamburger5 className="size-5" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="overflow-hidden">
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="py-0">
                        <DropdownMenuLabel className="text-xs font-normal">Test links</DropdownMenuLabel>
                    </DropdownMenuSubTrigger>

                    <DropdownMenuSubContent>
                        {testLinks.map(
                            (link) => (
                                <DropdownMenuItem className="text-xs font-normal" key={link.href}>
                                    <a href={link.href} target="_blank">
                                        {link.label}
                                    </a>
                                </DropdownMenuItem>
                            )
                        )}
                    </DropdownMenuSubContent>
                </DropdownMenuSub>

            </DropdownMenuContent>
        </DropdownMenu>
    );
}

const testLinks = [
    {
        label: "Tailwind UI login",
        href: "https://tailwindui.com/login"
    },
    {
        label: "Bank of America login",
        href: "https://secure.bankofamerica.com/login/sign-in/signOnV2Screen.go"
    },
];
