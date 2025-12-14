import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from "@/components/ui/shadcn/dropdown-menu";

export function TestLinksSubMenu() {
    return (
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

