import { Section1Header } from "./components/1-header";
import { Section2Main } from "./components/2-main";
import { Section3Footer } from "./components/3-footer";
import { UISymbolDefs } from "./components/ui/icons";
import { OnAppMount, WorldToReactListener } from "./shared/ipc-client/ipc-react-listener";

export function App() {
    return (<>
        <UISymbolDefs />
        
        <div className="bg-green-400 h-screen grid grid-rows-[auto_1fr_auto]">
            <Section1Header />
            <Section2Main />
            <Section3Footer />
        </div>

        <WorldToReactListener />
        <OnAppMount />
    </>);
}
