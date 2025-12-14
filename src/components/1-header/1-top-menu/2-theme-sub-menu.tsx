import { useSnapshot } from "valtio";
import { appSettings } from "@/store/1-atoms";
import { DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from "@/components/ui/shadcn/dropdown-menu";

export function ThemeSubMenu() {
    const { appUi } = useSnapshot(appSettings);
    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger className="py-0">
                <DropdownMenuLabel className="text-xs font-normal">Theme</DropdownMenuLabel>
            </DropdownMenuSubTrigger>
            
            <DropdownMenuSubContent>
                <DropdownMenuCheckboxItem
                    checked={appUi.theme === 'light'}
                    onCheckedChange={() => appSettings.appUi.theme = 'light'}
                    className="text-xs"
                >
                    Light
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={appUi.theme === 'dark'}
                    onCheckedChange={() => appSettings.appUi.theme = 'dark'}
                    className="text-xs"
                >
                    Dark
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={appUi.theme === 'system'}
                    onCheckedChange={() => appSettings.appUi.theme = 'system'}
                    className="text-xs"
                >
                    System
                </DropdownMenuCheckboxItem>
            </DropdownMenuSubContent>
        </DropdownMenuSub>
    );
}

