import { Section1Header } from "./components/1-header";
import { Section2Main } from "./components/2-main";
import { Section3Footer } from "./components/3-footer";
import { UISymbolDefs } from "./components/ui";
import { OnAppMount, WorldToReactListener } from "./shared/ipc-client/ipc-react-listener";

export function App() {
    return (<>
        <UISymbolDefs />
        
        <div className="bg-primary-100 h-screen grid grid-rows-[auto_1fr_auto]">
            <Section1Header />
            <Section2Main className="m-4 w-full max-w-2xl" />
            <Section3Footer className="mx-4 max-w-2xl" />
        </div>

        <WorldToReactListener />
        <OnAppMount />
    </>);
}
