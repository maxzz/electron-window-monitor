import { useSnapshot } from "valtio";
import { appSettings } from "@/store/1-atoms";
import { Button } from "@/components/ui/shadcn/button";
import { Moon, Sun } from "lucide-react";
import { isThemeDark, toggleTheme } from "@/utils";

export function ButtonQuickToggleThemeMode() {
    const { theme } = useSnapshot(appSettings.appUi);
    const isDark = isThemeDark(theme);

    return (
        <Button
            variant="ghost"
            size="icon"
            className="size-6 focus-visible:ring-0"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => toggleTheme(theme)}
            type="button"
        >
            {isDark ? (
                <Sun className="size-5 stroke-1" />
            ) : (
                <Moon className="size-5 stroke-1" />
            )}
        </Button>
    );
}
