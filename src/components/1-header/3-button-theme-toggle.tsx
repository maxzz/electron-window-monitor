import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";

export function ButtonQuickToggleThemeMode() {
    const [isDark, setIsDark] = useState(
        () => {
            return document.documentElement.classList.contains("dark");
        }
    );

    useEffect(() => {
        if (typeof window === "undefined") return;
        const theme = localStorage.getItem("theme");
        if (theme === "dark") {
            updateTheme(true);
            setIsDark(true);
        } else if (theme === "light") {
            updateTheme(false);
            setIsDark(false);
        }
    }, []);

    function toggleTheme() {
        const newIsDark = !isDark;
        updateTheme(newIsDark);
        setIsDark(newIsDark);
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            className="size-6 focus-visible:ring-0"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={toggleTheme}
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

function updateTheme(isDark: boolean) {
    if (isDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
    } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
    }
}


