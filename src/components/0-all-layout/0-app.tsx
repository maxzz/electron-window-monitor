import { UISymbolDefs } from "../ui";
import { OnAppMount, WorldToReactListener } from "../../shared/2-gates-in-client-as-atoms";
import { Section1Header } from "../1-header";
import { Section2Main } from "../2-main";
import { Section3_Footer } from "../3-footer";

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
        <div className="h-screen bg-background grid grid-rows-[auto_1fr_auto] 1debug-screens 1debug-grid-16 smallscroll">
            <Section1Header />

            <Section2Main />

            <Section3_Footer />
        </div>
    );
}

//TODO: icons loast transparency
