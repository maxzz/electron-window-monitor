import { useSnapshot } from "valtio";
import { isThemeDark, toggleTheme } from "@/utils";
import { appSettings } from "@/store/1-atoms";
import { Button } from "@/components/ui/shadcn/button";
import { IconThemeMoon, IconThemeSun } from "../ui/icons/normal";

export function ButtonQuickToggleThemeMode() {
    const { theme } = useSnapshot(appSettings.appUi);
    const isDark = isThemeDark(theme);

    return (
        <Button
            className="size-6 focus-visible:ring-0 hover:bg-transparent"
            variant="ghost"
            size="icon"
            onClick={() => toggleTheme(theme)}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            type="button"
        >
            {isDark
                ? <IconThemeSun className="size-5 stroke-1!" />
                : <IconThemeMoon className="size-5 stroke-1!" />
            }
        </Button>
    );
}
