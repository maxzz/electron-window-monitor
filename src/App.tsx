import { WorldToReactListener } from "./store/ipc-react-listener";

export function App() {
    return (<>
        <div className="bg-green-400 h-screen">
            Monitor
        </div>
        <WorldToReactListener />
    </>);
}
