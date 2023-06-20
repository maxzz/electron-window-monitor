import { Section1Header } from "./components/section1-header";
import { Section2Main } from "./components/section2-main";
import { Section3Footer } from "./components/section3-footer";
import { WorldToReactListener } from "./store/ipc-client/ipc-react-listener";

export function App() {
    return (<>
        <div className="bg-green-400 h-screen grid grid-rows-[auto_1fr_auto]">
            <Section1Header />
            <Section2Main />
            <Section3Footer />
        </div>

        <WorldToReactListener />
    </>);
}
