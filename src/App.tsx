import { AppLayout } from "./components/0-all";
import { UISymbolDefs } from "./components/ui";
import { OnAppMount, WorldToReactListener } from "./shared/ipc-client/ipc-react-listener";

export function App() {
    return (<>
        <UISymbolDefs />
        <AppLayout />
        <WorldToReactListener />
        <OnAppMount />
    </>);
}
