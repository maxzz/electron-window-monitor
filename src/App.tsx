import { AppLayout } from "./components/0-all-layout";
import { UISymbolDefs } from "./components/ui";
import { OnAppMount, WorldToReactListener } from "./shared/2-gates-in-client-as-atoms";

export function App() {
    return (<>
        <UISymbolDefs />
        <AppLayout />
        <WorldToReactListener />
        <OnAppMount />
    </>);
}

//TODO: icons loast transparency
