import { UISymbolDefs } from "../ui";
import { OnAppMount, WorldToReactListener } from "../../shared/2-gates-in-client-as-atoms";
import { Section1Header } from "../1-header";
import { Section2Main } from "../2-main";
import { Section3FooterAnd } from "../3-footer";

export function App() {
    return (<>
        <UISymbolDefs />
        <AppLayout />
        <WorldToReactListener />
        <OnAppMount />
    </>);
}

function AppLayout() {
    return (
        <div className="h-screen bg-background grid grid-rows-[auto_1fr] 1debug-screens 1debug-grid-16 smallscroll">
            <Section1Header />

            <div className="h-full min-h-0 grid grid-rows-[1fr_auto] gap-4">
                <Section2Main className="mx-4 max-w-2xl" />
                <Section3FooterAnd className="mx-4 max-w-2xl" />
            </div>
        </div>
    );
}

//TODO: icons loast transparency
