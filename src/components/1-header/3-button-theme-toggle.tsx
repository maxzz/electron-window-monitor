import { useSnapshot } from "valtio";
import { isThemeDark, toggleTheme } from "@/utils";
import { appSettings } from "@/store/1-atoms";
import { Button } from "@/components/ui/shadcn/button";
import { Moon, Sun } from "lucide-react";

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
                ? <Sun className="size-5 stroke-1" />
                : <Moon className="size-5 stroke-1" />
            }
        </Button>
    );
}
